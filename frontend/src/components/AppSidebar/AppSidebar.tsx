import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { SidebarContentNav } from './partials/SidebarContent/SidebarContentNav';
import { Organization } from '@/types/organizations';

export function AppSidebar({
  organization,
}: {
  organization: Organization | null | undefined;
}) {
  return (
    <Sidebar className="border-[#282D45] bg-gradient-to-b from-[#0E1330] to-[#1A1F3A] backdrop-blur-sm">
      <SidebarHeader className="relative flex flex-col gap-3 border-b border-[#282D45] bg-[#0E1330]/80 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#7214FF] to-[#32CAFD]">
            <span className="text-lg font-bold text-white">
              {organization?.name?.charAt(0).toUpperCase() || 'M'}
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-lg font-semibold tracking-wider text-transparent">
              {organization?.name || 'Organization'}
            </h4>
            <p className="text-sm leading-tight text-gray-400">
              {organization?.description || 'Dashboard'}
            </p>
          </div>
        </div>

        {/* Background blur effect */}
        <div className="absolute -right-8 top-1/2 z-[-1] h-[80px] w-[100px] bg-[#7214FF] opacity-10 blur-[60px]"></div>
      </SidebarHeader>
      <div className="flex-1 bg-gradient-to-b from-[#0E1330] to-[#1A1F3A]">
        <SidebarContentNav organization={organization} />
      </div>
    </Sidebar>
  );
}
