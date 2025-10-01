import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys, queryOptions } from '@/src/lib';
import { usersService } from '@/src/services';
import { User } from '@/src/types/user';

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.userById(id),
    queryFn: async (): Promise<User> => {
      const response = await usersService.findOneById(id);
      return response;
    },
    ...queryOptions.user,
    enabled: !!id,
  });
};

export const useUserByEmail = (email: string) => {
  return useQuery({
    queryKey: queryKeys.userByEmail(email),
    queryFn: async (): Promise<User | null> => {
      const response = await usersService.findOneByEmail(email);
      return response;
    },
    ...queryOptions.user,
    enabled: !!email,
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string): Promise<void> => {
      await usersService.verifyEmail(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      queryClient.invalidateQueries({ queryKey: queryKeys.user });

      console.log('✅ Email verification successful');
    },
    onError: (error: any) => {
      console.error('❌ Email verification failed:', error);
    },
  });
};

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await usersService.resendVerificationEmail();
    },
    onSuccess: () => {
      console.log('✅ Verification email sent');
    },
    onError: (error: any) => {
      console.error('❌ Resend verification email failed:', error);
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async (): Promise<User> => {
      const response = await usersService.getCurrent();
      return response;
    },
    ...queryOptions.user,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<{ deleted: boolean }> => {
      const response = await usersService.deleteById(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
      console.log('✅ User deleted successfully');
    },
    onError: (error: any) => {
      console.error('❌ User deletion failed:', error);
    },
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: async (): Promise<User[]> => {
      const response = await usersService.findAll();
      return response;
    },
    ...queryOptions.user,
  });
};
