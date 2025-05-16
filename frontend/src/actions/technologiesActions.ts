'use server';

import { fetchApi } from '@/lib/helpers/actionHelpers';

export const getTechnologies = async () => {
  const technologies = await fetchApi<
    Array<{ id: string; name: string; description: string }>
  >(`${process.env.BACKEND_URL_DOCKER}/integrations/technologies`, {
    method: 'GET',
  });

  return technologies;
};
