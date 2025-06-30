import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/tailwind.css";
import { wagmiConfig } from "../lib/wagmi-config";
import { StateContextProvider } from "../context";

interface MyAppProps extends AppProps {
  pageProps: {
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
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

      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <StateContextProvider>
            <Component {...pageProps} />
            <Toaster />
          </StateContextProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
