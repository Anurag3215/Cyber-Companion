require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

// Define a simple schema for scans
const scanSchema = new mongoose.Schema({
    url: String,
    timestamp: { type: Date, default: Date.now },
    results: Object
});
const Scan = mongoose.model("Scan", scanSchema);

// --- APIs ---

// 1. URL Scanner
app.post("/api/scan/url", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        let results = {
            url: url,
            openPhish: null,
            virusTotal: null,
            urlScan: null,
            cyberAwareness: "Phishing links are a common way for attackers to steal your credentials. Always verify the domain name."
        };

        // OpenPhish (Check if URL is in their feed)
        try {
            const opRes = await axios.get("https://openphish.com/feed.txt");
            const isPhishing = opRes.data.includes(url);
            results.openPhish = { isPhishing, safe: !isPhishing };
        } catch (e) {
            console.error("OpenPhish error", e.message);
            results.openPhish = { error: "Failed to check OpenPhish" };
        }

        // VirusTotal
        try {
            const vtUrlId = Buffer.from(url).toString("base64").replace(/=/g, "");
            const vtRes = await axios.get(`https://www.virustotal.com/api/v3/urls/${vtUrlId}`, {
                headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY }
            });
            results.virusTotal = {
                malicious: vtRes.data.data.attributes.last_analysis_stats.malicious,
                suspicious: vtRes.data.data.attributes.last_analysis_stats.suspicious,
                safe: vtRes.data.data.attributes.last_analysis_stats.malicious === 0
            };
        } catch (e) {
            if(e.response?.status === 404) {
               results.virusTotal = { safe: true, message: "URL not found in VirusTotal database." };
            } else {
               results.virusTotal = { error: "Failed to check VirusTotal" };
            }
        }

        // URLScan.io
        try {
            const usRes = await axios.post("https://urlscan.io/api/v1/scan/", {
                url: url,
                visibility: "public"
            }, {
                headers: { "API-Key": process.env.URLSCAN_API_KEY, "Content-Type": "application/json" }
            });
            results.urlScan = {
                message: usRes.data.message,
                uuid: usRes.data.uuid,
                api: usRes.data.api,
                safe: true
            };
        } catch (e) {
            results.urlScan = { error: "Failed to submit to URLScan" };
        }

        const newScan = new Scan({ url, results });
        await newScan.save();
        res.json(results);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/scan/wifi", (req, res) => {
    const { ssid, security, signalStrength } = req.body;
    let risk = "Low";
    if (security === "Open" || security === "None") risk = "High";
    else if (security === "WEP") risk = "Medium";

    res.json({
        ssid, risk, safe: risk === "Low",
        cyberAwareness: "Open Wi-Fi networks allow attackers to intercept your data. Use a VPN on untrusted networks."
    });
});

app.post("/api/scan/permissions", (req, res) => {
    const { permissions } = req.body;
    const riskyPermissions = ["android.permission.READ_SMS", "android.permission.RECEIVE_SMS", "android.permission.READ_CONTACTS", "android.permission.ACCESS_FINE_LOCATION", "android.permission.RECORD_AUDIO", "android.permission.CAMERA"];
    let flagged = [];
    if(permissions && Array.isArray(permissions)) flagged = permissions.filter(p => riskyPermissions.includes(p));
    let riskLevel = flagged.length > 2 ? "High" : (flagged.length > 0 ? "Medium" : "Low");

    res.json({
        riskLevel, flagged, safe: riskLevel === "Low",
        cyberAwareness: "Only grant permissions that are absolutely necessary for an app to function."
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

