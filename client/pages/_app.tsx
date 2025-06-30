import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import "../styles/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Encrypia Deeds3 - Cargando...</title>
            </Head>

            <Component {...pageProps} />
        </>
    );
}
