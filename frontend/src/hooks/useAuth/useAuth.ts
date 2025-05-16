import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logout, signIn, signUp } from '@/actions/authActions';
import { loginSchema } from '@/lib/schemas/loginSchema';
import { z } from 'zod';
import { registerSchema } from '@/lib/schemas/registerSchema';
import { useOverlay } from '@/providers/overlayProvider/OverlayProvider';

export const useAuth = () => {
  const { onOpen, onClose } = useOverlay();
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutHandler = async () => {
    onOpen();

    await logout();

    queryClient.setQueryData(['user'], null);

    router.push('/');

    onClose();
  };

  const loginHandler = async (values: z.infer<typeof loginSchema>) => {
    const action = await signIn(values);

    queryClient.invalidateQueries({ queryKey: ['user'] });

    return action;
  };

  const signupHandler = async (values: z.infer<typeof registerSchema>) => {
    const action = await signUp(values);

    queryClient.invalidateQueries({ queryKey: ['user'] });

    return action;
  };

  return { logoutHandler, loginHandler, signupHandler };
};
