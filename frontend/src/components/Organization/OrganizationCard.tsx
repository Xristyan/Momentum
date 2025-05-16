'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, ChevronRight, Users, Trash2 } from 'lucide-react';
import { FaJira, FaGithub, FaSlack, FaMicrosoft } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useDeleteOrganization } from '@/hooks/organizationHooks/organizationHooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

type TechIconProps = {
  tech: string;
  className?: string;
};

const TechIcon = ({ tech, className = 'h-4 w-4' }: TechIconProps) => {
  switch (tech) {
    case 'jira':
      return <FaJira className={className} />;
    case 'teams':
      return <FaMicrosoft className={className} />;
    case 'github':
      return <FaGithub className={className} />;
    case 'slack':
      return <FaSlack className={className} />;
    default:
      return null;
  }
};

type OrganizationCardProps = {
  organization: {
    id: number;
    name: string;
    description?: string;
    role?: string;
    memberCount?: number;
    technologies?: string[];
  };
};

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const { deleteOrganization, isPending } = useDeleteOrganization();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteOrganization(organization.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:bg-[#111530] dark:hover:shadow-indigo-900/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Building2 className="h-5 w-5 text-indigo-500" />
            {organization.name}
          </CardTitle>
          {organization.role && (
            <div className="flex items-center justify-center rounded-full border border-indigo-500 bg-indigo-100/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-500 dark:bg-indigo-900/20">
              {organization.role}
            </div>
          )}
        </div>
        {organization.description && (
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {organization.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-2">
        {organization.technologies && organization.technologies.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {organization.technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
              >
                <TechIcon tech={tech} className="h-3 w-3" />
                <span>{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
              </div>
            ))}
          </div>
        )}

        {organization.memberCount && (
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4" />
            <span>{organization.memberCount} members</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        {organization.role === 'admin' && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="px-2">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the &quot;{organization.name}
                  &quot; organization and all of its data. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isPending ? 'Deleting...' : 'Delete Organization'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Link
          target="_blank"
          className="ml-auto flex items-center gap-1 rounded-sm px-2 py-1 text-indigo-600 hover:bg-accent hover:text-accent-foreground hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          href={`/dashboard/${organization.id}`}
        >
          View
          <ChevronRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};
