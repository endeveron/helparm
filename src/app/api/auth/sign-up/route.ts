import bcrypt from 'bcrypt';

import { UserModel } from 'models/user';
import { dbConnect } from 'lib/mongo';
import { NextResponse } from 'next/server';
import { SignUpReqData, SignUpResData } from 'types/auth';
import { configureUserAuthData } from 'utils/auth';
import logger from 'utils/logger';

export const POST = async (
  req: Request
): Promise<NextResponse<SignUpResData>> => {
  const { email, name, password } = (await req.json()) as SignUpReqData;

  try {
    await dbConnect();

    // Check if email in use.
    const userFromDb = await UserModel.findOne({ 'account.email': email });
    if (userFromDb) {
      return NextResponse.json(
        { error: 'Email вже використовується', data: null },
        { status: 422 }
      );
    }

    // Hashing the provided password.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user.
    const user = new UserModel({
      account: {
        name,
        email,
        password: hashedPassword,
      },
      role: {
        index: 1,
        name: 'user',
      },
    });

    await user.save();

    return NextResponse.json({
      data: configureUserAuthData(user),
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
