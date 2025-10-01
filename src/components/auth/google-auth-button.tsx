import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { xiorClient } from '@/src/lib';

interface GoogleAuthButtonProps {
  title?: string;
  isSignUp?: boolean;
  style?: any;
  titleStyle?: any;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  title = 'Continue with Google',
  isSignUp = false,
  style,
  titleStyle,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      console.log('🔍 Starting Google OAuth...');

      const backendUrl =
        xiorClient.defaults.baseURL ||
        process.env.EXPO_PUBLIC_BACKEND_URL ||
        (Platform.OS === 'web'
          ? 'http://localhost:5050'
          : 'http://192.168.0.100:5050');

      const googleAuthUrl = `${backendUrl}/auth/google`;
      console.log('🌐 Opening:', googleAuthUrl);

      const result = await WebBrowser.openBrowserAsync(googleAuthUrl, {
        dismissButtonStyle: 'close',
        readerMode: false,
      });

      console.log('📱 Browser closed with result:', result.type);

      if (result.type === 'cancel' || result.type === 'dismiss') {
        console.log('👤 User cancelled OAuth');
        return;
      }

      Alert.alert(
        'Google Authentication',
        'If you completed the Google sign in, please close this dialog and try signing in with your email, or restart the app.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('User completed Google OAuth flow');
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('❌ Google OAuth error:', error);
      Alert.alert('Error', error.message || 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      title={title}
      type="outline"
      buttonStyle={style}
      titleStyle={titleStyle}
      loading={isLoading}
      disabled={isLoading}
      onPress={handleGoogleAuth}
    />
  );
};
