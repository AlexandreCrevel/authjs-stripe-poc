'use client';

import { changeRole } from '@/actions/user';
import { Role } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export type User = {
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
};

export const adminTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row, getValue }) => {
      const currentRole = getValue() as Role;
      const email = row.original.email;

      const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value as Role;
        try {
          changeRole(email, newRole);
        } catch (error) {
          console.error(error);
          alert('Erreur lors de la mise à jour du rôle');
        }
      };

      return (
        <select
          title='role'
          value={currentRole}
          onChange={handleChange}
          className='border rounded p-1'
        >
          <option value='ADMIN'>Admin</option>
          <option value='STANDARD_USER'>Standard User</option>
          <option value='PREMIUM_USER'>Premium User</option>
        </select>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Registration Date',
    cell: (cell) =>
      new Date(cell.getValue() as string | number | Date).toLocaleDateString(),
  },
];
