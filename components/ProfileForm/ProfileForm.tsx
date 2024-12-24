'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserSchemaType } from '@/schemas/User';
import { Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';

const ProfileForm = ({ user }: { user: UserSchemaType }) => {
  // Initialize state for edit modes
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Initialize state for form values
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className='w-full mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Profil</h1>

      {/* Name Field */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700'>Nom</label>
          {!isEditingName ? (
            <p className='mt-1 text-lg text-gray-900'>{name}</p>
          ) : (
            <Input
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              className='mt-1'
            />
          )}
        </div>
        <div className='ml-4'>
          {!isEditingName ? (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsEditingName(true)}
              aria-label='Modifier le nom'
            >
              <Pencil className='w-4 h-4' />
            </Button>
          ) : (
            <div className='flex space-x-2'>
              <Button
                variant='default' // Changed from "success" to "default"
                size='icon'
                onClick={() => setIsEditingName(false)}
                aria-label='Enregistrer le nom'
              >
                <Check className='w-4 h-4' />
              </Button>
              <Button
                variant='destructive'
                size='icon'
                onClick={() => {
                  setName(user.name);
                  setIsEditingName(false);
                }}
                aria-label='Annuler la modification du nom'
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          {!isEditingEmail ? (
            <p className='mt-1 text-lg text-gray-900'>{email}</p>
          ) : (
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1'
            />
          )}
        </div>
        <div className='ml-4'>
          {!isEditingEmail ? (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsEditingEmail(true)}
              aria-label="Modifier l'email"
            >
              <Pencil className='w-4 h-4' />
            </Button>
          ) : (
            <div className='flex space-x-2'>
              <Button
                variant='default' // Changed from "success" to "default"
                size='icon'
                onClick={() => setIsEditingEmail(false)}
                aria-label="Enregistrer l'email"
              >
                <Check className='w-4 h-4' />
              </Button>
              <Button
                variant='destructive'
                size='icon'
                onClick={() => {
                  setEmail(user.email);
                  setIsEditingEmail(false);
                }}
                aria-label="Annuler la modification de l'email"
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
