import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useResetPassword } from '../../hooks/auth';
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '../../schemas/reset-password.schema';

export const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetPasswordMutation = useResetPassword();

  const { token } = useLocalSearchParams<{ token: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    if (!token) return;

    resetPasswordMutation.mutate(
      { token, password: data.password },
      {
        onSuccess: () => {
          Alert.alert(
            'Password Reset Successful',
            'Your password has been successfully reset. You can now sign in with your new password.',
            [
              {
                text: 'Sign In',
                onPress: () => {
                  router.replace('/(auth)/sign-in');
                },
              },
            ]
          );
        },
        onError: (error: any) => {
          console.error('❌ Password reset failed:', error);

          Alert.alert(
            'Reset Failed',
            error.response?.data?.message ||
              error.message ||
              'Failed to reset password. The link may be expired or invalid.'
          );
        },
      }
    );
  };

  const navigateToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Invalid Reset Link</Text>
          <Text style={styles.subtitle}>
            This password reset link is invalid or has expired. Please request a
            new one.
          </Text>
          <Button
            title="Request New Link"
            onPress={() => router.replace('/(auth)/forgot-password')}
            buttonStyle={styles.primaryButton}
            titleStyle={styles.primaryButtonText}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Set New Password</Text>
        <Text style={styles.subtitle}>
          Please enter your new password. Make sure it&apos;s strong and secure.
        </Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter new password"
              label="New Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              errorMessage={errors.password?.message}
              leftIcon={{ type: 'feather', name: 'lock', color: '#909296' }}
              rightIcon={{
                type: 'feather',
                name: showPassword ? 'eye-off' : 'eye',
                color: '#909296',
                onPress: () => setShowPassword(!showPassword),
              }}
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputContainer,
                errors.password && styles.inputError,
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirm new password"
              label="Confirm Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showConfirmPassword}
              errorMessage={errors.confirmPassword?.message}
              leftIcon={{ type: 'feather', name: 'lock', color: '#909296' }}
              rightIcon={{
                type: 'feather',
                name: showConfirmPassword ? 'eye-off' : 'eye',
                color: '#909296',
                onPress: () => setShowConfirmPassword(!showConfirmPassword),
              }}
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputContainer,
                errors.confirmPassword && styles.inputError,
              ]}
            />
          )}
        />

        {password && (
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <Text
              style={[
                styles.requirement,
                password.length >= 8
                  ? styles.requirementMet
                  : styles.requirementNotMet,
              ]}
            >
              • At least 8 characters
            </Text>
            <Text
              style={[
                styles.requirement,
                /[A-Z]/.test(password)
                  ? styles.requirementMet
                  : styles.requirementNotMet,
              ]}
            >
              • One uppercase letter
            </Text>
            <Text
              style={[
                styles.requirement,
                /[a-z]/.test(password)
                  ? styles.requirementMet
                  : styles.requirementNotMet,
              ]}
            >
              • One lowercase letter
            </Text>
            <Text
              style={[
                styles.requirement,
                /\d/.test(password)
                  ? styles.requirementMet
                  : styles.requirementNotMet,
              ]}
            >
              • One number
            </Text>
          </View>
        )}

        <Button
          title="Reset Password"
          onPress={handleSubmit(onSubmit)}
          loading={resetPasswordMutation.isPending}
          disabled={resetPasswordMutation.isPending}
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
  requirementsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  requirement: {
    fontSize: 12,
    marginBottom: 4,
  },
  requirementMet: {
    color: '#27ae60',
  },
  requirementNotMet: {
    color: '#e74c3c',
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
