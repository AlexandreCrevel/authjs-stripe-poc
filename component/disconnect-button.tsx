'use client';
import { signOut } from 'next-auth/react';

const DisconnectButton = () => {
  return <button onClick={() => signOut()}>Disconnect Button</button>;
};

export default DisconnectButton;
