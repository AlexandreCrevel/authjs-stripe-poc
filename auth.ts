import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { prisma } from './prisma/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  ...authConfig,
});
