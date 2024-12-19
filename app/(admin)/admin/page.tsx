import { getUserList } from '@/actions/user';
import AdminTable from '@/components/AdminTable/admin-table';
import { adminTableColumns } from '@/components/AdminTable/columns';

const Admin = async () => {
  const users = await getUserList();
  console.log(users);
  return (
    <div>
      Admin Page
      <AdminTable columns={adminTableColumns} data={users} />
    </div>
  );
};

export default Admin;
