import { getUserInformations } from '@/actions/user';

const Profile = async () => {
  const user = await getUserInformations();
  return (
    <div>
      <h1 className='text-2xl mb-4'>Profil</h1>

      <p>Welcome {user?.name}</p>
      <p>Your email is : {user?.email} </p>
      <p>Your role is : {user?.role}</p>
    </div>
  );
};

export default Profile;
