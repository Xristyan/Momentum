// 'use server';

// import { cookies } from 'next/headers';
// import { z } from 'zod';

// enum RequestMethodsEnum {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   DELETE = 'DELETE',
// }

// // Organization creation schema
// export const createOrgSchema = z.object({
//   name: z.string().min(1, 'Organization name is required'),
//   description: z.string().optional(),
//   technologies: z
//     .array(z.string())
//     .min(1, 'At least one technology must be selected'),
// });

// export type CreateOrgInput = z.infer<typeof createOrgSchema>;

// // Organization type
// export interface Organization {
//   id: number;
//   name: string;
//   description?: string;
//   technologies?: string[];
//   createdAt?: string;
//   updatedAt?: string;
//   Users?: Array<{
//     id: number;
//     name?: string;
//     email: string;
//     Membership: {
//       role: string;
//     };
//   }>;
// }

// async function fetchApi<T extends Record<string, unknown>>(
//   url: string,
//   options: {
//     method: RequestMethodsEnum;
//     headers?: Record<string, string>;
//     credentials?: RequestCredentials;
//     body?: Record<string, unknown>;
//   },
// ): Promise<{ data?: T; error?: string }> {
//   try {
//     const response = await fetch(url, {
//       method: options.method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       credentials: options.credentials,
//       ...(options.body ? { body: JSON.stringify(options.body) } : {}),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return {
//         error:
//           errorData?.message || `Request failed with status ${response.status}`,
//       };
//     }

//     const data = (await response.json()) as T;
//     return { data };
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : 'An unknown error occurred';
//     console.error('API request failed:', errorMessage);
//     return { error: errorMessage };
//   }
// }

// export const fetchUserOrganizations = async (): Promise<{
//   success: boolean;
//   data?: Organization[];
//   error?: string;
// }> => {
//   const cookieStore = await cookies();
//   const jwt = cookieStore.get('jwt');

//   if (!jwt) {
//     return { success: false, error: 'Not authenticated' };
//   }

//   const { data, error } = await fetchApi<{ data: Organization[] }>(
//     'http://backend:8000/organizations',
//     {
//       method: RequestMethodsEnum.GET,
//       headers: {
//         Authorization: `Bearer ${jwt.value}`,
//       },
//     },
//   );

//   if (error) {
//     return { success: false, error };
//   }

//   return { success: true, data: data?.data };
// };

// export const createOrganization = async (
//   formData: CreateOrgInput,
// ): Promise<{
//   success: boolean;
//   data?: { organization: Organization };
//   error?: string;
// }> => {
//   const cookieStore = await cookies();
//   const jwt = cookieStore.get('jwt');

//   if (!jwt) {
//     return { success: false, error: 'Not authenticated' };
//   }

//   const { data, error } = await fetchApi<{ organization: Organization }>(
//     'http://backend:8000/organizations',
//     {
//       method: RequestMethodsEnum.POST,
//       headers: {
//         Authorization: `Bearer ${jwt.value}`,
//       },
//       body: formData,
//     },
//   );

//   if (error) {
//     return { success: false, error };
//   }

//   return { success: true, data };
// };
