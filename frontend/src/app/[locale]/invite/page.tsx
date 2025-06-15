import { fetchUserFromSession } from '@/actions/authActions';
import { getInvitation } from '@/actions/invitationActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { InvitationContainer } from '@/components/InvitationContainer';

export default async function InvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token = '' } = await searchParams;

  const result = await getInvitation(token);

  const user = await fetchUserFromSession();

  const successResult = result as {
    success: true;
    data: {
      invitation: {
        status: string;
        expiresAt: string;
        organizationId: string;
        email: string;
      };
      organization?: { name?: string };
    };
  };

  if (
    !result.success ||
    !user ||
    user.data.email !== successResult.data.invitation.email
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <CardTitle>Invalid Invitation</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-muted-foreground">{result.message}</p>
            <Button asChild variant="outline">
              <Link href="/">Go Back</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    invitation: { status, expiresAt, organizationId },
  } = successResult.data;

  if (status === 'accepted') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
            <CardTitle>Already Accepted</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-muted-foreground">
              You have already accepted this invitation
            </p>
            <Button asChild>
              <Link href={`/dashboard/${organizationId}`}>Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <CardTitle>Invitation Declined</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-muted-foreground">
              You have declined this invitation
            </p>
            <Button asChild variant="outline">
              <Link href="/">Go Back</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'pending' && new Date(expiresAt) < new Date()) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Clock className="mx-auto mb-4 h-12 w-12 text-orange-500" />
            <CardTitle>Invitation Expired</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-muted-foreground">
              This invitation has expired on{' '}
              {new Date(expiresAt).toLocaleDateString()}
            </p>
            <Button asChild variant="outline">
              <Link href="/">Go Back</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-primary" />
          <CardTitle>You have been invited</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              You have been invited to join an organization
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Expires: {new Date(expiresAt).toLocaleDateString()} at{' '}
              {new Date(expiresAt).toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
        <InvitationContainer token={token} />
      </Card>
    </div>
  );
}
