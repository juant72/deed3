/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const nextConfig = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        exclude: [/\.map$/, /manifest.json$/],
    },
});

export default nextConfig;
