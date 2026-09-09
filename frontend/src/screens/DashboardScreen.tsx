import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const DashboardScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.mainTitle}>Cyber Companion</Title>

      <Card style={styles.card} onPress={() => navigation.navigate("SecurityScore")}>
        <Card.Title 
          title="Security Score" 
          subtitle="Overall device safety rating."
          left={(props) => <MaterialCommunityIcons {...props} name="shield-check" size={24} color="#005a9c" />}
        />
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("WifiAnalyzer")}>
        <Card.Title 
          title="Wi-Fi Risk Analyzer" 
          subtitle="Evaluate current network safety."
          left={(props) => <MaterialCommunityIcons {...props} name="wifi-strength-lock-outline" size={24} color="#005a9c" />}
        />
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("UrlScanner")}>
        <Card.Title 
          title="URL Scanner" 
          subtitle="Check links for phishing and malware."
          left={(props) => <MaterialCommunityIcons {...props} name="link-lock" size={24} color="#005a9c" />}
        />
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("QrScanner")}>
        <Card.Title 
          title="QR Scanner" 
          subtitle="Safely scan and analyze QR codes."
          left={(props) => <MaterialCommunityIcons {...props} name="qrcode-scan" size={24} color="#005a9c" />}
        />
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate("PermissionAnalyzer")}>
        <Card.Title 
          title="Permission Analyzer" 
          subtitle="Audit app permissions and privacy risks."
          left={(props) => <MaterialCommunityIcons {...props} name="cellphone-key" size={24} color="#005a9c" />}
        />
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

