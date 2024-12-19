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
