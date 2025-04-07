import { extractAndSetJWTCookie, fetchApi } from '@/lib/helpers/actionHelpers';
import { RequestMethodsEnum } from '@/types/actions';
import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

async function getUserData(access_token: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
  );

  const data = await response.json();

  return data;
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get('code');
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }
  const redirectURL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback`;

  try {
    const oAuth2Client = new OAuth2Client(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      redirectURL,
    );

    const tokenResponse = await oAuth2Client.getToken(code);

    const userData = await getUserData(
      tokenResponse.tokens.access_token as string,
    );

    const { error } = await fetchApi(
      `${process.env.BACKEND_URL_DOCKER}/auth/google/login`,
      {
        method: RequestMethodsEnum.POST,
        body: {
          email: userData.email,
          name: userData.name,
          googleId: userData.sub,
          picture: userData.picture,
        },
      },
      extractAndSetJWTCookie,
    );

    if (error) {
      throw new Error('Failed to authenticate with backend');
    }

    const response = NextResponse.redirect(new URL('/profile', request.url));

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(
      new URL('/login?error=Authentication failed', request.url),
    );
  }
}
