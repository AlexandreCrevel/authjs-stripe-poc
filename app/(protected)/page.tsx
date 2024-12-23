import { getSubscriptionByEmail } from '@/actions/stripe';
import { getUserInformations } from '@/actions/user';
import { auth } from '@/auth';
import PremiumButton from '@/components/PremiumButton/PremiumButton';

export default async function Home() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await getUserInformations();
  const subscription = await getSubscriptionByEmail(user?.email);
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {user?.name}</p>
      <p>Your email is : {user?.email} </p>
      <p>Your role is : {user?.role}</p>
      {subscription?.status !== 'active' && (
        <>
          <p>Want to be a premium user?</p>
          <PremiumButton />
        </>
      )}
      {subscription?.status === 'active' ? (
        <>
          <p>Subscription ID : {subscription?.stripeSubscriptionId}</p>
          <p>Status : {subscription?.status}</p>
        </>
      ) : (
        <p>Aucun abonnement</p>
      )}
    </div>
  );
}
