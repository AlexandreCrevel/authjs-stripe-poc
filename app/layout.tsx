import { auth } from '@/auth';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin Panel | Next.js + TypeScript + Tailwind CSS',
  description: 'Admin Panel built with Next.js, TypeScript, and Tailwind CSS',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  return (
    <html lang='en'>
      <body>
        <SessionProvider session={user}>
          <SidebarProvider>
            <Toaster />
            {user && <AppSidebar />}
            <main className='px-4 w-screen h-screen overflow-y-auto'>
              {user && <SidebarTrigger />}
              {children}
            </main>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
