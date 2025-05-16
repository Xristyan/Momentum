import { useMutation } from '@tanstack/react-query';
import { updateUserProfile as updateUserProfileAction } from '@/actions/userActions';
import { profileUpdateSchema } from '@/lib/schemas/profileSchema';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof profileUpdateSchema>) => {
      const result = await updateUserProfileAction(formData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { updateProfile, isPending };
};
