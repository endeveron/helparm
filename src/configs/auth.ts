import { getUserDataForAuth } from 'controllers/user';
import type { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import logger from 'utils/logger';

const clientId = process.env.OAUTH_GOOGLE_CLIENT_ID!;
const clientSecret = process.env.OAUTH_GOOGLE_CLIENT_SECRET!;

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // // Using the Server Action
        // try {
        //   const { data, error } = await loginUser(credentials);
        //   // Success: User object will be saved in `user` property of the JWT
        //   // Error: User object will be sent to the error page with the error message as a query parameter
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   if (error) throw new Error(error);
        //   return data;
        // } catch (err) {
        //   logger.r('Credentials.authorize', err);
        //   throw err;
        // }

        // // Using the API
        // try {
        //   const res = await fetch(`/api/auth/user`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       email: credentials.email,
        //       password: credentials.password,
        //     }),
        //   });
        //   if (!res?.ok) {
        //     console.error('Server error');
        //     return;
        //   }
        //   const resData = await res.json();
        //   if (resData.error) {
        //     throw new Error(resData.error);
        //   } else {
        //     return resData.data;
        //   }
        // } catch (err) {
        //   logger.r('Credentials.authorize', err);
        //   throw err;
        // }

        try {
          // Using db controller
          const { data, error } = await getUserDataForAuth(credentials);
          if (error) throw new Error(error);
          return data;
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user?.role) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
};
