import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthNavigator } from '../components/auth';
import { AuthProvider } from '../context';
import { queryClient } from '../lib';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
