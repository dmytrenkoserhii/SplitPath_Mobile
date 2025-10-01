import { storage } from '@/src/lib';

export const hasValidSession = async (): Promise<boolean> => {
  try {
    const hasTokens = await storage.hasAuthTokens();
    const userData = await storage.getUserData();

    if (!hasTokens && userData) {
      console.log('🍪 Cookie-based session detected');
      return true;
    }

    return hasTokens && !!userData;
  } catch (error) {
    console.error('Error checking session validity:', error);
    return false;
  }
};
