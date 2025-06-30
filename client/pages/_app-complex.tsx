import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "../styles/tailwind.css";

// Simplified StateContext for development
import { StateContextProvider } from "../context";

interface MyAppProps extends AppProps {
  pageProps: {
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Encrypia Deeds3 - Real Estate Platform</title>
      </Head>
      
      {/* Minimal stable setup */}
      <StateContextProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </StateContextProvider>
    </>
  );
}
