import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { SidebarContentNav } from './partials/SidebarContent/SidebarContentNav';
import { Organization } from '@/types/organizations';

export function AppSidebar({
  organization,
}: {
  organization: Organization | null | undefined;
}) {
  return (
    <Sidebar className="dark:border-[#282D45] dark:bg-background">
      <SidebarHeader className="flex items-center gap-2 p-4 dark:bg-background">
        <h4 className="text-lg font-semibold tracking-wider">
          {organization?.name}
        </h4>
        <p className="text-sm text-gray-500">{organization?.description}</p>
      </SidebarHeader>
      <SidebarContentNav organization={organization} />
    </Sidebar>
  );
}
