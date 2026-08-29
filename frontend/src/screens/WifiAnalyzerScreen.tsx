import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { scanWifi } from "../api/api";
import { CyberAwareness } from "../components/CyberAwareness";

export const WifiAnalyzerScreen = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeWifi = async () => {
    setLoading(true);
    try {
      // In a real app, use react-native-wifi-reborn or NetInfo to get real SSID
      const mockSsid = "CoffeeShop_FreeWiFi";
      const mockSecurity = "Open"; 
      
      const res = await scanWifi(mockSsid, mockSecurity);
      setResult(res);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wi-Fi Risk Analyzer</Text>
      <Button mode="contained" onPress={analyzeWifi} loading={loading} style={styles.btn}>
        Analyze Current Network
      </Button>

      {result && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text style={styles.label}>Network: {result.ssid}</Text>
            <Text style={styles.label}>Risk Level: {result.risk}</Text>
            <Text style={[styles.status, { color: result.safe ? "green" : "red" }]}>
              {result.safe ? "Safe Network" : "Insecure Network"}
            </Text>
          </Card.Content>
        </Card>
      )}

      {result && result.cyberAwareness && (
        <CyberAwareness text={result.cyberAwareness} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  btn: { marginBottom: 20 },
  resultCard: { marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  status: { fontSize: 18, fontWeight: "bold", marginTop: 8 }
});

