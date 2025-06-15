import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// pages/api/auth/atlassian/callback.ts (or app/api/auth/atlassian/callback/route.ts)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const parsedState = JSON.parse(decodeURIComponent(state || '{}'));
  const organizationId = parsedState.organizationId;

  if (!code) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(
      'https://auth.atlassian.com/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_AUTH_ATLASSIAN_ID,
          client_secret: process.env.AUTH_ATLASSIAN_SECRET,
          code,
          redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/atlassian/callback`,
        }),
      },
    );

    const token = await tokenResponse.json();

    // Save token in cookie
    const cookieStore = await cookies();
    cookieStore.set('jira_token', JSON.stringify(token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 7 days
    });

    // Redirect back to Jira page
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${organizationId}/technologies/jira?jira_success=true`,
    );
  } catch (error) {
    console.error('Atlassian OAuth error:', error);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${organizationId}/technologies/jira?error=token_exchange_failed`,
    );
  }
}
