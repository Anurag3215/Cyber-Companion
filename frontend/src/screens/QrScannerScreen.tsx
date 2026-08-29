import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text as RNText } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Camera, CameraView } from "expo-camera";
import { scanUrl } from "../api/api";
import { CyberAwareness } from "../components/CyberAwareness";

export const QrScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    // Treat data as URL and scan it
    try {
      const res = await scanUrl(data);
      setResult(res);
    } catch (error) {
      console.error(error);
    }
  };

  if (hasPermission === null) {
    return <RNText>Requesting for camera permission</RNText>;
  }
  if (hasPermission === false) {
    return <RNText>No access to camera</RNText>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.header}>QR Scan Results</Text>
          {result && (
             <Card style={styles.card}>
               <Card.Content>
                 <Text>Scanned URL: {result.url}</Text>
                 <Text>Malicious (VT): {result.virusTotal?.malicious || 0}</Text>
                 <Text>Phishing (OpenPhish): {result.openPhish?.isPhishing ? "Yes" : "No"}</Text>
               </Card.Content>
             </Card>
          )}

          {result?.cyberAwareness && (
            <CyberAwareness text={result.cyberAwareness} />
          )}

          <Button mode="contained" onPress={() => setScanned(false)} style={{marginTop: 20}}>
            Tap to Scan Again
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", justifyContent: "center" },
  resultContainer: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 20 }
});

