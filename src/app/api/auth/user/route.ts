import bcrypt from 'bcrypt';

import { UserModel } from 'models/user';
import { dbConnect } from 'lib/mongo';
import { User } from 'next-auth';
import { NextResponse } from 'next/server';
import { UserReqData, UserResData } from 'types/auth';
import logger from 'utils/logger';

export const POST = async (
  req: Request
): Promise<NextResponse<UserResData>> => {
  const { email, password } = (await req.json()) as UserReqData;

  try {
    await dbConnect();

    // Find user by email in the database
    const user = await UserModel.findOne({
      'account.email': email,
    });
    if (!user) {
      return NextResponse.json(
        { error: 'Для цієї email адреси акаунт не зареєстровано', data: null },
        { status: 422 }
      );
    }

    // Check provided password
    let isPasswordValid = false;
    isPasswordValid = await bcrypt.compare(password, user.account.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Невірно вказано пароль', data: null },
        { status: 422 }
      );
    }

    const userData: User = {
      id: user._id.toString(),
      name: user.account.name,
      email: user.account.email,
      role: user.role,
    };

    return NextResponse.json({
      data: userData,
    });

    // Successfully signed in.
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: 'Акаунт не створено. Спробуйте пізніше',
      data: null,
    });
  }
};
