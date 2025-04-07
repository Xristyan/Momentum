import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        console.log('profile', profile);
        return profile;
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('credentials', credentials);

        const response = await fetch('http://backend:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) {
          // throw new Error('Invalid credentials.');
        }

        const data = await response.json();

        console.log('data', data);

        return { ...data };
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log('jwt token', token);
  //     console.log('jwt user', user);
  //     if (user) {
  //       token.id = user.id;
  //       token.accessToken = user.token; // 🔹 Store JWT in NextAuth session
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     console.log('session token', token);
  //     console.log('session session', session);
  //     session.user.id = token.id;
  //     session.accessToken = token.accessToken; // 🔹 Pass JWT to session
  //     return session;
  //   },
  // },

  // session: { strategy: 'jwt' },
});
