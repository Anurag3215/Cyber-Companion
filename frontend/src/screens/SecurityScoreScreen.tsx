import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { CyberAwareness } from "../components/CyberAwareness";

export const SecurityScoreScreen = () => {
  const [score, setScore] = useState(85);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Device Security Score</Text>
      
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.scoreMax}>/ 100</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Metrics</Text>
          <Text>• Network Safety: Good</Text>
          <Text>• App Permissions: 2 Risks Found</Text>
          <Text>• OS Version: Up to Date</Text>
        </Card.Content>
      </Card>

      <CyberAwareness text="Keeping your OS up to date is one of the most effective ways to protect your device from known vulnerabilities." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 30 },
  scoreCircle: {
    width: 150, height: 150, borderRadius: 75,
    backgroundColor: "#e8f4fd",
    justifyContent: "center", alignItems: "center",
    marginBottom: 30, borderWidth: 5, borderColor: "#005a9c"
  },
  scoreText: { fontSize: 48, fontWeight: "bold", color: "#005a9c" },
  scoreMax: { fontSize: 16, color: "#666" },
  card: { width: "100%", marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 }
});

