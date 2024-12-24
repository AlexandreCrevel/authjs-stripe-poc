// app/(protected)/profile/page.tsx
import { getUserInformations } from '@/actions/user';
import ProfileForm from '@/components/ProfileForm/ProfileForm';

const ProfilePage = async () => {
  const user = await getUserInformations();

  if (!user) {
    // Handle the case where user data is not available
    return (
      <div className='flex items-center justify-center h-full'>
        <p>Loading...</p>
      </div>
    );
  }

  return <ProfileForm user={user} />;
};

export default ProfilePage;
