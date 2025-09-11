import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { queryKeys, queryOptions, storage } from '../../lib';
import { ForgotPasswordSchemaType } from '../../schemas/forgot-password.schema';
import { SignInFormSchemaType } from '../../schemas/sign-in.schema';
import { SignUpFormSchemaType } from '../../schemas/sign-up.schema';
import { authService } from '../../services';
import { AuthResponse } from '../../types/auth';
import { User } from '../../types/user';

import { hasValidSession } from '../../utils/auth-session.utils';
import {
  clearAuthData,
  getStoredUser,
  saveAuthData,
} from '../../utils/auth-storage.utils';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async (): Promise<User | null> => {
      console.log('Getting current user...');

      try {
        const storedUser = await getStoredUser();

        if (storedUser) {
          console.log('✅ Found stored user:', storedUser.email);
          return storedUser;
        }

        const hasSession = await hasValidSession();
        if (!hasSession) {
          console.log('❌ No valid session found');
          return null;
        }
      } catch (storageError) {
        console.error('Error checking auth state:', storageError);
        return null;
      }

      try {
        console.log(
          '🔍 No stored user but have session, trying token verification...'
        );
        const response = await authService.verifyToken();
        console.log('✅ Token verification successful');
        return response;
      } catch (error) {
        console.log('❌ Token verification failed');
        return null;
      }
    },
    ...queryOptions.user,
    retry: false,
    staleTime: queryOptions.auth.staleTime,
    gcTime: queryOptions.auth.gcTime,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignInFormSchemaType): Promise<AuthResponse> => {
      console.log('Calling sign in API...');
      const response = await authService.signIn(data);
      console.log('API response:', response);

      if (
        response &&
        response.user &&
        !response.accessToken &&
        !response.refreshToken
      ) {
        console.log(
          'Cookie-based auth detected - tokens should be in HTTP-only cookies'
        );
        return {
          user: response.user,
          accessToken: '',
          refreshToken: '',
        };
      }

      return response;
    },
    onSuccess: async (data: AuthResponse) => {
      console.log('Sign in success data:', data);

      if (!data || !data.user) {
        console.error('❌ Invalid auth response structure:', data);
        throw new Error('Invalid response from server');
      }

      await saveAuthData(data);

      queryClient.setQueryData(queryKeys.currentUser, data.user);

      queryClient.invalidateQueries({ queryKey: queryKeys.user });

      console.log('✅ Sign in successful');
    },
    onError: (error: any) => {
      console.error('❌ Sign in failed:', error);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignUpFormSchemaType): Promise<AuthResponse> => {
      const { username, email, password } = data;
      console.log('Calling sign up API...');
      const response = await authService.signUp({ username, email, password });
      console.log('Raw signup response:', response);

      return response;
    },
    onSuccess: async (data: AuthResponse) => {
      console.log('Sign up success data:', data);

      if (!data || !data.user) {
        console.error('❌ Invalid auth response structure:', data);
        throw new Error('Invalid response from server');
      }

      await saveAuthData(data);

      queryClient.setQueryData(queryKeys.currentUser, data.user);

      queryClient.invalidateQueries({ queryKey: queryKeys.user });

      console.log('✅ Sign up successful');
    },
    onError: (error: any) => {
      console.error('❌ Sign up failed:', error);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      console.log('Starting logout mutation...');

      const hasTokens = await storage.hasAuthTokens();

      if (hasTokens) {
        try {
          console.log('Calling server logout (token-based auth)...');
          await authService.signOut();
          console.log('✅ Server logout successful');
        } catch (error) {
          console.log('Server logout failed:', error);
        }
      } else {
        console.log('Cookie-based auth - skipping server logout');
      }
    },
    onSuccess: async () => {
      console.log('🧹 Starting local cleanup...');

      await clearAuthData();
      console.log('✅ Auth data cleared from storage');

      queryClient.setQueryData(queryKeys.currentUser, null);
      console.log('✅ Current user set to null');

      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      console.log('✅ Current user query invalidated');

      queryClient.removeQueries({ queryKey: queryKeys.user });
      console.log('✅ User queries removed');

      console.log('✅ Sign out successful - local data cleared');
    },
    onError: async (error: any) => {
      console.error('❌ Sign out failed:', error);
      await clearAuthData();
      queryClient.setQueryData(queryKeys.currentUser, null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      queryClient.removeQueries({ queryKey: queryKeys.user });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordSchemaType): Promise<void> => {
      await authService.forgotPassword(data.email);
    },
    onSuccess: () => {
      console.log('✅ Password reset email sent');
    },
    onError: (error: any) => {
      console.error('❌ Forgot password failed:', error);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }): Promise<void> => {
      await authService.resetPassword(token, password);
    },
    onSuccess: () => {
      console.log('✅ Password reset successful');
      router.replace('/(auth)/sign-in');
    },
    onError: (error: any) => {
      console.error('❌ Password reset failed:', error);
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      const refreshToken = await storage.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(refreshToken);

      await saveAuthData(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      console.log('✅ Token refresh successful');
    },
    onError: (error: any) => {
      console.error('❌ Token refresh failed:', error);
      clearAuthData();
      queryClient.setQueryData(queryKeys.currentUser, null);
      router.replace('/(auth)/sign-in');
    },
  });
};
