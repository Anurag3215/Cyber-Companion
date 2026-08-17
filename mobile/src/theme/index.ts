import { MD3DarkTheme as DefaultTheme } from 'react-native-paper';

export const CyberTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00e5ff', // Cyberpunk Neon Cyan
    accent: '#ff0055',  // Neon Pink
    background: '#0a0a0f', // Deep dark background
    surface: '#12121a', // Slightly lighter for cards
    text: '#e0e0e0',
    error: '#ff1744',
    success: '#00e676',
    warning: '#ffea00',
  },
};
