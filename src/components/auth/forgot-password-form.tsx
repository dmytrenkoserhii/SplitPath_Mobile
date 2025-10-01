import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useForgotPassword } from '@/src/hooks/auth';
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/src/schemas/auth/forgot-password.schema';

export const ForgotPasswordForm: React.FC = () => {
  const forgotPasswordMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        Alert.alert(
          'Reset Email Sent',
          "We've sent a password reset link to your email. Please check your inbox and follow the instructions.",
          [
            {
              text: 'OK',
              onPress: () => {
                router.replace('/(auth)/sign-in');
              },
            },
          ]
        );
      },
      onError: (error: any) => {
        console.error('❌ Password reset request failed:', error);

        Alert.alert(
          'Request Failed',
          error.response?.data?.message ||
            error.message ||
            'Failed to send reset email. Please try again.'
        );
      },
    });
  };

  const navigateToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="your@email.com"
              label="Email Address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={errors.email?.message}
              leftIcon={{ type: 'feather', name: 'mail', color: '#909296' }}
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputContainer,
                errors.email && styles.inputError,
              ]}
            />
          )}
        />

        <Button
          title="Send Reset Email"
          onPress={handleSubmit(onSubmit)}
          loading={forgotPasswordMutation.isPending}
          disabled={forgotPasswordMutation.isPending}
          buttonStyle={styles.primaryButton}
          titleStyle={styles.primaryButtonText}
        />

        <View style={styles.backContainer}>
          <Text style={styles.backText}>Remember your password? </Text>
          <Button
            title="Sign In"
            type="clear"
            titleStyle={styles.linkText}
            onPress={navigateToSignIn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#ff4757',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    fontSize: 14,
    color: '#666666',
  },
  linkText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});
