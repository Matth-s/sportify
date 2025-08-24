import { betterAuth } from 'better-auth';
import { username } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { comparePassword, hashPassword } from './bcrypt';
import prisma from './prisma';
import {
  sendEmailVerification,
  sendPasswordResetEmail,
} from './mail';

export const auth = betterAuth({
  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 10 * 60, //10 min
    sendResetPassword: async ({ user, token }): Promise<void> => {
      await sendPasswordResetEmail({
        token,
        email: user.email,
        username: user.username,
      });
    },

    //password hash and compare
    password: {
      hash: async (password: string): Promise<string> => {
        return await hashPassword(password);
      },
      verify: async ({
        hash,
        password,
      }: {
        hash: string;
        password: string;
      }) => {
        return await comparePassword({ hash, password });
      },
    },
  },

  // validation de l email le token expire en 15min
  emailVerification: {
    //envoyer un email la connection et a l'inscription si ce dernier n'est pas verifier
    sendOnSignIn: true,
    sendOnSignUp: true,
    //envoyer l'email de verification pour activer le compte
    expiresIn: 15 * 60,
    sendVerificationEmail: async ({
      user,
      token,
    }: {
      token: string;
      user: {
        email: string;
        username: string;
      };
    }): Promise<void> => {
      await sendEmailVerification({
        token,
        email: user.email,
        username: user.username,
      });
    },
  },

  session: {
    expiresIn: 60 * 60, //1heure
    updateAge: 30 * 60, //30 minutes
    disableSessionRefresh: false,
  },

  plugins: [
    username({
      usernameNormalization: (username) => username.trim(),
      displayUsernameNormalization: (displayUsername) =>
        displayUsername.toLowerCase(),
    }),
  ],

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
