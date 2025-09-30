import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  user: ['user'] as const,
  currentUser: ['user', 'current'] as const,
  userById: (id: number) => ['user', 'id', id] as const,
  userByEmail: (email: string) => ['user', 'email', email] as const,

  auth: ['auth'] as const,
  authStatus: ['auth', 'status'] as const,

  stories: ['stories'] as const,
  story: (id: number) => ['stories', id] as const,

  friends: ['friends'] as const,
  friendRequests: ['friends', 'requests'] as const,

  currentAccount: ['account', 'current'] as const,
} as const;

const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000,

  gcTime: 10 * 60 * 1000,

  retry: 3,

  refetchOnWindowFocus: false,

  refetchOnReconnect: true,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...defaultQueryOptions,
    },
    mutations: {},
  },
});

export const queryOptions = {
  user: {
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  },

  auth: {
    staleTime: 30 * 1000,
    gcTime: 60 * 1000,
  },

  stories: {
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },
} as const;
