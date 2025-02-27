import bcrypt from 'bcrypt';

import { UserModel } from 'models/user';
import { dbConnect } from 'lib/mongo';
import { User } from 'next-auth';
import { NextResponse } from 'next/server';
import { UserReqData, UserResData } from 'types/auth';
import logger from 'utils/logger';
import { IContactsData, IContactsResData } from 'types/contacts';
import { Result } from 'types/common';
import { sendContactsMail } from 'controllers/contacts';

export const POST = async (
  req: Request
): Promise<NextResponse<Result<IContactsResData>>> => {
  const contactsData = (await req.json()) as IContactsData;

  if (
    !contactsData ||
    !contactsData.name ||
    !contactsData.email ||
    !contactsData.message
  )
    return NextResponse.json(
      {
        error: 'Відсутні необхідні дані.',
        data: null,
      },
      { status: 422 }
    );

  try {
    const { data, error } = await sendContactsMail(contactsData);

    return NextResponse.json({ data });

    // Successfully signed in.
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: 'Акаунт не створено. Спробуйте пізніше',
      data: null,
    });
  }
};
