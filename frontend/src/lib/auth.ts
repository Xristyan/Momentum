import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import AtlassianProvider from 'next-auth/providers/atlassian';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        return profile;
      },
    }),
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_CLIENT_ID,
      clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'write:jira-work read:jira-work read:jira-user offline_access read:me',
        },
      },
    }),
  ],
});
