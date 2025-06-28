# RainbowKit + Social Authentication - Implementation Guide

## Overview
Complete setup for RainbowKit with social authentication using NextAuth.js

## Dependencies Required

```bash
# RainbowKit stack
pnpm add @rainbow-me/rainbowkit wagmi viem @tanstack/react-query

# NextAuth with RainbowKit integration
pnpm add next-auth @rainbow-me/rainbowkit-siwe-next-auth

# Social providers (optional, choose what you need)
pnpm add @auth/google-provider @auth/twitter-provider @auth/github-provider
```

## 1. NextAuth Configuration

### `/pages/api/auth/[...nextauth].js`
```javascript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import GitHubProvider from 'next-auth/providers/github';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

export default async function auth(req, res) {
  const providers = [
    // Social Providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    
    // SIWE Provider (for wallet authentication)
    {
      id: 'ethereum',
      name: 'Ethereum',
      type: 'credentials',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));

          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);
          if (siwe.domain !== nextAuthUrl.host) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(credentials?.signature || '');
          
          return {
            id: siwe.address,
            name: siwe.address,
            email: `${siwe.address}@ethereum.local`,
            image: `https://effigy.im/a/${siwe.address}.svg`,
          };
        } catch (e) {
          return null;
        }
      },
    },
  ];

  const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth?.includes('signin');

  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub;
        session.user.id = token.sub;
        session.user.name = token.sub;
        return session;
      },
    },
  });
}
```

## 2. Environment Variables

### `.env.local`
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Twitter OAuth
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# WalletConnect (for RainbowKit)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

## 3. App Configuration

### `/pages/_app.js`
```javascript
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';

import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { wagmiConfig } from '../lib/wagmi-config';
import { customTheme } from '../lib/rainbowkit-theme';

const queryClient = new QueryClient();

// Custom SIWE message options
const getSiweMessageOptions = () => ({
  statement: 'Sign in to Deeds3 - Real Estate NFT Platform',
  domain: 'deeds3.vercel.app',
  uri: 'https://deeds3.vercel.app',
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider theme={customTheme}>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}

export default MyApp;
```

## 4. Social Login Components

### `/components/SocialAuth.jsx`
```javascript
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const SocialAuth = () => {
  const { data: session, status } = useSession();
  const { isConnected } = useAccount();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container">
      {/* Wallet Connection */}
      <div className="wallet-section">
        <h3>Connect Wallet</h3>
        <ConnectButton />
      </div>

      {/* Social Authentication */}
      <div className="social-section">
        <h3>Social Login</h3>
        
        {!session ? (
          <div className="social-buttons">
            <button 
              onClick={() => signIn('google')}
              className="btn btn-google"
            >
              Sign in with Google
            </button>
            
            <button 
              onClick={() => signIn('twitter')}
              className="btn btn-twitter"
            >
              Sign in with Twitter
            </button>
            
            <button 
              onClick={() => signIn('github')}
              className="btn btn-github"
            >
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="user-info">
            <p>Signed in as {session.user?.email}</p>
            <button 
              onClick={() => signOut()}
              className="btn btn-signout"
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Combined Status */}
      <div className="status-section">
        <p>Wallet: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
        <p>Social: {session ? '✅ Authenticated' : '❌ Not authenticated'}</p>
      </div>
    </div>
  );
};

export default SocialAuth;
```

## 5. Custom Auth Hook

### `/hooks/useAuth.js`
```javascript
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

export const useAuth = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { address, isConnected } = useAccount();

  const isWalletConnected = isConnected && !!address;
  const isSocialAuthenticated = !!session;
  const isFullyAuthenticated = isWalletConnected && isSocialAuthenticated;

  return {
    // Wallet state
    walletAddress: address,
    isWalletConnected,
    
    // Social auth state
    socialSession: session,
    isSocialAuthenticated,
    socialLoading: sessionStatus === 'loading',
    
    // Combined state
    isFullyAuthenticated,
    user: session?.user,
    
    // Helper functions
    hasWallet: () => isWalletConnected,
    hasSocial: () => isSocialAuthenticated,
    hasBoth: () => isFullyAuthenticated,
  };
};
```

## 6. Usage Examples

### Protected Route Example
```javascript
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedPage = () => {
  const { isFullyAuthenticated, socialLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!socialLoading && !isFullyAuthenticated) {
      router.push('/login');
    }
  }, [isFullyAuthenticated, socialLoading, router]);

  if (socialLoading) {
    return <div>Loading...</div>;
  }

  if (!isFullyAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>You need both wallet connection AND social authentication to see this.</p>
    </div>
  );
};

export default ProtectedPage;
```

## 7. Styling Social Buttons

### `/styles/social-auth.css`
```css
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-google {
  background: #4285f4;
  color: white;
}

.btn-google:hover {
  background: #357abd;
}

.btn-twitter {
  background: #1da1f2;
  color: white;
}

.btn-twitter:hover {
  background: #0d8bd9;
}

.btn-github {
  background: #333;
  color: white;
}

.btn-github:hover {
  background: #555;
}

.btn-signout {
  background: #dc3545;
  color: white;
}

.btn-signout:hover {
  background: #c82333;
}

.status-section {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}
```

## Benefits of This Setup

### ✅ **Complete Authentication**
- **Wallet-based**: MetaMask, WalletConnect, Coinbase Wallet
- **Social**: Google, Twitter, GitHub, Discord, etc.
- **Email**: Traditional email/password
- **Hybrid**: Combine multiple auth methods

### ✅ **Best User Experience**
- Users can choose their preferred authentication method
- Seamless integration between wallet and social auth
- Progressive authentication (start with one, add others)

### ✅ **Enterprise Ready**
- NextAuth supports 50+ providers out of the box
- GDPR compliant
- Session management
- JWT tokens
- Database sessions (optional)

### ✅ **Developer Friendly**
- Type-safe with TypeScript
- Server-side session access
- Middleware protection
- Extensive documentation

## Migration from Current Setup

The current Reown AppKit setup can be enhanced with this social authentication layer without breaking existing functionality. The wallet connection logic remains the same, and social auth is added as an additional layer.

## Next Steps

1. **Choose social providers** needed for your app
2. **Set up OAuth applications** with chosen providers
3. **Implement the NextAuth configuration**
4. **Add social login UI components**
5. **Test the complete authentication flow**
