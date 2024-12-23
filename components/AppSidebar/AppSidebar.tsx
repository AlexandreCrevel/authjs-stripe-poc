import { Home, Inbox, Star } from 'lucide-react';

import { getUserRole } from '@/actions/user';
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import DisconnectButton from './DisconnectButton';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Premium',
    url: '/premium',
    icon: Star,
    hide: false,
  },
  {
    title: 'Admin',
    url: '/admin',
    icon: Inbox,
    access: ['ADMIN'],
    hide: true,
  },
];

const AppSidebar = async () => {
  const session = await auth();
  const role = await getUserRole();
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
                <SidebarMenuItem
                  key={item.title}
                  hidden={item.hide && role !== 'ADMIN'}
                >
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
