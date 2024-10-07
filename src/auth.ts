import {saltAndHashPassword} from "@/lib/utils";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./db";

interface IPhoneAndPasswordCredentias {
  phone: string,
  password: string,
}

export const {handlers, signIn, signOut, auth} = NextAuth({
  session: {strategy: "jwt"},

  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",

      credentials: {
        phone: {},
        password: {},
      },

      authorize: async (credentials, _) => {
        const phoneAndPasswordCredentias = credentials as unknown as IPhoneAndPasswordCredentias;

        const user = await prisma.user.findFirst({
          where: {phone: phoneAndPasswordCredentias.phone},
          include: {account: {include: {accountSector: {include: {sector: true}}}}}
        });

        if (!user) {
          return null; 
        }

        const hashedPassword = saltAndHashPassword(phoneAndPasswordCredentias.password);

        if (user.password !== hashedPassword) {
          return null; 
        }

        return {
          id: user.id,
          code: user.code,
          phone: user.phone,
          balance: user.account?.balance,
          totalWin: user.account?.totalWin,
          sectorName: user.account?.accountSector?.sector.name,
          role: user.role,
        };
      }
    }),
  ],

  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.user = params.user;
      }
      return params.token;
    },

    async session({session, token}) {
      if (token && token.user) {
        session.user = {
          ...session.user,
          id: token.user.id ?? "",
          code: token.user.code,
          phone: token.user.phone,
          balance: token.user.balance,
          totalWin: token.user.totalWin,
          sectorName: token.user.sectorName,
          role: token.user.role,
        };
      }
      return session;
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },
})
