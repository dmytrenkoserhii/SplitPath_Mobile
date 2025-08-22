import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#25292e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Main tab navigation - no header */}
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

        {/* Auth screens - show header with back button */}
        <Stack.Screen
          name='(auth)'
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />

        {/* Any other screens you want to push onto the stack */}
        {/* Example: Game screen, profile details, etc. */}
      </Stack>
      <StatusBar style='light' />
    </>
  );
}
