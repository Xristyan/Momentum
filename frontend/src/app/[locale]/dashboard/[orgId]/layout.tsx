import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { AppSidebar } from '@/components/AppSidebar';
import { cookies } from 'next/headers';
import { OrganizationProvider } from '@/providers/organizationProvider';
import { getOrganization } from '@/actions/organizationActions';
import { UserProfileCard } from '@/components/UserProfileCard';

export const metadata: Metadata = {
  title: 'Dashboard - Momentum CRM',
  description: 'Advanced CRM dashboard for engineering teams',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; orgId: number }>;
}>) {
  const { orgId } = await params;

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const organization = await getOrganization(orgId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1E] via-[#0E1330] to-[#1A1F3A]">
      <OrganizationProvider initialOrganization={organization}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar organization={organization} />
          <main className="w-full">
            <header className="relative flex h-[90px] w-full items-center justify-between border-b border-[#282D45] bg-[#0E1330]/80 px-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-gray-300 transition-colors hover:text-white" />
                <div className="flex flex-col">
                  <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-2xl font-bold text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-sm text-gray-400">
                    {organization?.name || 'Organization Dashboard'}
                  </p>
                </div>
              </div>
              <div className="ml-8 max-w-md flex-1">
                <UserProfileCard organizationId={orgId} />
              </div>
            </header>

            <div className="relative p-6">{children}</div>
          </main>
        </SidebarProvider>
      </OrganizationProvider>
    </div>
  );
}
