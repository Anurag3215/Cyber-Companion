import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';

const DashboardScreen = () => {
  // Placeholder score for now, will connect to Zustand later
  const securityScore = 85; 
  const isSafe = securityScore >= 75;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Cyber Companion</Text>
      </View>

      <Card style={styles.scoreCard}>
        <Card.Content>
          <Text variant="titleMedium">Overall Security Score</Text>
          <Text variant="displayLarge" style={{ color: isSafe ? '#00e676' : '#ffea00' }}>
            {securityScore}
          </Text>
          <ProgressBar 
            progress={securityScore / 100} 
            color={isSafe ? '#00e676' : '#ffea00'} 
            style={styles.progressBar} 
          />
          <Text variant="bodyMedium" style={{ marginTop: 10 }}>
            {isSafe ? 'Your device is relatively secure.' : 'Warning: Action required.'}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.actionsContainer}>
        <Button mode="contained" icon="qrcode-scan" style={styles.actionButton} onPress={() => {}}>
          Scan QR Code
        </Button>
        <Button mode="contained" icon="shield-search" style={styles.actionButton} onPress={() => {}}>
          Analyze Wi-Fi
        </Button>
        <Button mode="contained" icon="lock-alert" style={styles.actionButton} onPress={() => {}}>
          Audit Permissions
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    padding: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#00e5ff',
    fontWeight: 'bold',
  },
  scoreCard: {
    backgroundColor: '#12121a',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: '#333',
  },
  actionsContainer: {
    gap: 15,
  },
  actionButton: {
    paddingVertical: 8,
  }
});

export default DashboardScreen;
