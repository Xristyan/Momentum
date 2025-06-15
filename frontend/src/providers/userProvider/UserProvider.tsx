'use client';
import { fetchUserFromSession } from '@/actions/authActions';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import type { FC } from 'react';
import type { PropsWithChildren } from '@/types/common';

interface UserData {
  data: {
    id: number;
    name?: string;
    email: string;
    picture?: string;
    Organizations?: Array<{
      id: number;
      name: string;
      description?: string;
      technologies?: string[];
      Membership: {
        id: number;
        role: string;
        xp: number;
        UserId: number;
        creator: boolean;
        OrganizationId: number;
      };
    }>;
    [key: string]: unknown;
  };
}

const UserContext = createContext<unknown | null>(null);

export const UserProvider: FC<
  PropsWithChildren<{ initialUser: UserData | null | undefined }>
> = ({ children, initialUser }) => {
  const { data, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    initialData: initialUser,
    queryFn: fetchUserFromSession,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const isLoading = isUserLoading;

  return (
    <UserContext.Provider value={{ user: data, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context as {
    user: UserData;
    isLoading: boolean;
  };
};
