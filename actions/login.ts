'use server';
import { signIn } from '@/auth';
import { prisma } from '@/prisma/prisma';

const loginWithGithub = async () => {
  await signIn('github');
};

const loginUser = async (credentials: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });
  if (!user) {
    throw new Error('Utilisateur introuvable.');
  }
  if (user.password !== credentials.password) {
    throw new Error('Mot de passe incorrect.');
  }
  return user;
};

export { loginUser, loginWithGithub };
