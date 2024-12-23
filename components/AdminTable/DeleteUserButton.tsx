// src/components/DeleteUserButton.tsx

'use client';

import { deleteUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Trash } from 'lucide-react'; // Utilisez l'icône de votre choix
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteUserButtonProps = {
  email: string;
  name: string | null;
};

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ email, name }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(email);
      toast({
        title: 'Succès',
        description: 'Utilisateur supprimé avec succès.',
        variant: 'default',
      });
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erreur',
          description:
            "Erreur inconnue lors de la suppression de l'utilisateur.",
          variant: 'destructive',
        });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='p-2'>
          <Trash className='h-5 w-5 text-red-500' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer l&apos;utilisateur{' '}
            <strong>{name || email}</strong> ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end space-x-2 mt-4'>
          <Button variant='outline' onClick={() => {}}>
            Annuler
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserButton;
