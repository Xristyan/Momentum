'use client';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import type { FC } from 'react';
import type { PropsWithChildren } from '@/types/common';
import type { Organization } from '@/types/organizations';
import { getOrganization } from '@/actions/organizationActions';
const organizationContext = createContext<unknown>({});

const OrganizationProvider: FC<
  PropsWithChildren<{ initialOrganization: Organization | null | undefined }>
> = ({ children, initialOrganization }) => {
  const [orgId] = useState<number | null>(initialOrganization?.id || null);
  console.log('initialOrganization', initialOrganization);
  const { data: organization, isLoading } = useQuery({
    queryKey: ['organization'],
    queryFn: () => getOrganization(orgId),
    initialData: initialOrganization,
  });

  return (
    <organizationContext.Provider value={{ organization, isLoading }}>
      {children}
    </organizationContext.Provider>
  );
};

const useOrganization = () => {
  const context = useContext(organizationContext);

  if (!context) {
    throw new Error(
      'useOrganization must be used within a OrganizationProvider',
    );
  }

  return context as {
    organization: Organization | null | undefined;
    isLoading: boolean;
  };
};

export { OrganizationProvider, useOrganization };
