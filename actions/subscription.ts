'use server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

const createSubscription = async ({
  userId,
  stripeSubscriptionId,
}: {
  userId: string;
  stripeSubscriptionId: string;
}) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    );

    await prisma.subscription.create({
      data: {
        userId,
        stripeSubscriptionId,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { role: 'PREMIUM_USER' },
    });
  } catch (error) {
    console.error('Error type : ', error);
  }
};

const updateSubscriptionStatus = async ({
  stripeSubscriptionId,
  status,
  currentPeriodEnd,
  cancelAtPeriodEnd,
  startDate,
}: {
  stripeSubscriptionId: string;
  status: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  startDate: Date;
}) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId },
    });

    if (!subscription) {
      console.error('Subscription not found in database.');
      return;
    }

    await prisma.subscription.update({
      where: { stripeSubscriptionId },
      data: {
        status,
        currentPeriodEnd,
        cancelAtPeriodEnd,
        startDate,
      },
    });

    if (status !== 'active') {
      await prisma.user.update({
        where: { id: subscription.userId },
        data: { role: 'STANDARD_USER' },
      });
    }
  } catch (error) {
    console.error('Error updating subscription status:', error);
  }
};

const cancelSubscription = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return { success: false, message: 'Utilisateur non trouvé.' };
  }

  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
  });

  if (!subscription || !subscription.stripeSubscriptionId) {
    return { success: false, message: 'Abonnement non trouvé.' };
  }

  try {
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscription.stripeSubscriptionId
    );
    await prisma.subscription.delete({
      where: { id: subscription.id },
    });

    if (canceledSubscription.status === 'canceled') {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'STANDARD_USER' },
      });
    }
    return { success: true };
  } catch (error: unknown) {
    console.error("Erreur lors de l'annulation de l'abonnement:", error);
    return {
      success: false,
      message: "Échec de l'annulation de l'abonnement.",
    };
  }
};

export { cancelSubscription, createSubscription, updateSubscriptionStatus };
