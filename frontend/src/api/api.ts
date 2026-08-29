import axios from "axios";
import { Platform } from "react-native";

// Updated to your local Wi-Fi IP address so the APK on your phone can connect!
const API_URL = "http://192.168.84.108:5000/api";

export const scanUrl = async (url: string) => {
    const res = await axios.post(`${API_URL}/scan/url`, { url });
    return res.data;
};

export const scanWifi = async (ssid: string, security: string) => {
    const res = await axios.post(`${API_URL}/scan/wifi`, { ssid, security, signalStrength: 100 });
    return res.data;
};

export const scanPermissions = async (permissions: string[]) => {
    const res = await axios.post(`${API_URL}/scan/permissions`, { permissions });
    return res.data;
};

