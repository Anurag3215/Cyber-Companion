import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { scanUrl } from "../api/api";
import { CyberAwareness } from "../components/CyberAwareness";

export const UrlScannerScreen = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeUrl = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await scanUrl(url);
      setResult(res);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>URL Scanner</Text>
      
      <TextInput
        label="Enter URL to scan"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        style={styles.input}
      />
      <Button mode="contained" onPress={analyzeUrl} loading={loading} style={styles.btn}>
        Scan URL
      </Button>

      {result && (
        <View style={styles.resultsContainer}>
          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={styles.title}>VirusTotal</Text>
              {result.virusTotal?.error ? (
                <Text style={{color:"red"}}>{result.virusTotal.error}</Text>
              ) : (
                <>
                  <Text>Malicious: {result.virusTotal?.malicious || 0}</Text>
                  <Text>Suspicious: {result.virusTotal?.suspicious || 0}</Text>
                </>
              )}
            </Card.Content>
          </Card>

          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={styles.title}>URLScan.io</Text>
              <Text>{result.urlScan?.message || "Submitted successfully"}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={styles.title}>OpenPhish</Text>
              <Text>{result.openPhish?.isPhishing ? "PHISHING DETECTED" : "Not found in phishing database"}</Text>
            </Card.Content>
          </Card>

          {result.cyberAwareness && (
            <CyberAwareness text={result.cyberAwareness} />
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { marginBottom: 16 },
  btn: { marginBottom: 20 },
  resultsContainer: { paddingBottom: 40 },
  resultCard: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 }
});

