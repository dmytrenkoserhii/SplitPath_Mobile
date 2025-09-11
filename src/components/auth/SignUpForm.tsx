import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { useGoogleAuth } from '../../hooks';
import { useSignUp } from '../../hooks/auth';
import {
  SignUpFormSchema,
  SignUpFormSchemaType,
} from '../../schemas/sign-up.schema';

export const SignUpForm: React.FC = () => {
  const signUpMutation = useSignUp();
  const {
    signInWithGoogle,
    isLoading: isGoogleLoading,
    error: googleError,
  } = useGoogleAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignUpFormSchemaType) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        Alert.alert('Success');

        router.replace('/(auth)/email-confirmation');
      },
      onError: (error: any) => {
        console.error('❌ Sign up error:', error);

        Alert.alert(
          'Sign Up Failed',
          error.response?.data?.message ||
            error.message ||
            'An error occurred during registration'
        );
      },
    });
  };

  const navigateToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleGoogleSignUp = async () => {
    try {
      console.log('🔍 Starting Google sign up...');

      const user = await signInWithGoogle();

      if (user) {
        Alert.alert('Success', 'Successfully signed up with Google!');

        router.replace('/(tabs)');
      } else {
        if (googleError) {
          Alert.alert('Sign Up Failed', googleError);
        }
      }
    } catch (error: any) {
      console.error('❌ Google sign up failed:', error);
      Alert.alert(
        'Sign Up Failed',
        error.message || 'Google sign up failed. Please try again.'
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start your adventure</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Your username"
              label="Username"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={errors.username?.message}
              leftIcon={{ type: 'feather', name: 'user', color: '#909296' }}
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputContainer,
                errors.username && styles.inputError,
              ]}
            />
          )}
        />

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

        {password && (
          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Password must contain:</Text>
            <Text style={styles.requirementText}>• At least 6 characters</Text>
            <Text style={styles.requirementText}>• One uppercase letter</Text>
            <Text style={styles.requirementText}>• One lowercase letter</Text>
            <Text style={styles.requirementText}>• One number</Text>
            <Text style={styles.requirementText}>• One special character</Text>
          </View>
        )}

        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirm your password"
              label="Confirm Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              errorMessage={errors.passwordConfirmation?.message}
              leftIcon={{ type: 'feather', name: 'lock', color: '#909296' }}
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputContainer,
                errors.passwordConfirmation && styles.inputError,
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="terms"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={value}
                onPress={() => onChange(!value)}
                checkedColor="#ff8809"
                uncheckedColor="#404048"
                containerStyle={styles.checkbox}
              />
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>
                  I accept the{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => {
                      Alert.alert(
                        'Terms',
                        'Terms and conditions will be shown here'
                      );
                    }}
                  >
                    Terms and Conditions
                  </Text>
                </Text>
                {errors.terms && (
                  <Text style={styles.errorText}>{errors.terms.message}</Text>
                )}
              </View>
            </View>
          )}
        />

        <Button
          title="Create Account"
          onPress={handleSubmit(onSubmit)}
          loading={signUpMutation.isPending}
          disabled={signUpMutation.isPending}
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
          disabled={signUpMutation.isPending || isGoogleLoading}
          onPress={handleGoogleSignUp}
        />

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <Button
            title="Sign In"
            type="clear"
            titleStyle={styles.linkText}
            onPress={navigateToSignIn}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  formContainer: {
    backgroundColor: '#25262b',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    marginTop: 60,
    marginBottom: 40,
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
  passwordRequirements: {
    backgroundColor: '#1a1b1e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginTop: -16,
  },
  requirementsTitle: {
    color: '#ff8809',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementText: {
    color: '#909296',
    fontSize: 12,
    marginBottom: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginRight: 8,
  },
  termsTextContainer: {
    flex: 1,
    marginTop: 8,
  },
  termsText: {
    color: '#909296',
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: '#ff8809',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#fa5252',
    fontSize: 12,
    marginTop: 4,
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#909296',
    fontSize: 14,
  },
});
