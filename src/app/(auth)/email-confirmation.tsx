import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmailConfirmationScreen() {
  const navigateToDashboard = () => {
    router.replace('/(tabs)');
  };

  const navigateToSignIn = () => {
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1b1e" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Email</Text>

          <Text style={styles.message}>
            We&apos;ve sent a verification link to your email address.
          </Text>

          <Text style={styles.message}>
            Please check your inbox and click on the link to verify your
            account.
          </Text>

          <Text style={styles.subtitle}>
            If you don&apos;t see the email, check your spam folder or try
            signing in - you can request a new verification email from there.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Continue to Dashboard"
              buttonStyle={styles.primaryButton}
              titleStyle={styles.primaryButtonText}
              onPress={navigateToDashboard}
            />

            <Button
              title="Back to Sign In"
              type="outline"
              buttonStyle={styles.secondaryButton}
              titleStyle={styles.secondaryButtonText}
              onPress={navigateToSignIn}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#25262b',
    borderRadius: 12,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff8809',
    textAlign: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#909296',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#ff8809',
    borderRadius: 8,
    paddingVertical: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: '#404048',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
