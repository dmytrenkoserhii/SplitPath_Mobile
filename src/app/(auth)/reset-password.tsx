import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ResetPasswordForm } from "../../components/auth/ResetPasswordForm";

export default function ResetPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <ResetPasswordForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
