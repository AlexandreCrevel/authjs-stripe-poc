'use client';

import { createUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast'; // Assurez-vous que ce hook est correctement implémenté
import { RegisterSchema, RegisterSchemaType } from '@/schemas/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddUserModal = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: RegisterSchemaType) => {
    setIsSubmitting(true);
    try {
      createUser(data.email, data.password, data.name, data.role);

      toast({
        title: 'Succès',
        description: 'Utilisateur créé avec succès.',
        variant: 'default',
      });
      router.refresh();
      reset();
      setIsSubmitting(false);
      setIsOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        console.error(error);
        toast({
          title: 'Erreur',
          description: "Erreur inconnue lors de la création de l'utilisateur.",
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Add User</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create a New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name Field */}
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
              placeholder='Enter user name'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
              placeholder='Enter user email'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
              placeholder='Enter password'
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <Label htmlFor='role'>Role</Label>
            <Select
              onValueChange={(value) =>
                setValue('role', value as RegisterSchemaType['role'])
              }
            >
              <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ADMIN'>Admin</SelectItem>
                <SelectItem value='PREMIUM_USER'>Premium User</SelectItem>
                <SelectItem value='STANDARD_USER'>Standard User</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add User'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
