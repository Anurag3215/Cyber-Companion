import axios from "axios";
import { Platform } from "react-native";

// Use 10.0.2.2 for Android emulator to access localhost, or localhost for web/ios
const API_URL = Platform.OS === "android" ? "http://10.0.2.2:5000/api" : "http://localhost:5000/api";

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

