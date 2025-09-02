import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { storage, xiorClient } from "../lib";
import { AuthResponse } from "../types/auth";

WebBrowser.maybeCompleteAuthSession();

export class GoogleAuthService {
  static async signInWithGoogle(): Promise<AuthResponse> {
    console.log("Starting Google OAuth flow...");

    const backendUrl =
      xiorClient.defaults.baseURL ||
      process.env.EXPO_PUBLIC_BACKEND_URL ||
      "http://192.168.0.100:5050";

    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const googleAuthUrl = `${backendUrl}/auth/google`;

    console.log("Opening Google OAuth URL:", googleAuthUrl);

    const result = await WebBrowser.openBrowserAsync(googleAuthUrl, {
      dismissButtonStyle: "close",
      readerMode: false,
      enableBarCollapsing: false,
      showInRecents: true,
    });

    console.log("Browser result:", result);

    if (result.type === "cancel") {
      throw new Error("User cancelled Google authentication");
    }

    if (result.type === "dismiss") {
      throw new Error("Google authentication was dismissed");
    }

    try {
      const userResponse = await xiorClient.get("/auth/me");
      if (userResponse.data) {
        const accessToken = await storage.getAccessToken();
        const refreshToken = await storage.getRefreshToken();

        return {
          user: userResponse.data,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        } as AuthResponse;
      }
    } catch (authError) {}

    throw new Error("Google authentication flow incomplete");
  }

  static async signInWithGoogleAuthSession(): Promise<AuthResponse> {
    console.log("🔍 Starting Google OAuth with AuthSession...");

    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "splitpathmobile",
      path: "auth/google/callback",
    });

    const fallbackRedirectUri = "splitpathmobile://auth/google/callback";

    console.log("Redirect URI:", redirectUri);

    const backendUrl =
      xiorClient.defaults.baseURL ||
      process.env.EXPO_PUBLIC_BACKEND_URL ||
      "http://192.168.0.100:5050";

    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const googleAuthUrl = `${backendUrl}/auth/google`;

    console.log("Google OAuth URL:", googleAuthUrl);

    const result = await WebBrowser.openAuthSessionAsync(
      googleAuthUrl,
      fallbackRedirectUri
    );

    console.log("AuthSession result:", result);

    if (result.type === "cancel") {
      throw new Error("User cancelled Google authentication");
    }

    if (result.type === "success" && result.url) {
      const url = new URL(result.url);
      const accessToken = url.searchParams.get("access_token");
      const refreshToken = url.searchParams.get("refresh_token");
      const error = url.searchParams.get("error");

      if (error) {
        throw new Error(`Google OAuth error: ${error}`);
      }

      if (accessToken && refreshToken) {
        const userResponse = await xiorClient.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return {
          user: userResponse.data,
          accessToken,
          refreshToken,
        } as AuthResponse;
      }

      const authCode = url.searchParams.get("code");
      if (authCode) {
        const response = await xiorClient.post("/auth/google/callback", {
          code: authCode,
        });

        return response.data as AuthResponse;
      }
    }

    throw new Error("Google authentication flow incomplete");
  }

  static async signInWithGoogleSimple(): Promise<AuthResponse> {
    console.log("🔍 Starting simple Google OAuth flow...");

    const backendUrl =
      xiorClient.defaults.baseURL ||
      process.env.EXPO_PUBLIC_BACKEND_URL ||
      "http://192.168.0.100:5050";

    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const response = await xiorClient.post("/auth/google", {
      platform: Platform.OS,
    });

    return response.data as AuthResponse;
  }
}
