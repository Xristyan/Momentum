'use client';
import { SidebarContent } from '@/components/ui/sidebar';
import { Icon } from '@/components/Icon/Icon';
import { Calendar, Home, Search, Settings, Users } from 'lucide-react';
import { Organization } from '@/types/organizations';
import { NavGroup } from './NavGroup';
import { useParams } from 'next/navigation';
const items = [
  {
    title: 'Home',
    url: '',
    icon: <Home />,
  },
  {
    title: 'Users',
    url: '/users',
    icon: <Users />,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: <Calendar />,
  },
  {
    title: 'Search',
    url: '/search',
    icon: <Search />,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: <Settings />,
  },
];

const getDashboardRouts = (id: number, locale: string) => {
  return items.map((item) => ({
    ...item,
    url: `/${locale}/dashboard/${id}${item.url}`,
  }));
};

const getDynamicRoutes = (
  id: number,
  locale: string,
  technologies: string[],
) => {
  return technologies.map((technology) => ({
    title: technology,
    url: `/${locale}/dashboard/${id}/technologies/${formatTechnology(
      technology,
    )}`,
    icon: (
      <Icon
        iconName={formatTechnology(technology)}
        alt={technology}
        width={20}
        height={20}
      />
    ),
  }));
};

const formatTechnology = (technology: string) => {
  return technology.replace(' ', '-').toLowerCase();
};

export function SidebarContentNav({
  organization,
}: {
  organization: Organization | null | undefined;
}) {
  const { locale } = useParams();
  const routes = getDashboardRouts(organization?.id ?? 0, locale as string);

  const dynamicRoutes = getDynamicRoutes(
    organization?.id ?? 0,
    locale as string,
    organization?.technologies ?? [],
  );

  return (
    <SidebarContent className="pt-2">
      <NavGroup title="Dashboard" routes={routes} />
      <NavGroup title="Technologies" routes={dynamicRoutes} />
    </SidebarContent>
  );
}
