import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Meta tag required by main.js for theme mode */}
        <meta name="theme-style-mode" content="1" />
        
        {/* Other meta tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Deeds3 - Real Estate NFT Marketplace" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* CSS Vendor Files - Next.js will optimize these automatically */}
        {/* Note: These are kept for legacy vendor script compatibility */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/vendor/bootstrap.min.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/vendor/slick.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/vendor/slick-theme.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/vendor/nice-select.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/plugins/feature.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/plugins/jquery-ui.min.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/vendor/sal.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/vendor/odometer.css" />
        
        {/* Main CSS */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/assets/css/style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
