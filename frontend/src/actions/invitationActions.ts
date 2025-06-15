'use server';

import { RequestMethodsEnum } from '@/types/actions';
import {
  formatResponse,
  fetchApi,
  getTokenFromCookie,
} from '../lib/helpers/actionHelpers';
import { InvitationTypes } from '@/types/invitations';

export const getInvitation = async (token: string) => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return { success: false, message: 'Unauthorized' };
  }
  const response = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/invitations?token=${token}`,
    {
      method: RequestMethodsEnum.GET,
    },
  );
  return formatResponse(response);
};

export const handleInvitation = async (
  token: string,
  action: 'accept' | 'decline',
  type: InvitationTypes,
) => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return { success: false, message: 'Unauthorized' };
  }

  const response = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/invitations?token=${token}`,
    {
      method: RequestMethodsEnum.POST,
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
      credentials: 'include',
      body: { action, type },
    },
  );

  return formatResponse(response);
};
