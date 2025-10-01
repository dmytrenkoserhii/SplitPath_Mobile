import React, { createContext, useContext } from 'react';
import { useCurrentUser } from '@/src/hooks/auth';
import { AuthContextType } from '@/src/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    data: user,
    isLoading,
    error,
    refetch: refreshUser,
  } = useCurrentUser();

  const isAuthenticated = !!user && !error;

  console.log('🔐 AuthProvider state:', {
    hasUser: !!user,
    isLoading,
    isAuthenticated,
    error: error?.message,
  });

  const contextValue: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated,
    refreshUser: async () => {
      await refreshUser();
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
