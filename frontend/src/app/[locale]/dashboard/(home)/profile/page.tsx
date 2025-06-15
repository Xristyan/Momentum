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
import { UserProfileDialog } from '@/components/UserProfileDialog';
import Avatar from 'boring-avatars';
import Image from 'next/image';

export default function Profile() {
  const { user } = useUser();
  const userData = user?.data ?? null;

  return (
    <div className="relative min-h-screen">
      <div className="container relative mx-auto max-w-7xl p-6">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <div>
            <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
              Your Profile
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Manage your account and organizations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-[#282D45] bg-[#0E1330]/80 px-4 py-2 backdrop-blur-sm">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <>
                  {userData?.picture ? (
                    <Image
                      src={userData.picture}
                      alt={userData.name || 'Profile picture'}
                      fill
                      sizes="40px"
                      className="object-cover"
                      priority
                    />
                  ) : userData?.email ? (
                    <Avatar
                      size={40}
                      name={userData.email}
                      variant="beam"
                      colors={[
                        '#7214FF',
                        '#32CAFD',
                        '#F0AB3D',
                        '#C271B4',
                        '#C20D90',
                      ]}
                    />
                  ) : null}
                </>
              </div>
              {userData?.name && (
                <span className="text-lg text-gray-200">
                  Welcome, {userData.name}
                </span>
              )}
            </div>
            <UserProfileDialog />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#7214FF]/50">
              <CardHeader className="flex flex-col items-center justify-between gap-4 border-b border-[#282D45] pb-4 md:flex-row">
                <div>
                  <CardTitle className="text-2xl">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-[#32CAFD]" />
                      <span className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
                        Your Organizations
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage and view your organizations
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <CreateOrganizationDialog />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {!userData?.Organizations ||
                userData.Organizations.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[#282D45] bg-[#1A1F3A]/30 p-8 text-center">
                    <Building2 className="h-10 w-10 text-gray-500" />
                    <div>
                      <p className="text-xl font-medium text-gray-300">
                        No organizations yet
                      </p>
                      <p className="text-sm text-gray-400">
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
                          creator: org.Membership.creator,
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
            <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#32CAFD]/50">
              <CardHeader className="border-b border-[#282D45] pb-4">
                <CardTitle className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-xl text-transparent">
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-400">
                  This section will show your activity stats, XP, and other
                  metrics across your organizations.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border border-[#282D45] bg-[#1A1F3A] p-4 transition-all duration-300 hover:border-[#32CAFD]/50">
                    <h3 className="font-medium text-gray-300">Total XP</h3>
                    <p className="text-2xl font-bold text-[#32CAFD]">
                      {userData?.Organizations?.reduce(
                        (total, org) => total + (org.Membership.xp || 0),
                        0,
                      ) || 0}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#282D45] bg-[#1A1F3A] p-4 transition-all duration-300 hover:border-[#7214FF]/50">
                    <h3 className="font-medium text-gray-300">Organizations</h3>
                    <p className="text-2xl font-bold text-[#7214FF]">
                      {userData?.Organizations?.length || 0}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#282D45] bg-[#1A1F3A] p-4 transition-all duration-300 hover:border-green-500/50">
                    <h3 className="font-medium text-gray-300">Admin Roles</h3>
                    <p className="text-2xl font-bold text-green-400">
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

        {/* Background blur effects */}
        <div className="absolute -left-48 top-6 -z-[100] h-[150px] w-[150px] bg-[#7214FF] opacity-20 blur-[250px]"></div>
        <div className="absolute -right-48 top-6 -z-[100] h-[150px] w-[150px] bg-[#32CAFD] opacity-20 blur-[250px]"></div>
      </div>
    </div>
  );
}
