import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script";
import "../styles/tailwind.css";

import { StateContextProvider } from "../context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <StateContextProvider>
        <Component {...pageProps} />
        <Toaster />
      </StateContextProvider>

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
      <Script src="/js/vendor/maralis.js" strategy="lazyOnload" />
      <Script src="/js/vendor/nft.js" strategy="lazyOnload" />
    </>
  );
}
