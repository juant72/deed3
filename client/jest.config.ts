
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
        '^@/context/(.*)$': '<rootDir>/context/$1',
        '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
        // Handle CSS imports
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        // Handle image imports
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
        '^.+\.(ts|tsx)$': 'ts-jest',
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
