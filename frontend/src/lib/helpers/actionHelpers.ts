import { RequestMethod } from '@/types/actions';
import { decode } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { parse as parseSetCookie } from 'set-cookie-parser';

export async function fetchApi<T>(
  url: string,
  options: {
    method: RequestMethod;
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
    body?: Record<string, unknown>;
    cache?: RequestCache;
  },
  onResponse?: (response: Response) => Promise<void>,
): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: options.credentials,
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      ...(options.cache ? { cache: options.cache } : {}),
    });

    if (onResponse) {
      await onResponse(response);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error:
          errorData?.message || `Request failed with status ${response.status}`,
      };
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function extractAndSetJWTCookie(
  response: Response,
): Promise<void> {
  const cookieStore = await cookies();
  const setCookieHeader = response.headers.get('set-cookie');

  if (!setCookieHeader) return;

  const parsedCookies = parseSetCookie(setCookieHeader);

  const jwtCookie = parsedCookies.find((cookie) => cookie.name === 'jwt');

  if (jwtCookie) {
    cookieStore.set('jwt', jwtCookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: jwtCookie.expires,
      path: jwtCookie.path || '/',
      sameSite: (jwtCookie.sameSite as 'lax' | 'strict' | 'none') || 'lax',
    });
  }
}

export const getTokenFromCookie = async () => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt');

  if (!jwt) {
    return false;
  }
  const token = decode(jwt.value);

  if (
    typeof token === 'object' &&
    token &&
    token.exp &&
    Date.now() >= token.exp * 1000
  ) {
    return false;
  }

  return jwt;
};

export const formatResponse = (response: {
  data?: unknown;
  error?: string;
}) => {
  const { data, error } = response;

  if (error) {
    return { success: false, message: error };
  }

  return { success: true, data };
};
