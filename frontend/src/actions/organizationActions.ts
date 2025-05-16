'use server';

import { validateSchema } from '@/lib/helpers/schemaHelpers';
import { createOrganizationSchema } from '@/lib/schemas/organizationSchema';
import { z } from 'zod';
import {
  fetchApi,
  formatResponse,
  getTokenFromCookie,
} from '@/lib/helpers/actionHelpers';
import { RequestMethodsEnum } from '@/types/actions';
import { Organization } from '@/types/organizations';

export const createOrganization = async (
  formData: z.infer<typeof createOrganizationSchema>,
) => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return { success: false, message: 'Unauthorized' };
  }

  const validationResult = validateSchema(createOrganizationSchema, formData);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const response = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/organizations`,
    {
      method: RequestMethodsEnum.POST,
      credentials: 'include',
      body: {
        name: validationResult.data.name,
        description: validationResult.data.description,
        technologies: validationResult.data.technologies,
      },
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
    },
  );

  return formatResponse(response);
};

export const getOrganization = async (
  id: number | null,
): Promise<Organization | null | undefined> => {
  if (!id) {
    return null;
  }

  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return null;
  }

  const { data, error } = await fetchApi<Organization>(
    `${process.env.BACKEND_URL_DOCKER}/organizations/${id}`,
    {
      method: RequestMethodsEnum.GET,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
    },
  );

  if (error) {
    return null;
  }

  return data;
};

// const updateOrganization = () => {};

export const deleteOrganization = async (organizationId: number) => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return { success: false, message: 'Unauthorized' };
  }

  const response = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/organizations/${organizationId}`,
    {
      method: RequestMethodsEnum.DELETE,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
    },
  );

  return formatResponse(response);
};
