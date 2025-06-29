import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Meta tag required by main.js for theme mode */}
        <meta name="theme-style-mode" content="1" />
        
        {/* Basic meta tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Encrypia Deeds3 - Revolutionary Web3 Real Estate Platform with blockchain-verified property ownership" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Deeds3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Deeds3" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Viewport with safe areas for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, user-scalable=yes, viewport-fit=cover" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* SEO and Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Encrypia Deeds3 - Web3 Real Estate Platform" />
        <meta property="og:description" content="Revolutionary blockchain-verified property ownership and tokenized real estate investments" />
        <meta property="og:site_name" content="Encrypia Deeds3" />
        <meta property="og:url" content="https://deeds3.encrypia.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Encrypia Deeds3" />
        <meta name="twitter:description" content="Web3 Real Estate Platform" />
        <meta name="twitter:image" content="/twitter-image.png" />
        
        {/* Critical CSS for performance */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .loading-screen { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #0f172a; display: flex; align-items: center; justify-content: center; z-index: 9999; }
            .loading-spinner { width: 40px; height: 40px; border: 3px solid #334155; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
            @keyframes spin { to { transform: rotate(360deg); } }
            @media (max-width: 768px) { 
              body { padding-bottom: env(safe-area-inset-bottom); }
              .mobile-optimized { padding-bottom: env(safe-area-inset-bottom); }
            }
          `
        }} />
        
        {/* CSS Vendor Files - Next.js will optimize these automatically */}
        {/* Note: These are kept for legacy vendor script compatibility */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/styles/accessibility.css" />
      </Head>
      <body>
        {/* Loading screen */}
        <div id="loading-screen" className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
        
        <Main />
        <NextScript />
        
        {/* Legacy JS files - loaded asynchronously for compatibility */}
        <Script src="/js/main.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
