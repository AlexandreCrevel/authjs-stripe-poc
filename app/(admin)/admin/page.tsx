import { getUserList } from '@/actions/user';
import AdminTable from '@/components/AdminTable/admin-table';
import { adminTableColumns } from '@/components/AdminTable/columns';

const Admin = async () => {
  const users = await getUserList();
  return (
    <div className='p-4 pt-8'>
      <h1 className='font-bold text-3xl py-4'>Admin Page</h1>
      <AdminTable columns={adminTableColumns} data={users} />
    </div>
  );
};

export default Admin;
