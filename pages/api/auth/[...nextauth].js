import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
const db = new PrismaClient();
export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize({ sim, pin }, req) {
        try {
          const user = await db.user.findUnique({
            where: {
              sim: parseInt(sim),
            },
            select: {
              pinHash: true,
              sim: true,
              id: true,
            },
          });
          const result = bcrypt.compare(user.pinHash, pin);
          if (result) {
            delete user.pinHash;
            return { user };
          }
          return false;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user; // Setting token in session
      return session;
    },
  },
});
