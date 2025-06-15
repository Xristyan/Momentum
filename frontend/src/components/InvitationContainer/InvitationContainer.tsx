'use client';
import { handleInvitation } from '@/actions/invitationActions';
import { InvitationTypes } from '@/types/invitations';
import { InvitationButton } from './partials/InvitationButton';

export const InvitationContainer = ({ token }: { token: string }) => {
  const handleInvitationAction = async (action: 'accept' | 'decline') => {
    const response = handleInvitation(
      token,
      action,
      InvitationTypes.ORGANIZATION,
    );

    return response;
  };

  return (
    <div className="flex gap-3 px-8">
      <InvitationButton
        handleInvitation={handleInvitationAction}
        buttonType="accept"
      />
      <InvitationButton
        handleInvitation={handleInvitationAction}
        buttonType="decline"
      />
    </div>
  );
};
