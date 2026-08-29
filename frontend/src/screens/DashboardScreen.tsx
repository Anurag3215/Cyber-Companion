import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const DashboardScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.mainTitle}>Cyber Companion</Title>

      <Card style={styles.card} onPress={() => navigation.navigate("SecurityScore")}>
        <Card.Content>
          <Title>Security Score</Title>
          <Paragraph>Overall device safety rating.</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("WifiAnalyzer")}>
        <Card.Content>
          <Title>Wi-Fi Risk Analyzer</Title>
          <Paragraph>Evaluate current network safety.</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("UrlScanner")}>
        <Card.Content>
          <Title>URL Scanner</Title>
          <Paragraph>Check links for phishing and malware.</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("QrScanner")}>
        <Card.Content>
          <Title>QR Scanner</Title>
          <Paragraph>Safely scan and analyze QR codes.</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("PermissionAnalyzer")}>
        <Card.Content>
          <Title>Permission Analyzer</Title>
          <Paragraph>Audit app permissions and privacy risks.</Paragraph>
        </Card.Content>
      </Card>
      
      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  footer: {
    height: 40,
  }
});

