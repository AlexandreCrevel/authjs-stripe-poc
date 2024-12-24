'use server';
import { getUserByEmail } from '@/actions/getUser';
import {
  createSubscription,
  updateSubscriptionStatus,
} from '@/actions/subscription';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

export const POST = async (req: Request) => {
  const sig = req.headers.get('stripe-signature');
  const textBody = await req.text();

  let event: Stripe.Event;
  try {
    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Missing webhook signature or secret');
    }

    event = stripe.webhooks.constructEvent(
      textBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const subscriptionId =
        typeof session.subscription === 'string'
          ? session.subscription
          : undefined;

      if (email && subscriptionId) {
        const user = await getUserByEmail(email);
        if (!user) break;

        await createSubscription({
          userId: user.id,
          stripeSubscriptionId: subscriptionId,
        });
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;

      await updateSubscriptionStatus({
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        startDate: new Date(subscription.start_date * 1000),
      });
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscriptionStatus({
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        startDate: new Date(subscription.start_date * 1000),
      });
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
};
