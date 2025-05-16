import { z } from 'zod';

export const profileUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  picture: z.string().optional(),
});
