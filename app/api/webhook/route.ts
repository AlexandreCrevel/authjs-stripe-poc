'use server';
import { getUserByEmail } from '@/actions/getUser';
import { createSubscription, updateSubscriptionStatus } from '@/actions/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-12-18.acacia',
});

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

  console.log('Event received:', event.type);
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

        await createSubscription(user.id, subscriptionId);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(
        `Subscription updated: ${subscription.id} => ${subscription.status}`
      );
      await updateSubscriptionStatus(subscription.id, subscription.status);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription deleted: ${subscription.id}`);
      await updateSubscriptionStatus(subscription.id, 'canceled');
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
};
