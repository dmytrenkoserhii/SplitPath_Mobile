import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { EmailVerificationScreen } from '@/src/components/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmailVerification() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <EmailVerificationScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
