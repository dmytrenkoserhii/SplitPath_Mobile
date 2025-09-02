import { usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { PUBLIC_ROUTES } from "../../constants/auth";
import { useAuth } from "../../context";
import { AuthLoadingScreen } from "./AuthLoadingScreen";

interface AuthNavigatorProps {
  children: React.ReactNode;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      pathname.startsWith(route.replace("/(auth)", ""))
    );

    console.log("🔐 Auth Navigator Check:", {
      pathname,
      isPublicRoute,
      isAuthenticated,
      hasUser: !!user,
    });

    if (!isAuthenticated) {
      if (!isPublicRoute) {
        console.log("❌ Not authenticated, redirecting to login");
        router.replace("/(auth)/sign-in");
      }
      return;
    }

    if (isAuthenticated) {
      if (isPublicRoute) {
        console.log("✅ Already authenticated, redirecting to main app");
        router.replace("/(tabs)");
      }
      return;
    }
  }, [isLoading, isAuthenticated, pathname, router, user]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
};
