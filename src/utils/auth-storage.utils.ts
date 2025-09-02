import { storage } from "../lib/storage";
import { User } from "../types/user";

export const saveAuthData = async (authResponse: {
  user: User;
  accessToken: string;
  refreshToken: string;
}): Promise<void> => {
  try {
    const { user, accessToken, refreshToken } = authResponse;

    if (!user) {
      throw new Error("User data is undefined in auth response");
    }

    if (!accessToken && !refreshToken) {
      console.log("🍪 Cookie-based auth - saving user data only");
      await storage.setUserData(JSON.stringify(user));
      console.log("✅ User data saved (cookie-based auth)");
      return;
    }

    const accessTokenString =
      typeof accessToken === "string" ? accessToken : String(accessToken);
    const refreshTokenString =
      typeof refreshToken === "string" ? refreshToken : String(refreshToken);

    await Promise.all([
      storage.setAccessToken(accessTokenString),
      storage.setRefreshToken(refreshTokenString),
      storage.setUserData(JSON.stringify(user)),
    ]);

    console.log("✅ Auth data saved successfully");
  } catch (error) {
    console.error("Error saving auth data:", error);
    throw error;
  }
};

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userData = await storage.getUserData();
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting stored user:", error);
    return null;
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    await storage.clearAuthData();
  } catch (error) {
    console.error("Error clearing auth data:", error);
    throw error;
  }
};
