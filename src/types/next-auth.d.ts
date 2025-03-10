import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserRole } from 'types/user';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** ObjectId generated by MongoDb */
      id: string;
      /** The user's role */
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
  }
}
