import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text, List } from "react-native-paper";
import { scanPermissions } from "../api/api";
import { CyberAwareness } from "../components/CyberAwareness";

export const PermissionAnalyzerScreen = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzePermissions = async () => {
    setLoading(true);
    try {
      // Mocking installed app permissions
      const mockPermissions = [
        "android.permission.INTERNET",
        "android.permission.CAMERA",
        "android.permission.READ_CONTACTS"
      ];
      const res = await scanPermissions(mockPermissions);
      setResult(res);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Permission Analyzer</Text>
      
      <Button mode="contained" onPress={analyzePermissions} loading={loading} style={styles.btn}>
        Scan Device Permissions
      </Button>

      {result && (
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Risk Level: {result.riskLevel}</Text>
              <Text>Flagged Permissions:</Text>
              {result.flagged?.map((p: string, i: number) => (
                <List.Item key={i} title={p.split(".").pop()} left={props => <List.Icon {...props} icon="alert" color="red" />} />
              ))}
              {result.flagged?.length === 0 && <Text>No high-risk permissions found.</Text>}
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
  btn: { marginBottom: 20 },
  card: { marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 }
});

