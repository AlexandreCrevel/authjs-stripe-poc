'use server';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

const changeRoleFromSubscriptionId = async (
  subscriptionId: string,
  newRole: Role
) => {
  const user = await prisma.user.findFirst({
    where: {
      Subscription: {
        some: {
          stripeSubscriptionId: subscriptionId,
        },
      },
    },
  });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: newRole },
    });
  }
};

const createSubscription = async (
  userId: string,
  stripeSubscriptionId: string
) => {
  console.log('Creating subscription for user', userId);
  console.log('Subscription ID:', stripeSubscriptionId);
  try {
    console.log('Before creating subscription');

    await prisma.subscription.create({
      data: {
        userId,
        stripeSubscriptionId,
        status: 'active',
      },
    });
    console.log('After creating subscription');

    await prisma.user.update({
      where: { id: userId },
      data: { role: 'PREMIUM_USER' },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
  }
};

const updateSubscriptionStatus = async (
  stripeSubscriptionId: string,
  newStatus: string
) => {
  await prisma.subscription.updateMany({
    where: {
      stripeSubscriptionId,
    },
    data: {
      status: newStatus,
    },
  });
  await prisma.user.updateMany({
    where: {
      Subscription: {
        some: {
          stripeSubscriptionId,
        },
      },
    },
    data: {
      role: newStatus === 'active' ? 'PREMIUM_USER' : 'STANDARD_USER',
    },
  });
};

const getSubscriptionByEmail = async (email: string | null | undefined) => {
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

const isSubscriptionActive = async (email: string) => {
  const subscription = await getSubscriptionByEmail(email);
  return subscription?.status === 'active';
};

export {
  changeRoleFromSubscriptionId,
  createSubscription,
  getSubscriptionByEmail,
  isSubscriptionActive,
  updateSubscriptionStatus,
};
