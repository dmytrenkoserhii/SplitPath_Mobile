import { useState } from "react";
import { GoogleAuthService } from "../services/google-auth.service";
import { AuthResponse } from "../types/auth";
import { User } from "../types/user";
import { saveAuthData } from "../utils/auth-storage.utils";

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async (): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Starting Google sign in...");

      const response: AuthResponse =
        await GoogleAuthService.signInWithGoogleAuthSession();

      console.log("✅ Google authentication successful");

      await saveAuthData(response);

      console.log("✅ Auth data saved successfully");
      return response.user;
    } catch (err: any) {
      console.error("❌ Google sign in error:", err);

      const errorMessage =
        err.response?.data?.message || err.message || "Google sign in failed";

      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogleAuthSession = async (): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Starting Google sign in with AuthSession...");

      const response = await GoogleAuthService.signInWithGoogleAuthSession();

      console.log("✅ Google AuthSession authentication successful");

      await saveAuthData(response);

      console.log("✅ Auth data saved successfully");
      return response.user;
    } catch (err: any) {
      console.error("❌ Google AuthSession sign in error:", err);

      const errorMessage =
        err.response?.data?.message || err.message || "Google sign in failed";

      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    signInWithGoogle,
    signInWithGoogleAuthSession,
    isLoading,
    error,
    clearError,
  };
};
