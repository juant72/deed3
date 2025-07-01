// Define interfaces for type safety in our lighthouse config
interface AssertionOptions {
    minScore?: number;
    maxLength?: number;
    maxNumericValue?: number;
}

interface Assertions {
    [key: string]: [string, AssertionOptions] | string;
}

interface LighthouseConfig {
    ci: {
        collect: {
            url: string[];
            startServerCommand: string;
            numberOfRuns: number;
            puppeteerScript: string;
            settings: {
                preset: string;
            };
        };
        upload: {
            target: string;
            outputDir: string;
        };
        assert: {
            preset: string;
            assertions: Assertions;
        };
    };
}

const config: LighthouseConfig = {
    ci: {
        collect: {
            // Static site, so don't need to start server
            url: ['http://localhost:3000'],
            startServerCommand: 'pnpm start',
            numberOfRuns: 3,
            puppeteerScript: './lighthouse/puppeteer-script.ts',
            settings: {
                preset: 'desktop',
            },
        },
        upload: {
            // Don't upload results
            target: 'filesystem',
            outputDir: './lighthouse/reports',
        },
        assert: {
            // Assertions to validate results
            preset: 'lighthouse:recommended',
            assertions: {
                'first-contentful-paint': ['error', { minScore: 0.8 }],
                'interactive': ['error', { minScore: 0.8 }],
                'max-potential-fid': ['error', { minScore: 0.8 }],
                'speed-index': ['error', { minScore: 0.8 }],
                'total-blocking-time': ['error', { minScore: 0.8 }],
                'largest-contentful-paint': ['error', { minScore: 0.8 }],
                'cumulative-layout-shift': ['error', { minScore: 0.8 }],
                'errors-in-console': 'off',
                'unused-javascript': 'off',
                'uses-webp-images': 'off',
                'uses-responsive-images': 'off',
                'uses-rel-preconnect': 'off',
                'uses-text-compression': 'off',
                'uses-optimized-images': 'off',
            },
        },
    },
};

export default config;
