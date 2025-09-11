import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { EmailVerificationScreen } from '../../components/auth/EmailVerificationScreen';

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
