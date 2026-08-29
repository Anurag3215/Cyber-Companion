import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

interface Props {
  text: string;
}

export const CyberAwareness = ({ text }: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Cyber Awareness</Title>
        <Paragraph style={styles.text}>{text}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    backgroundColor: "#e8f4fd",
  },
  title: {
    color: "#005a9c",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "#333",
  },
});

