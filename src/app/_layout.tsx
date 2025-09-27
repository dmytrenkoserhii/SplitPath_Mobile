import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthNavigator } from '../components/auth';
import { AuthProvider } from '../context';
import { queryClient } from '../lib';

import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#6750A4',
      tertiary: '#7D5260',
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
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
