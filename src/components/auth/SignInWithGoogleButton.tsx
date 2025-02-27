'use client';

import { signIn } from 'next-auth/react';
// import { useSearchParams } from 'next/navigation';

import { Button } from 'components';

const SignInWithGoogleButton = () => {
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/account';

  return (
    <Button
      variant="text"
      onClick={() => signIn('google', { callbackUrl: '/account' })}
    >
      Увійти з Google
    </Button>
  );
};

export { SignInWithGoogleButton };
