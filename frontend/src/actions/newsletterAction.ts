'use server';
import type { IssueData } from 'zod';
import { newsletterSchema } from '@/lib/schemas/newsletterSchema';

type NewsletterActionResponse = {
  errors?: { [key: string]: string };
  successMsg?: string;
};

export const formHandlerAction = async (
  data: unknown,
): Promise<NewsletterActionResponse> => {
  const validated = newsletterSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.issues.reduce(
      (acc: { [key: string]: string }, issue: IssueData) => {
        if (issue.path && issue.message) {
          acc[issue.path[0]] = issue.message;
        }
        return acc;
      },
      {},
    );
    return {
      errors,
    };
  } else {
    return { successMsg: 'Succesfully subscribed to newsletter!' };
  }
};
