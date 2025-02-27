import { Metadata } from 'next';
import Link from 'next/link';

import { SignInForm } from 'components/auth/authForm/SignInForm';
import { SignInWithGoogleButton } from 'components/auth/SignInWithGoogleButton';
import { Heading } from 'components/Heading';

import '../auth.scss';

export const metadata: Metadata = {
  title: 'Авторизація – HelpArm',
  description: 'Авторизація',
};

const Signin = () => {
  return (
    <main className="auth anim">
      <Heading as="h1" className="auth__title">
        Вхід
      </Heading>
      <SignInForm />
      {/* <div className="auth__providers">
        <SignInWithGoogleButton />
      </div>
      <Link className="auth__link" href="/auth/sign-up">
        Створити акаунт
      </Link> */}
    </main>
  );
};

export default Signin;
