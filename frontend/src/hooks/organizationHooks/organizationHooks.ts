import { useMutation } from '@tanstack/react-query';
import {
  createOrganization as createOrganizationAction,
  deleteOrganization as deleteOrganizationAction,
} from '@/actions/organizationActions';
import { createOrganizationSchema } from '@/lib/schemas/organizationSchema';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { leaveOrganization as leaveOrganizationAction } from '@/actions/userActions';
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createOrganization, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof createOrganizationSchema>) => {
      const action = await createOrganizationAction(formData);
      return action;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { createOrganization, isPending };
};

export const useUpdateOrganization = () => {
  //   const { user } = useUser();
  //   const { mutate: updateOrganization, isPending } = useMutation({
  //     mutationFn: updateOrganization,
  //   });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteOrganization, isPending } = useMutation({
    mutationFn: async (organizationId: number) => {
      return await deleteOrganizationAction(organizationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { deleteOrganization, isPending };
};

export const useLeaveOrganization = () => {
  const queryClient = useQueryClient();

  const { mutate: leaveOrganization, isPending } = useMutation({
    mutationFn: async (organizationId: number) => {
      return await leaveOrganizationAction(organizationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { leaveOrganization, isPending };
};
