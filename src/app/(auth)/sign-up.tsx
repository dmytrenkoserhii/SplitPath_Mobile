import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SignUpForm } from '../../components/auth/SignUpForm';

export default function SignUpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1b1e" />
      <SignUpForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
});
