'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { CreateOrganizationDialog } from '@/components/Organization/CreateOrganizationDialog';
import { OrganizationCard } from '@/components/Organization/OrganizationCard';
import { useUser } from '@/providers/userProvider/UserProvider';

export default function Profile() {
  const { user } = useUser();
  const userData = user?.data ?? null;

  console.log('userData', userData);

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <div className="text-lg">
          {userData?.name && <span>Welcome, {userData.name}</span>}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="dark:bg-[#0E1330]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-indigo-500" />
                    Your Organizations
                  </div>
                </CardTitle>
                <CardDescription>
                  Manage and view your organizations
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <CreateOrganizationDialog />
              </div>
            </CardHeader>
            <CardContent>
              {!userData?.Organizations ||
              userData.Organizations.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                  <Building2 className="h-10 w-10 text-gray-400" />
                  <div>
                    <p className="text-xl font-medium">No organizations yet</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Create your first organization to get started
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {userData.Organizations.map((org) => (
                    <OrganizationCard
                      key={org.id}
                      organization={{
                        id: org.id,
                        name: org.name,
                        description: org.description,
                        role: org.Membership.role,
                        technologies: org.technologies,
                      }}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:col-span-1">
          <Card className="dark:bg-[#0E1330]">
            <CardHeader>
              <CardTitle className="text-xl">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This section will show your activity stats, XP, and other
                metrics across your organizations.
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <h3 className="font-medium">Total XP</h3>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {userData?.Organizations?.reduce(
                      (total, org) => total + (org.Membership.xp || 0),
                      0,
                    ) || 0}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <h3 className="font-medium">Organizations</h3>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {userData?.Organizations?.length || 0}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <h3 className="font-medium">Admin Roles</h3>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {userData?.Organizations?.filter(
                      (org) => org.Membership.role === 'admin',
                    ).length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
