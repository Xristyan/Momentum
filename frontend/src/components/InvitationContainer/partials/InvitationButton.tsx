import { Button } from '@/components/ui/button';
import { ActionResponse } from '@/types/actions';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

const messages = {
  fail: 'Failed to handle invitation',
  accept: 'Invitation accepted',
  decline: 'Invitation declined',
};

export const InvitationButton = ({
  handleInvitation,
  buttonType,
}: {
  handleInvitation: (action: 'accept' | 'decline') => Promise<ActionResponse>;
  buttonType: 'accept' | 'decline';
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleAction = async () => {
    startTransition(async () => {
      const response = await handleInvitation(buttonType);

      if (!response.success) {
        toast.error(messages.fail);
      }

      if (response.success) {
        toast.success(messages[buttonType]);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/profile');
      }
    });
  };
  return (
    <Button
      disabled={isPending}
      className="flex-1 capitalize"
      onClick={handleAction}
      variant={buttonType === 'accept' ? 'default' : 'outline'}
    >
      {buttonType}
    </Button>
  );
};
