import { getUserList } from '@/actions/getUser';
import AddUserModal from '@/components/AddUserModal/AddUserModal';
import AdminTable from '@/components/AdminTable/AdminTable';
import { adminTableColumns } from '@/components/AdminTable/AdminTableColumns';

const Admin = async () => {
  const users = await getUserList();
  return (
    <div className='p-4 pt-8'>
      <div className='flex justify-between items-center flex-row'>
        <h1 className='font-bold text-3xl py-4'>Admin Page</h1>
        <AddUserModal />
      </div>
      <AdminTable columns={adminTableColumns} data={users} />
    </div>
  );
};

export default Admin;
