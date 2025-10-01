import { xiorClient } from '@/src/lib';
import { UpdateAccountFormSchemaType } from '@/src/schemas/account';
import { Account } from '@/src/types/user';

interface AccountsService {
  getCurrent: () => Promise<Account>;
  update: (data: UpdateAccountFormSchemaType) => Promise<Account>;
}

const getCurrent = async (): Promise<Account> => {
  const response = await xiorClient.get<Account>('account');
  return response.data;
};

const update = async (data: UpdateAccountFormSchemaType): Promise<Account> => {
  const response = await xiorClient.patch<Account>('account', data);
  return response.data;
};

export const accountsService: AccountsService = {
  getCurrent,
  update,
};
