'use client';
import { loginWithGithub } from '@/actions/login';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// export const metadata: Metadata = {
//   title: 'Login',
//   description: 'Login page',
// };
const LoginPage = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
  }
  return (
    <div className='flex items-center justify-center h-screen flex-col gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='******' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
      {/* Login with Github */}
      <form action={loginWithGithub}>
        <Button
          type='submit'
          variant='outline'
          className='w-full flex items-center justify-center'
        >
          <Github className='mr-2 h-5 w-5' />
          Login with GitHub
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
