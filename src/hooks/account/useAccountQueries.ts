import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
import { queryKeys } from '../../lib';
import { UpdateAccountFormSchemaType } from '../../schemas/account';
import { accountsService } from '../../services';
import { Account } from '../../types/user/account.interface';

export const useCurrentAccount = () => {
  return useQuery({
    queryKey: queryKeys.currentAccount,
    queryFn: async (): Promise<Account> => {
      const response = await accountsService.getCurrent();
      return response;
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, UpdateAccountFormSchemaType>({
    mutationFn: (values: UpdateAccountFormSchemaType) => {
      const payload: UpdateAccountFormSchemaType = {
        ...values,
        birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
      };
      return accountsService.update(payload);
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.currentAccount });
    },
    onError: (err: any) => {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: err.message || 'An unexpected error occurred.',
      });
    },
  });
};
