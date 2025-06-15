'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useOrganization } from '@/providers/organizationProvider';
import Image from 'next/image';
import { InviteUserDialog } from '@/components/InviteUserDialog';
import { UserData } from '@/types/user';

export default function UsersPage() {
  const { organization } = useOrganization();

  if (!organization) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-2xl font-bold text-transparent">
            Organization not found
          </h2>
          <p className="mt-2 text-gray-400">
            Please check your organization settings
          </p>
        </div>
      </div>
    );
  }

  const users = (organization.Users || []) as unknown as UserData['data'][];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
            Team Members
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Manage your organization members and their permissions
          </p>
        </div>
        <InviteUserDialog organizationId={organization.id.toString()} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 transition-all duration-300 hover:border-[#32CAFD] hover:bg-[#1A1F3A]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">
              Total Members
            </h3>
            <div className="h-3 w-3 rounded-full bg-[#32CAFD]"></div>
          </div>
          <p className="mt-2 text-3xl font-bold text-[#32CAFD]">
            {users.length}
          </p>
          <p className="text-sm text-gray-400">Active team members</p>
        </div>

        <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 transition-all duration-300 hover:border-[#7214FF] hover:bg-[#1A1F3A]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">
              Verified Users
            </h3>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-500">
            {users.filter((user) => user.isVerified).length}
          </p>
          <p className="text-sm text-gray-400">Email verified</p>
        </div>

        <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 transition-all duration-300 hover:border-[#7214FF] hover:bg-[#1A1F3A]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">Admins</h3>
            <div className="h-3 w-3 rounded-full bg-[#7214FF]"></div>
          </div>
          <p className="mt-2 text-3xl font-bold text-[#7214FF]">
            {users.filter((user) => user.Membership?.role === 'admin').length}
          </p>
          <p className="text-sm text-gray-400">Administrator roles</p>
        </div>
      </div>

      {/* Members Table */}
      <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#7214FF]/50">
        <CardHeader className="border-b border-[#282D45] pb-4">
          <CardTitle className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-xl font-semibold text-transparent">
            Members of {organization.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1F3A]">
                  <div className="h-8 w-8 rounded-full bg-[#282D45]"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-300">
                  No members found
                </h3>
                <p className="text-gray-500">
                  Invite team members to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#1A1F3A]/50">
                  <tr className="border-b border-[#282D45]">
                    <th className="w-16 px-6 py-4 text-left"></th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      XP
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={cn(
                        'border-b border-[#282D45] transition-all duration-200 hover:bg-[#1A1F3A]/30',
                        index % 2 === 0 ? 'bg-transparent' : 'bg-[#1A1F3A]/20',
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7214FF] to-[#32CAFD] text-white">
                          {user?.picture ? (
                            <Image
                              src={user.picture}
                              alt={user.name || user.email}
                              className="h-full w-full object-cover"
                              width={48}
                              height={48}
                            />
                          ) : (
                            <span className="text-sm font-semibold">
                              {user.name
                                ? user.name.substring(0, 2).toUpperCase()
                                : user.email.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-200">
                        {user.name || '—'}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-medium',
                            user.Membership?.role === 'admin'
                              ? 'border border-[#7214FF]/30 bg-[#7214FF]/20 text-[#7214FF]'
                              : 'border border-[#282D45] bg-[#282D45] text-gray-300',
                          )}
                        >
                          {user.Membership?.role || 'member'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#32CAFD]">
                          {user.Membership?.xp || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {formatDate(user?.createdAt || '')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-medium',
                            user.isVerified
                              ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                              : 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
                          )}
                        >
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function for formatting dates
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return '—';
  }
}
