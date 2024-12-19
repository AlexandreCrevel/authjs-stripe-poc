import { getRole } from '@/actions/user';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const role = await getRole();

  if (role !== 'ADMIN') {
    return <div>Unauthorized</div>;
  }
  return <>{children}</>;
};

export default layout;
