import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { getUserByEmail } from './actions/getUser';
import { LoginSchema } from './schemas';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFiels = LoginSchema.safeParse(credentials);
        if (!validateFiels.success) {
          return null;
        }

        const { email, password } = validateFiels.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GitHub,
  ],
} satisfies NextAuthConfig;
