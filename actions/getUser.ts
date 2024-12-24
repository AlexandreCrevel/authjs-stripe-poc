'use server';
import { prisma } from '@/lib/prisma';

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserList = async () => {
  const users = prisma.user.findMany();
  return users;
};

const getUserSubscriptionWithEmail = async (
  email: string | null | undefined
) => {
  if (!email) return null;
  const subscription = prisma.subscription.findFirst({
    where: {
      user: {
        email,
      },
    },
    include: {
      user: true,
    },
  });
  return subscription;
};

export {
  getUserByEmail,
  getUserById,
  getUserList,
  getUserSubscriptionWithEmail,
};
