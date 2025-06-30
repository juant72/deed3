/** @type {import('next').NextConfig} */

const nextConfig = {
    // React 19 + Next 15 best practices
    reactStrictMode: true,

    // Experimental features for Next 15
    experimental: {
        turbo: {
            // Enable Turbopack for faster builds
            rules: {},
        },
        // React 19 concurrent features
        ppr: false, // Partial prerendering
    },

    // Output configuration for better performance
    output: 'standalone',

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
