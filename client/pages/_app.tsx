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
  // Enhanced extension error suppression
  React.useEffect(() => {
    const isExtensionError = (error: any) => {
      if (!error) return false;
      
      const message = String(error?.message || error?.toString?.() || error || '');
      const stack = String(error?.stack || '');
      const fileName = String(error?.filename || error?.fileName || '');
      
      // Common extension error patterns
      const extensionPatterns = [
        // Chrome extension errors
        'chrome.runtime.sendMessage',
        'chrome-extension://',
        'Extension ID',
        'opfgelmcmbiajamepnmloijbpoleiama',
        'runtime.sendMessage',
        'Error in invocation of runtime.sendMessage',
        'Cannot access contents of the page',
        'Extension context invalidated',
        
        // MetaMask/Web3 extension errors
        'inpage.js',
        'contentscript.js',
        'MetaMask',
        '_metamask',
        'ethereum.request',
        'window.ethereum',
        
        // Generic extension patterns
        'moz-extension://',
        'safari-extension://',
        'ms-browser-extension://',
        
        // WalletConnect/RainbowKit extension-related errors
        'EIP-1193',
        'provider not found',
        'No Ethereum provider was found',
        'User rejected the request',
      ];
      
      return extensionPatterns.some(pattern => 
        message.toLowerCase().includes(pattern.toLowerCase()) ||
        stack.toLowerCase().includes(pattern.toLowerCase()) ||
        fileName.toLowerCase().includes(pattern.toLowerCase())
      );
    };

    // Store original methods
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;

    // Override console methods with smart filtering
    console.error = (...args) => {
      if (args.some(arg => isExtensionError(arg))) return;
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      if (args.some(arg => isExtensionError(arg))) return;
      originalWarn.apply(console, args);
    };

    console.log = (...args) => {
      if (args.some(arg => isExtensionError(arg))) return;
      originalLog.apply(console, args);
    };

    // Enhanced error event handlers
    const handleError = (event: ErrorEvent): boolean => {
      if (isExtensionError(event.error) || isExtensionError(event.message)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
      return true;
    };

    const handleRejection = (event: PromiseRejectionEvent): boolean => {
      if (isExtensionError(event.reason)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
      return true;
    };

    // Enhanced global error handler
    const handleGlobalError = (message: any, source?: string, lineno?: number, colno?: number, error?: Error) => {
      if (isExtensionError({ message, stack: error?.stack, filename: source })) {
        return true; // Prevent default error handling
      }
      return false;
    };

    // Add event listeners
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleRejection, true);
    window.onerror = handleGlobalError;

    // Cleanup function
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleRejection, true);
      window.onerror = null;
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
