import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();

  if (!user) {
    return redirect('/login');
  }

  return children;
};

export default layout;
