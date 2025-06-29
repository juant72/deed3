import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { mainnet } from "wagmi/chains";

import "../styles/tailwind.css";

import { StateContextProvider } from "../context";
import { wagmiConfig } from "../lib/wagmi-config";
import { rainbowKitTheme } from "../lib/rainbowkit-theme";
import ClientOnly from "../components/ClientOnly";

interface MyAppProps extends AppProps {
  pageProps: {
    session?: Session | null | undefined;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  // Simple error suppression to prevent extension and dev warnings from cluttering console
  React.useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return;
    
    const originalError = console.error;
    const suppressPatterns = [
      'Lit is in dev mode',
      'WalletConnect',
      'chrome-extension:',
      'moz-extension:',
      'Maximum update depth exceeded'
    ];
    
    console.error = (...args) => {
      const message = args.join(' ');
      if (suppressPatterns.some(pattern => message.includes(pattern))) return;
      originalError.apply(console, args);
    };
    
    return () => {
      console.error = originalError;
    };
  }, []);

  // Create a client for React Query - MOVED OUTSIDE to prevent recreation
  const queryClient = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }), []);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, user-scalable=yes, viewport-fit=cover" />
      </Head>
      <ClientOnly fallback={<div>Loading...</div>}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={session || null}>
              <RainbowKitSiweNextAuthProvider>
                <RainbowKitProvider 
                  theme={rainbowKitTheme}
                  initialChain={mainnet}
                  showRecentTransactions={true}
                  coolMode={false}
                >
                  <StateContextProvider>
                    <Component {...pageProps} />
                    <Toaster />
                  </StateContextProvider>
                </RainbowKitProvider>
              </RainbowKitSiweNextAuthProvider>
            </SessionProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ClientOnly>

      {/* Modern React components have replaced jQuery functionality */}
      {/* Keeping only essential non-jQuery scripts */}
      
      {/* Core vendor scripts (no jQuery dependencies) */}
      <Script src="/js/vendor/modernizer.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/feather.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/particles.js" strategy="lazyOnload" />
      <Script src="/js/vendor/js.cookie.js" strategy="lazyOnload" />
      <Script src="/js/vendor/vanilla.tilt.js" strategy="lazyOnload" />
      <Script src="/js/vendor/web3.min.js" strategy="lazyOnload" />
      
      {/* Note: jQuery and plugins removed - replaced with React components:
           - Slick carousel → Embla Carousel (components/ui/carousel.tsx)
           - jQuery Appear → Framer Motion (components/ui/animate-on-scroll.tsx) 
           - Odometer → React CountUp (components/ui/counter.tsx)
           - jQuery Nice Select → Shadcn/ui Select
           - Style Switcher → useTheme hook (hooks/useTheme.tsx)
      */}
    </>
  );
}
