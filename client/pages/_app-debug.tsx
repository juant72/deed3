import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/tailwind.css";

// Emergency minimal _app.tsx to debug the blue screen
export default function App({ Component, pageProps }: AppProps) {
  console.log("🚀 App component rendering...");
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Encrypia Deeds3 - Debug Mode</title>
      </Head>
      
      {/* Ultra minimal setup - no providers, just the component */}
      <div className="min-h-screen bg-red-500 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">🔧 DEBUG MODE</h1>
        <p className="mb-4">Si ves esto, el _app.tsx funciona</p>
        <div className="bg-black/20 p-4 rounded">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
