import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import { prisma } from "config/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "types/errors/auth.errors";

if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
  throw new Error(
    "Please provide the following variable in your .env file: NEXT_PUBLIC_GOOGLE_CLIENT_ID"
  );
}

if (!process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
  throw new Error(
    "Please provide the following variable in your .env file: GOOGLE_OAUTH_CLIENT_SECRET"
  );
}

type Credentials = {
  email: string;
  name?: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
  type: "LOGIN" | "SIGN_UP";
};

type IUser = {
  id: number;
  email: string;
  name: string;
};

const SALT_ROUNDS = 5;

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: "Sign Up with Email and Password",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials): Promise<IUser | null> {
        switch (credentials.type) {
          case "LOGIN": {
            const userAccount = await prisma.user.findUnique({
              where: { email: credentials.email },
            });
            if (!userAccount || !userAccount.passwordHash) return null;
            const isAuthorized: boolean = await bcrypt.compare(
              credentials.password,
              userAccount.passwordHash
            );
            if (!isAuthorized) return Promise.reject(new AuthError("EMAIL_PASSWORD_DOESNT_EXIST"));
            const { id, name, email } = userAccount;
            return { id, name: name as string, email: email as string };
          }
          case "SIGN_UP": {
            const passwordHash = await bcrypt.hash(credentials.password, SALT_ROUNDS);
            try {
              const userAccount = await prisma.user.create({
                data: {
                  email: credentials.email,
                  passwordHash,
                  name: credentials.name,
                },
              });
              const { id, name, email } = userAccount;
              return { id, name: name as string, email: email as string };
            } catch (error) {
              if (error.code === "P2002") {
                return Promise.reject(new AuthError("USER_ALREADY_EXISTS"));
              }
              return null;
            }
          }
          default:
            return null;
        }
      },
    }),
    // ...add more providers here
  ],
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  // A database is optional, but required to persist accounts in a database
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
