import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Subscriptions } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";
import { db } from "../../../services/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!
    })

    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {

      const userActiveSubscription = await db.subscriptions.findFirst({
        where: {
          user: {
            email: { equals: session?.user?.email }
          },
          status: { equals: 'active' }
        },
      })

      return {
        ...session,
        activeSubscription: userActiveSubscription
      }
    }
  }
}
export default NextAuth(authOptions)

declare module "next-auth" {
  interface Session {
    activeSubscription: Subscriptions | null;
  }
}