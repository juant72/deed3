import React from "react";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

import "../styles/globals.css";

import { StateContextProvider } from "../context";
import { wagmiConfig } from "../lib/wagmi-config";
import { rainbowKitTheme } from "../lib/rainbowkit-theme";

interface MyAppProps extends AppProps {
  pageProps: {
    session?: Session | null | undefined;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  // Create a client for React Query inside the component
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));
  
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session || null}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider theme={rainbowKitTheme}>
                <StateContextProvider>
                  <Component {...pageProps} />
                  <Toaster />
                </StateContextProvider>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </QueryClientProvider>
      </WagmiProvider>

      {/* Vendor Scripts - Loaded with Next.js Script optimization */}
      <Script src="/js/vendor/jquery.js" strategy="lazyOnload" />
      <Script src="/js/vendor/jquery.nice-select.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/jquery-ui.js" strategy="lazyOnload" />
      <Script src="/js/vendor/modernizer.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/feather.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/slick.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/sal.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/particles.js" strategy="lazyOnload" />
      <Script src="/js/vendor/jquery.style.swicher.js" strategy="lazyOnload" />
      <Script src="/js/vendor/js.cookie.js" strategy="lazyOnload" />
      <Script src="/js/vendor/count-down.js" strategy="lazyOnload" />
      <Script src="/js/vendor/isotop.js" strategy="lazyOnload" />
      <Script src="/js/vendor/imageloaded.js" strategy="lazyOnload" />
      <Script src="/js/vendor/odometer.js" strategy="lazyOnload" />
      <Script src="/js/vendor/jquery-appear.js" strategy="lazyOnload" />
      <Script src="/js/vendor/scrolltrigger.js" strategy="lazyOnload" />
      <Script src="/js/vendor/jquery.custom-file-input.js" strategy="lazyOnload" />
      <Script src="/js/vendor/savePopup.js" strategy="lazyOnload" />
      <Script src="/js/vendor/vanilla.tilt.js" strategy="lazyOnload" />

      {/* Main Application Script */}
      <Script src="/js/main.js" strategy="lazyOnload" />

      {/* Web3 Scripts */}
      <Script src="/js/vendor/web3.min.js" strategy="lazyOnload" />
    </>
  );
}
