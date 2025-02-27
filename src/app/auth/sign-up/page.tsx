import { Metadata } from 'next';
import Link from 'next/link';

import { SignUpForm } from 'components/auth/authForm/SignupForm';
import { Heading } from 'components/Heading';

import '../auth.scss';
import { Button } from 'components';

export const metadata: Metadata = {
  title: 'Реєстрація – HelpArm',
  description: 'Реєстрація',
};

const Signup = async () => {
  return (
    <main className="auth anim">
      {/* <Heading as="h1" className="auth__title">
        Реєстрація
      </Heading>
      <SignUpForm />
      <Link className="auth__link" href="/auth/sign-in">
        Вже зареєстровані ?
      </Link> */}

      <Heading as="h1" className="auth__title">
        Реєстрацію тимчасово закрито
      </Heading>
      <Link href="/auth/sign-in">
        <Button variant="accent" className="promo-box__button">
          Увійти в свій акаунт
        </Button>
      </Link>
    </main>
  );
};

export default Signup;
