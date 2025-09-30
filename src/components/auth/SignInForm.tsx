import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useGoogleAuth, useSignIn } from '@/src/hooks';
import {
  SignInFormSchema,
  SignInFormSchemaType,
} from '../../schemas/auth/sign-in.schema';

export const SignInForm: React.FC = () => {
  const signInMutation = useSignIn();
  const { signInWithGoogle, isLoading: isGoogleLoading } = useGoogleAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormSchemaType) => {
    signInMutation.mutate(data, {
      onSuccess: () => {
        Alert.alert('Success');

        router.replace('/(tabs)');
      },
      onError: (error: any) => {
        console.error('❌ Sign in error:', error);

        Alert.alert(
          'Sign In Failed',
          error.response?.data?.message ||
            error.message ||
            'Invalid email or password. Please try again.'
        );
      },
    });
  };

  const navigateToSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  const navigateToForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your adventure</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="your@email.com"
              label="Email"
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

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Your password"
              label="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              errorMessage={errors.password?.message}
              leftIcon={{ type: 'feather', name: 'lock', color: '#909296' }}
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputContainer,
                errors.password && styles.inputError,
              ]}
            />
          )}
        />

        <View style={styles.forgotPasswordContainer}>
          <Button
            title="Forgot password?"
            type="clear"
            titleStyle={styles.linkText}
            onPress={navigateToForgotPassword}
          />
        </View>

        <Button
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={signInMutation.isPending}
          disabled={signInMutation.isPending}
          buttonStyle={styles.primaryButton}
          titleStyle={styles.primaryButtonText}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          title="Continue with Google"
          type="outline"
          buttonStyle={styles.googleButton}
          titleStyle={styles.googleButtonText}
          loading={isGoogleLoading}
          disabled={signInMutation.isPending || isGoogleLoading}
          onPress={async () => {
            try {
              const user = await signInWithGoogle();
              if (user) {
                Alert.alert('Success', 'Google sign in completed!');
                router.replace('/(tabs)');
              }
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Google sign in failed');
            }
          }}
        />

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
          <Button
            title="Sign Up"
            type="clear"
            titleStyle={styles.linkText}
            onPress={navigateToSignUp}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#25262b',
    borderRadius: 12,
    padding: 24,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#909296',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputLabel: {
    color: '#ff8809',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#404048',
    backgroundColor: '#1a1b1e',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 8,
  },
  inputError: {
    borderBottomColor: '#fa5252',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -16,
    marginBottom: 24,
  },
  linkText: {
    color: '#ff8809',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#ff8809',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#404048',
  },
  dividerText: {
    color: '#909296',
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    borderColor: '#404048',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#909296',
    fontSize: 14,
  },
});
