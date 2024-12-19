import { auth } from '@/auth';
import DisconnectButton from '@/component/disconnect-button';

export default async function Home() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <div>
      <>{JSON.stringify(session)}</>
      <DisconnectButton />
    </div>
  );
}
