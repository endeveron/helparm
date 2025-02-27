'use client';

import { useTheme } from 'hooks/useTheme';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { ReduxProvider } from 'redux/ReduxProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  useTheme();

  return (
    <ReduxProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReduxProvider>
  );
};

export { Providers };
