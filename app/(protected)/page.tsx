import { getUserSubscriptionWithEmail } from '@/actions/getUser';
import { getUserInformations } from '@/actions/user';
import { auth } from '@/auth';
import CancelSubscriptionButton from '@/components/CancelSubscriptionButton/CancelSubscriptionButton';
import PremiumButton from '@/components/PremiumButton/PremiumButton';

export default async function Home() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await getUserInformations();
  const subscription = await getUserSubscriptionWithEmail(user?.email);

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
          <CancelSubscriptionButton />
          <p>Start date : {subscription?.startDate?.toLocaleString()}</p>
          <p>
            Current period end :{' '}
            {subscription?.currentPeriodEnd?.toLocaleString()}
          </p>
          <p>
            Cancel at period end :{' '}
            {subscription?.cancelAtPeriodEnd ? 'True' : 'False'}
          </p>
        </>
      ) : (
        <p>Aucun abonnement</p>
      )}
    </div>
  );
}
