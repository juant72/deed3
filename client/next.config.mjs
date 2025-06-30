/** @type {import('next').NextConfig} */

const nextConfig = {
    // React 19 + Next 15 best practices
    reactStrictMode: true,

    // Turbopack config (Next.js 15+)
    turbopack: {
        enabled: true,
        rules: {},
    },
    // React 19 concurrent features
    experimental: {
        ppr: false, // Partial prerendering
    },

    // Output configuration for better performance
    // output: 'standalone',

    // Disable unnecessary features for minimal setup
    poweredByHeader: false,

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // TypeScript configuration
    typescript: {
        // Enable type checking in production builds
        ignoreBuildErrors: false,
    },

    // ESLint configuration
    eslint: {
        // Enable ESLint during builds
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
