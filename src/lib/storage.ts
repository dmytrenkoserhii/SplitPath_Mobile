import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

let SecureStore: any;
if (!isWeb) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  SecureStore = require('expo-secure-store');
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export const storage = {
  async setAccessToken(token: string): Promise<void> {
    try {
      const tokenString = typeof token === 'string' ? token : String(token);

      if (isWeb) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokenString);
      } else {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokenString);
      }
    } catch (error) {
      console.error('Error storing access token:', error);
      throw error;
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      if (isWeb) {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
      } else {
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  },

  async setRefreshToken(token: string): Promise<void> {
    try {
      const tokenString = typeof token === 'string' ? token : String(token);

      if (isWeb) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenString);
      } else {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenString);
      }
    } catch (error) {
      console.error('Error storing refresh token:', error);
      throw error;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      if (isWeb) {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
      } else {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  },

  async setUserData(userData: string): Promise<void> {
    try {
      if (isWeb) {
        localStorage.setItem(USER_DATA_KEY, userData);
      } else {
        await SecureStore.setItemAsync(USER_DATA_KEY, userData);
      }
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  },

  async getUserData(): Promise<string | null> {
    try {
      if (isWeb) {
        return localStorage.getItem(USER_DATA_KEY);
      } else {
        return await SecureStore.getItemAsync(USER_DATA_KEY);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  },

  async clearAuthData(): Promise<void> {
    try {
      if (isWeb) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      } else {
        await Promise.all([
          SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
          SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
          SecureStore.deleteItemAsync(USER_DATA_KEY),
        ]);
      }
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  },

  async hasAuthTokens(): Promise<boolean> {
    try {
      const accessToken = await this.getAccessToken();
      const refreshToken = await this.getRefreshToken();
      return !!(accessToken && refreshToken);
    } catch (error) {
      console.error('Error checking auth tokens:', error);
      return false;
    }
  },
};
