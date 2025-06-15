import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';

const pricing = [
  {
    title: 'Starter Plan',
    href: '/pricing#starter',
    description:
      'Perfect for small teams just getting started with CRM management.',
  },
  {
    title: 'Professional',
    href: '/pricing#professional',
    description:
      'Advanced features for growing engineering teams with complex workflows.',
  },
  {
    title: 'Enterprise',
    href: '/pricing#enterprise',
    description:
      'Full-scale solution with custom integrations and dedicated support.',
  },
  {
    title: 'Custom Solutions',
    href: '/pricing#custom',
    description:
      'Tailored CRM solutions designed specifically for your organization needs.',
  },
];

export const NavMenu = () => {
  return (
    <NavigationMenu className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[16px] tracking-wider">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <Link
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/features"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">
                    CRM Features
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Powerful tools designed specifically for engineering teams
                    to manage leads and streamline workflows.
                  </p>
                </Link>
              </li>
              <ListItem
                href="/features/lead-management"
                title="Lead Management"
              >
                Complete lead tracking and pipeline management system.
              </ListItem>
              <ListItem href="/features/analytics" title="Team Analytics">
                Comprehensive analytics and performance insights.
              </ListItem>
              <ListItem href="/features/automation" title="Task Automation">
                Automated workflows to boost team productivity.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[16px] tracking-wider">
            Pricing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {pricing.map((plan) => (
                <ListItem key={plan.title} title={plan.title} href={plan.href}>
                  {plan.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/resources" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(
                navigationMenuTriggerStyle(),
                'text-[16px] tracking-wider',
              )}
            >
              Resources
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  [key: string]: unknown;
}

const ListItem: React.FC<ListItemProps> = ({
  className,
  title,
  children,
  href,
  ...props
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          href={href}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
