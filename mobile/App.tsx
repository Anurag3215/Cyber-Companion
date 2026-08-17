import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppNavigator } from './src/navigation/AppNavigator';
import { CyberTheme } from './src/theme';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <PaperProvider theme={CyberTheme}>
      <NavigationContainer theme={{
        dark: true,
        colors: {
          primary: CyberTheme.colors.primary,
          background: CyberTheme.colors.background,
          card: CyberTheme.colors.surface,
          text: CyberTheme.colors.text,
          border: '#333',
          notification: CyberTheme.colors.error,
        }
      }}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
