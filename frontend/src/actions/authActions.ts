'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import { RequestMethodsEnum } from '@/types/actions';
import {
  extractAndSetJWTCookie,
  fetchApi,
  getTokenFromCookie,
} from '@/lib/helpers/actionHelpers';
import { loginSchema } from '@/lib/schemas/loginSchema';
import { validateSchema } from '@/lib/helpers/schemaHelpers';
import { registerSchema } from '@/lib/schemas/registerSchema';
import { UserData } from '@/types/user';

export async function signIn(formData: z.infer<typeof loginSchema>) {
  const validationResult = validateSchema(loginSchema, formData);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const { data, error } = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/auth/login`,
    {
      method: RequestMethodsEnum.POST,
      credentials: 'include',
      body: {
        email: validationResult.data.email,
        password: validationResult.data.password,
        rememberMe: validationResult.data.rememberMe,
      },
    },
    extractAndSetJWTCookie,
  );

  if (error) {
    return { success: false, message: error };
  }

  return { success: true, data };
}

export const signUp = async (formData: z.infer<typeof registerSchema>) => {
  const validationResult = validateSchema(registerSchema, formData);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const { data, error } = await fetchApi(
    `${process.env.BACKEND_URL_DOCKER}/auth/register`,
    {
      method: RequestMethodsEnum.POST,
      credentials: 'include',
      body: validationResult.data,
    },
    extractAndSetJWTCookie,
  );

  if (error) {
    return { success: false, message: error };
  }

  return { success: true, data };
};

export const fetchUserFromSession = async (): Promise<
  UserData | null | undefined
> => {
  const jwt = await getTokenFromCookie();

  if (!jwt) {
    return null;
  }

  const { data, error } = await fetchApi<UserData>(
    `${process.env.BACKEND_URL_DOCKER}/auth/me`,
    {
      method: RequestMethodsEnum.GET,
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

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('jwt');

  return { success: true };
};
