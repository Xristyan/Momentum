'use client';
import { getTechnologies } from '@/actions/technologiesActions';
import { useQuery } from '@tanstack/react-query';

export const useTechnologiesQuery = () => {
  return useQuery({
    queryKey: ['technologies'],
    queryFn: getTechnologies,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
