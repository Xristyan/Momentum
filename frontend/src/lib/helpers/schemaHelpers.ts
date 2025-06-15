import { z } from 'zod';

export function validateSchema<T extends z.ZodTypeAny>(
  schema: z.ZodTypeAny,
  data: unknown,
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (acc: Record<string, string>, issue: z.ZodIssue) => {
        if (issue.path.length > 0) {
          acc[issue.path[0].toString()] = issue.message;
        }
        return acc;
      },
      {},
    );
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}
