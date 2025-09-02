import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm";

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <ForgotPasswordForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
