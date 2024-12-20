// src/components/RoleSelect.tsx

'use client';

import { changeRole } from '@/actions/user';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RoleSelectProps = {
  email: string;
  currentRole: Role;
};

const RoleSelect: React.FC<RoleSelectProps> = ({ email, currentRole }) => {
  const [role, setRole] = useState<Role>(currentRole);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    setRole(newRole); // Mise à jour optimiste
    setIsUpdating(true);
    try {
      await changeRole(email, newRole);
      toast({
        title: 'Succès',
        description: 'Rôle mis à jour avec succès.',
        variant: 'default',
      });
      router.refresh(); // Rafraîchir les données du tableau
    } catch (error: unknown) {
      setRole(currentRole); // Revenir à l'ancien rôle en cas d'erreur
      if (error instanceof Error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erreur',
          description: 'Erreur inconnue lors de la mise à jour du rôle.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      title='role'
      value={role}
      onChange={handleChange}
      disabled={isUpdating}
      className={`border rounded p-1 ${
        isUpdating ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <option value='ADMIN'>Admin</option>
      <option value='STANDARD_USER'>Standard User</option>
      <option value='PREMIUM_USER'>Premium User</option>
    </select>
  );
};

export default RoleSelect;
