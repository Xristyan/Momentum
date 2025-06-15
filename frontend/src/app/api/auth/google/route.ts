import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function GET() {
  const redirectURL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback`;

  const oAuth2Client = new OAuth2Client(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    redirectURL,
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile  openid email ',
    prompt: 'consent',
  });

  return NextResponse.json({ url: authorizeUrl });
}
