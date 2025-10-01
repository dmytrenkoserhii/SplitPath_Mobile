import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SignInForm } from '../../components/auth/SignInForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1b1e" />
      <SignInForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
});
