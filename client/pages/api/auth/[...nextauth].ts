import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import type { NextApiRequest, NextApiResponse } from "next";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const providers = [
  // Wallet-based authentication using SIWE
  {
    id: "siwe",
    name: "Ethereum",
    type: "credentials" as const,
    credentials: {
      message: {
        label: "Message",
        type: "text",
        placeholder: "0x0",
      },
      signature: {
        label: "Signature",
        type: "text",
        placeholder: "0x0",
      },
    },
    async authorize(credentials: Record<string, string> | undefined) {
      try {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
        
        const nextAuthUrl =
          process.env.NEXTAUTH_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
        if (!nextAuthUrl) {
          return null;
        }

        const nextAuthHost = new URL(nextAuthUrl).host;
        if (siwe.domain !== nextAuthHost) {
          return null;
        }

        if (siwe.nonce !== (await getCsrfToken({ req: {} as NextApiRequest }))) {
          return null;
        }

        await siwe.verify({ signature: credentials?.signature || "" });
        
        return {
          id: siwe.address,
          name: siwe.address,
          email: null,
          image: null,
        };
      } catch (e) {
        console.error("SIWE authorization error:", e);
        return null;
      }
    },
  },
  
  // Traditional OAuth providers
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
  
  TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID || "",
    clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    version: "2.0",
  }),
  
  GitHubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
];

const authOptions: AuthOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {
      if (user) {
        token.uid = user.id;
      }
      if (account?.provider === "siwe") {
        token.sub = user?.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
