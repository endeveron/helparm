import NextAuth from 'next-auth/next';
import { authConfig } from 'configs/auth';

const handler = NextAuth(authConfig);

// DO NOT EXPORT const authOptions it will cause a build error
// export const authOptions: NextAuthOptions = authConfig;
export { handler as GET, handler as POST };
