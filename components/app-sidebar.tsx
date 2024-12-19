import { Home, Inbox } from 'lucide-react';

import { auth } from '@/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import DisconnectButton from './disconnect-button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Admin',
    url: '/admin',
    icon: Inbox,
  },
];

const AppSidebar = async () => {
  const session = await auth();
  const image = session?.user?.image;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center justify-between'>
            Admin POC
            <Avatar>
              <AvatarImage src={image || ''} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DisconnectButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
