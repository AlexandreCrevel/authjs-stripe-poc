'use client';

import { Role } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import DeleteUserButton from './DeleteUserButton';
import RoleSelect from './RoleSelect';

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
      return <RoleSelect email={email} currentRole={currentRole} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Registration Date',
    cell: (cell) =>
      new Date(cell.getValue() as string | number | Date).toLocaleString(),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const user = row.original;
      return <DeleteUserButton email={user.email} name={user.name} />;
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
];
