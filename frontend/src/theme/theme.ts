import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    accent: '#03dac6',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#b00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#c7c7c7',
    placeholder: '#a1a1a1',
    backdrop: '#000000',
  },
  roundness: 8,
};

export const colors = {
  french: '#0055a4',
  german: '#000000',
  success: '#4caf50',
  warning: '#ff9800',
  info: '#2196f3',
  light: '#f8f9fa',
  dark: '#343a40',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};
