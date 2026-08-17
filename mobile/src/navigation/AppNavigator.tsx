import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: '#12121a' },
        headerTintColor: '#00e5ff',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#0a0a0f' }
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ headerShown: false }} // Custom header in screen
      />
    </Stack.Navigator>
  );
};
