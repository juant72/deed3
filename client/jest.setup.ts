import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock for Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    asPath: '/',
    locale: 'en',
    query: {}
  }),
}));

// Mock for useTheme hook
jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  })
}));
