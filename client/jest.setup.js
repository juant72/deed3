import '@testing-library/jest-dom';

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
jest.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  })
}));

// Mock for useAuth hook
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', name: 'Test User' },
    isLoading: false,
    error: null,
    login: jest.fn(),
    logout: jest.fn(),
  })
}));

// Mock for matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress React 18 warnings
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
