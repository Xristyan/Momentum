'use client';
import { fetchUserFromSession } from '@/actions/authActions';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import type { FC } from 'react';
type PropsWithChildren<T> = T & { children?: ReactNode };

interface UserData {
  data: {
    id: number;
    name?: string;
    email: string;
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
