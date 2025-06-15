'use server';

import { validateSchema } from '@/lib/helpers/schemaHelpers';
import { profileUpdateSchema } from '@/lib/schemas/profileSchema';
import { z } from 'zod';
import {
  fetchApi,
  formatResponse,
  getTokenFromCookie,
} from '@/lib/helpers/actionHelpers';
import { RequestMethodsEnum } from '@/types/actions';

export const updateUserProfile = async (
  formData: z.infer<typeof profileUpdateSchema>,
) => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return { success: false, message: 'Unauthorized' };
  }

  const validationResult = validateSchema(profileUpdateSchema, formData);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const response = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/users/profile`,
    {
      method: RequestMethodsEnum.PUT,
      credentials: 'include',
      body: {
        name: validationResult.data.name,
        ...(validationResult.data.picture !== undefined && {
          picture: validationResult.data.picture,
        }),
      },
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
    },
  );

  return formatResponse(response);
};

export const leaveOrganization = async (organizationId: number) => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return { success: false, message: 'Unauthorized' };
  }

  const response = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/users/leave/${organizationId}`,
    {
      method: RequestMethodsEnum.DELETE,
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
      credentials: 'include',
    },
  );

  return formatResponse(response);
};
