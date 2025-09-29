import { xiorClient } from '../lib/xior-client';
import { UpdateAccountFormSchemaType } from '../schemas/account';
import { Account } from '../types/user/account.interface';

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
