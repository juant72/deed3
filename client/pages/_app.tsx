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
  // Suppress common extension errors in development
  React.useEffect(() => {
    const isExtensionError = (error: any) => {
      const message = error?.message || error?.toString?.() || '';
      return (
        message.includes('chrome.runtime.sendMessage') ||
        message.includes('Extension ID') ||
        message.includes('opfgelmcmbiajamepnmloijbpoleiama') ||
        message.includes('inpage.js') ||
        message.includes('chrome-extension://') ||
        message.includes('runtime.sendMessage')
      );
    };

    // Suppress console errors
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString?.() || '';
      if (isExtensionError({ message })) {
        return; // Suppress this error
      }
      originalError.apply(console, args);
    };

    // Suppress console warnings
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0]?.toString?.() || '';
      if (isExtensionError({ message })) {
        return; // Suppress this warning
      }
      originalWarn.apply(console, args);
    };

    // Suppress unhandled errors and rejections
    const handleError = (event: ErrorEvent): boolean => {
      if (isExtensionError(event.error)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      return true;
    };

    const handleRejection = (event: PromiseRejectionEvent): boolean => {
      if (isExtensionError(event.reason)) {
        event.preventDefault();
        return false;
      }
      return true;
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

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
      <ClientOnly fallback={<div>Loading...</div>}>
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
      </ClientOnly>

      {/* Vendor Scripts - Loaded with Next.js Script optimization */}
      {/* jQuery plugins - Load after jQuery */}
      <Script src="/js/vendor/jquery.nice-select.min.js" strategy="afterInteractive" />
      <Script src="/js/vendor/jquery-ui.js" strategy="afterInteractive" />
      <Script src="/js/vendor/jquery-appear.js" strategy="afterInteractive" />
      <Script src="/js/vendor/jquery.custom-file-input.js" strategy="afterInteractive" />
      <Script src="/js/vendor/jquery.style.swicher.js" strategy="afterInteractive" />
      
      {/* Other vendor scripts */}
      <Script src="/js/vendor/modernizer.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/feather.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/slick.min.js" strategy="afterInteractive" />
      <Script src="/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/sal.min.js" strategy="lazyOnload" />
      <Script src="/js/vendor/particles.js" strategy="lazyOnload" />
      <Script src="/js/vendor/js.cookie.js" strategy="lazyOnload" />
      <Script src="/js/vendor/count-down.js" strategy="lazyOnload" />
      <Script src="/js/vendor/isotop.js" strategy="lazyOnload" />
      <Script src="/js/vendor/imageloaded.js" strategy="lazyOnload" />
      <Script src="/js/vendor/odometer.js" strategy="lazyOnload" />
      <Script src="/js/vendor/scrolltrigger.js" strategy="lazyOnload" />
      <Script src="/js/vendor/savePopup.js" strategy="lazyOnload" />
      <Script src="/js/vendor/vanilla.tilt.js" strategy="lazyOnload" />

      {/* Main Application Script */}
      <Script src="/js/main.js" strategy="lazyOnload" />

      {/* Web3 Scripts */}
      <Script src="/js/vendor/web3.min.js" strategy="lazyOnload" />
    </>
  );
}
