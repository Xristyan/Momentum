'use client';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export const NavGroup = ({
  title,
  routes,
}: {
  title: string;
  routes: { url: string; title: string; icon: React.ReactNode }[];
}) => {
  const pathname = usePathname();

  console.log('routes', routes);
  console.log('pathname', pathname);
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium tracking-wider text-gray-500">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {routes.map(({ url, title, icon }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild>
                <Link
                  href={url}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium tracking-wider transition-colors hover:bg-[#282D45] hover:text-white',
                    pathname === url && 'bg-[#282D45] text-white',
                  )}
                >
                  {icon}
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
