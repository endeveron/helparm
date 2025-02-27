import { getServerSession, User } from 'next-auth';

import { authConfig } from 'configs/auth';
import { IUser } from 'types/user';

export const configureUserAuthData = (user: IUser): User => {
  const { password, ...newAccountData } = user.account;
  return {
    id: user._id?.toString() as string,
    name: newAccountData.name,
    email: newAccountData.email,
    role: {
      index: user?.role?.index || 0,
      name: user?.role?.name || 'guest',
    },
  };
};

/** Check user auth status. Use in server components */
export const getAuthStatus = async () => {
  const session = await getServerSession(authConfig);
  return !!session?.user.id;
};
