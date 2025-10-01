import { storage } from '@/src/lib';
import { AuthResponse } from '@/src/types/auth';
import { User } from '@/src/types/user';

// TODO: double check
export const saveAuthData = async (authResponse: AuthResponse) => {
  try {
    const { user, tokens } = authResponse;

    if (!user) {
      throw new Error('User data is undefined in auth response');
    }

    if (!tokens.accessToken && !tokens.refreshToken) {
      console.log('🍪 Cookie-based auth - saving user data only');
      await storage.setUserData(JSON.stringify(user));
      console.log('✅ User data saved (cookie-based auth)');
      return;
    }

    const accessTokenString =
      typeof tokens.accessToken === 'string'
        ? tokens.accessToken
        : String(tokens.accessToken);
    const refreshTokenString =
      typeof tokens.refreshToken === 'string'
        ? tokens.refreshToken
        : String(tokens.refreshToken);

    await Promise.all([
      storage.setAccessToken(accessTokenString),
      storage.setRefreshToken(refreshTokenString),
      storage.setUserData(JSON.stringify(user)),
    ]);

    console.log('✅ Auth data saved successfully');
  } catch (error) {
    console.error('Error saving auth data:', error);
    throw error;
  }
};

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userData = await storage.getUserData();
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    await storage.clearAuthData();
  } catch (error) {
    console.error('Error clearing auth data:', error);
    throw error;
  }
};
