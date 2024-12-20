import { getUserInformations } from '@/actions/user';

const Premium = async () => {
  const user = await getUserInformations();
  if (user?.role !== 'PREMIUM_USER' && user?.role !== 'ADMIN') {
    return <div>Not premium</div>;
  }
  return <div>Premium</div>;
};

export default Premium;
