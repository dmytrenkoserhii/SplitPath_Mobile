import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import { useVerifyEmail } from "../../hooks/auth";

export const EmailVerificationScreen: React.FC = () => {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      router.replace("/(tabs)");
      return;
    }

    verifyEmailMutation.mutate(token, {
      onSuccess: () => {
        router.replace("/(tabs)");
      },
      onError: (error: any) => {
        console.error("Email verification error:", error);
      },
    });
  }, [token]);

  if (verifyEmailMutation.isPending) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Icon name='mail' size={64} color='#007AFF' style={styles.icon} />
          <Text style={styles.title}>Verifying Email...</Text>
          <Text style={styles.subtitle}>
            Please wait while we verify your email address.
          </Text>
        </View>
      </View>
    );
  }

  if (verifyEmailMutation.isError) {
    const error = verifyEmailMutation.error as any;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Icon name='x-circle' size={64} color='#e74c3c' style={styles.icon} />
          <Text style={styles.title}>Email Verification Failed</Text>
          {error && (
            <Text style={styles.errorText}>
              {error.response?.data?.message ||
                error.message ||
                "An error occurred during verification"}
            </Text>
          )}
          <Button
            title='Go to Dashboard'
            onPress={() => router.replace("/(tabs)")}
            buttonStyle={styles.primaryButton}
            titleStyle={styles.primaryButtonText}
          />
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    minWidth: 200,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
