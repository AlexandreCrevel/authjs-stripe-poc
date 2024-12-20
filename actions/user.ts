'use server';
import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const getUserInformations = async () => {
  const session = await auth();
  const user = prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? '',
    },
  });
  return user;
};

const getUserList = async () => {
  const users = prisma.user.findMany();
  return users;
};

const getRole = async () => {
  const user = await getUserInformations();
  return user?.role;
};

const changeRole = async (email: string, role: Role) => {
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

const createUser = async (
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
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  });
  return user;
};

const deleteUser = async (email: string) => {
  const user = await prisma.user.delete({
    where: {
      email,
    },
  });
  return user;
};

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
export {
  changeRole,
  createUser,
  deleteUser,
  getRole,
  getUserByEmail,
  getUserById,
  getUserInformations,
  getUserList,
};
