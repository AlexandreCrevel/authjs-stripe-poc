'use server';
import { signIn } from '@/auth';

const loginWithGithub = async () => {
  await signIn('github');
};

export { loginWithGithub };
