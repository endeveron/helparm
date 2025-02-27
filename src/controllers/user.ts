import bcrypt from 'bcrypt';
import { User } from 'next-auth';

import { UserModel } from 'models/user';
import { dbConnect } from 'lib/mongo';
import logger from 'utils/logger';

export const getUserDataForAuth = async (
  credentials: Record<'email' | 'password', string>
) => {
  try {
    await dbConnect();

    // Find user by email in the database
    const user = await UserModel.findOne({
      'account.email': credentials.email,
    });
    if (!user) {
      return {
        data: null,
        error: 'Для цієї email адреси акаунт не зареєстровано',
      };
    }

    // Check provided password
    let isPasswordValid = false;
    isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.account.password
    );
    if (!isPasswordValid) {
      return {
        data: null,
        error: 'Невірно вказано пароль',
      };
    }

    const userData: User = {
      id: user._id.toString(),
      name: user.account.name,
      email: user.account.email,
      role: user.role,
    };

    return {
      data: userData,
      error: null,
    };
  } catch (err: any) {
    logger.r('loginUser', err);
    return {
      data: null,
      error: 'Помилка серверу. Будь ласка спробуйте пізніше.',
    };
    // throw new Error('User authentication failed.');
  }
};
