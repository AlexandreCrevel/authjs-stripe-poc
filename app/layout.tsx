import { auth } from '@/auth';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import Topbar from '@/components/Topbar/Topbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({ weight: ['400', '500', '700'] });

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
            <main className={`${roboto}w-screen h-screen overflow-y-auto`}>
              {user && <Topbar />}
              <div className='p-4'>{children}</div>
            </main>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
