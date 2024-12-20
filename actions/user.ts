'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { Role } from '@prisma/client';

export const getUserInformations = async () => {
  const session = await auth();
  const user = prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? '',
    },
  });
  return user;
};

export const getUserList = async () => {
  const users = prisma.user.findMany();
  return users;
};

export const getRole = async () => {
  const user = await getUserInformations();
  return user?.role;
};

export const changeRole = async (email: string, role: Role) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      role,
    },
  });
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: Role
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà.');
  }
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
      role,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
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
