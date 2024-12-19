'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const DisconnectButton = () => {
  return <Button onClick={() => signOut()}>Disconnect</Button>;
};

export default DisconnectButton;
