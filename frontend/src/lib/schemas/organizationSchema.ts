import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  technologies: z
    .array(z.string())
    .min(1, 'At least one technology is required'),
});
