import { getUserInformations } from '@/actions/user';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  if (!session?.user) return null;
  const user = await getUserInformations();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {user?.name}</p>
      <p>Your email is : {user?.email} </p>
      <p>Your role is : {user?.role}</p>
    </div>
  );
}
