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
          if (isNaN(sim) || isNaN(pin))
            throw new Error('user sim and pin are supposed to be a  number');
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
          if (!user) throw new Error('User not found');
          const result = await bcrypt.compare(pin.toString(), user.pinHash);
          if (user && result) {
            delete user.pinHash;
            return user;
          } else {
            return null;
          }
        } catch (err) {
          console.log(err);
          return null;
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
