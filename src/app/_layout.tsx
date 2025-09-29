import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { AuthNavigator } from '../components/auth';
import { AuthProvider } from '../context';
import { queryClient } from '../lib';

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ffd33d',
    tertiary: '#7D5260',
    background: '#1a1b1e',
    surface: '#25292e',
    onSurface: '#ffffff',
    onSurfaceVariant: '#909296',
    error: '#ff4444',
  },
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={darkTheme}>
        <AuthProvider>
          <AuthNavigator>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#25292e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                }}
              />
            </Stack>
          </AuthNavigator>
          <StatusBar style="light" />
        </AuthProvider>
        <Toast />
      </PaperProvider>
    </QueryClientProvider>
  );
}
