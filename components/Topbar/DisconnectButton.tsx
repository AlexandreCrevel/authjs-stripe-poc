'use client';
import { signOut } from 'next-auth/react';

const DisconnectButton = () => {
  return <div onClick={() => signOut()}>Disconnect</div>;
};

export default DisconnectButton;
