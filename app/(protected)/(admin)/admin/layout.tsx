import { getUserRole } from '@/actions/user';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const role = await getUserRole();
  const user = await auth();

  if (!user) {
    return redirect('/login');
  }

  if (role !== 'ADMIN') {
    return <div>Unauthorized</div>;
  }
  return children;
};

export default layout;
