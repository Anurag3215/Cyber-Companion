import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";

import { DashboardScreen } from "./src/screens/DashboardScreen";
import { WifiAnalyzerScreen } from "./src/screens/WifiAnalyzerScreen";
import { UrlScannerScreen } from "./src/screens/UrlScannerScreen";
import { QrScannerScreen } from "./src/screens/QrScannerScreen";
import { PermissionAnalyzerScreen } from "./src/screens/PermissionAnalyzerScreen";
import { SecurityScoreScreen } from "./src/screens/SecurityScoreScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#005a9c",
    secondary: "#e8f4fd",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{
            headerStyle: { backgroundColor: "#005a9c" },
            headerTintColor: "#fff"
        }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Cyber Companion" }} />
          <Stack.Screen name="SecurityScore" component={SecurityScoreScreen} options={{ title: "Security Score" }} />
          <Stack.Screen name="WifiAnalyzer" component={WifiAnalyzerScreen} options={{ title: "Wi-Fi Analyzer" }} />
          <Stack.Screen name="UrlScanner" component={UrlScannerScreen} options={{ title: "URL Scanner" }} />
          <Stack.Screen name="QrScanner" component={QrScannerScreen} options={{ title: "QR Scanner" }} />
          <Stack.Screen name="PermissionAnalyzer" component={PermissionAnalyzerScreen} options={{ title: "Permission Analyzer" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

