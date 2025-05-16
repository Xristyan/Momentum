import { getOrganization } from '@/actions/organizationActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { InviteUserDialog } from '@/components/User';

interface User {
  id: number;
  email: string;
  name: string;
  isVerified: boolean;
  picture: string;
  createdAt: string;
  updatedAt: string;
  Membership: {
    id: number;
    role: string;
    xp: number;
    UserId: number;
    OrganizationId: number;
  };
}

interface ExtendedOrganization {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  Users: User[];
}

export default async function UsersPage({
  params,
}: {
  params: { orgId: string };
}) {
  const organizationId = parseInt(params.orgId, 10);
  const organization = (await getOrganization(
    organizationId,
  )) as unknown as ExtendedOrganization;

  if (!organization) {
    return <div className="p-6">Organization not found</div>;
  }

  const users = organization.Users || [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organization Members</h1>
        <InviteUserDialog organizationId={organizationId} />
      </div>

      <Card className="border-[#282D45] dark:bg-[#0E1330]">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">
            Members of {organization.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No users found in this organization
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#282D45]">
                    <th className="w-16 px-4 py-3 text-left"></th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">XP</th>
                    <th className="px-4 py-3 text-left">Joined</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#282D45] hover:bg-[#282D45]/10"
                    >
                      <td className="px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-500 text-white">
                          {user.picture ? (
                            <Image
                              src={user.picture}
                              alt={user.name || user.email}
                              className="h-full w-full object-cover"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <span>
                              {user.name
                                ? user.name.substring(0, 2).toUpperCase()
                                : user.email.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {user.name || '—'}
                      </td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'rounded-full px-2 py-1 text-xs font-medium',
                            user.Membership?.role === 'admin'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
                          )}
                        >
                          {user.Membership?.role || 'member'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user.Membership?.xp || 0}</td>
                      <td className="px-4 py-3">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'rounded-full px-2 py-1 text-xs font-medium',
                            user.isVerified
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
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
