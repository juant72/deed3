import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

export default async function auth(req, res) {
  const providers = [
    // Wallet-based authentication using SIWE
    {
      id: "siwe",
      name: "Ethereum",
      type: "credentials",
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
      async authorize(credentials) {
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

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(credentials?.signature || "");
          
          return {
            id: siwe.address,
            address: siwe.address,
            chainId: siwe.chainId,
          };
        } catch (o) {
          console.error("SIWE authorization error:", o);
          return null;
        }
      },
    },
    
    // Social providers - only include if environment variables are set
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    
    ...(process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET ? [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: "2.0", // opt-in to Twitter OAuth 2.0
      })
    ] : []),
    
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      })
    ] : []),
  ];

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        // Include wallet address and chainId in session if available
        session.address = token.sub;
        session.chainId = token.chainId;
        session.user.address = token.sub;
        return session;
      },
      async jwt({ token, account, profile }) {
        // Persist additional data in the JWT token
        if (account) {
          token.chainId = account.chainId;
        }
        return token;
      },
      async signIn({ user, account, profile }) {
        // Custom sign-in logic can be added here
        return true;
      },
    },
    pages: {
      signIn: "/login", // Custom sign-in page
      error: "/auth/error", // Error code passed in query string as ?error=
    },
    events: {
      async signIn({ user, account, profile, isNewUser }) {
        console.log("User signed in:", { user: user.id, account: account?.provider });
      },
      async signOut({ session, token }) {
        console.log("User signed out:", session?.user?.id || token?.sub);
      },
    },
    debug: process.env.NODE_ENV === "development",
  });
}
