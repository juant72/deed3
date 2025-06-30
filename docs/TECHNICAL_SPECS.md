# 🏗️ TECHNICAL SPECIFICATIONS - Encrypia Deeds3

## 📋 Architecture Overview

### Current State Analysis
```
ACTUAL STRUCTURE (Legacy):
/client
  /PageComponents    # Desorganizado, mezcla concerns
    /Components      # Algunos modernos, otros legacy
  /pages            # Next.js pages, inconsistente
  /styles           # CSS legacy + Tailwind
  /context          # State management básico
  /utils            # Utilities dispersos
```

### Target Architecture
```
NUEVA ESTRUCTURA (Modern):
/client
  /components       # Design system organizado
    /ui            # Primitivos (Button, Input, Card)
    /layout        # Layout components
    /property      # Property-specific
    /web3          # Blockchain components
    /mobile        # Mobile-optimized
  /lib             # Utilities centralizados
  /hooks           # Custom React hooks
  /types           # TypeScript definitions
  /styles          # Design tokens + CSS
  /tests           # Testing suite
```

---

## 🎨 Design System Specifications

### Color Tokens
```typescript
// /styles/tokens/colors.ts
export const colors = {
  brand: {
    encrypia: {
      50: '#f8fafc',
      900: '#0f172a',     // Primary Encrypia
      950: '#020617'
    },
    deeds3: {
      50: '#eff6ff',
      500: '#3b82f6',     // Primary Deeds3
      600: '#2563eb'
    }
  },
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4'
  },
  neutral: {
    // Complete gray scale 50-950
  }
}
```

### Typography Scale
```typescript
// /styles/tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter Variable', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    display: ['Cabinet Grotesk', 'Inter Variable', 'sans-serif']
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }]
  }
}
```

### Spacing System
```typescript
// /styles/tokens/spacing.ts - 8px grid system
export const spacing = {
  0: '0px',
  1: '4px',    // 0.25rem
  2: '8px',    // 0.5rem  - Base unit
  3: '12px',   // 0.75rem
  4: '16px',   // 1rem
  6: '24px',   // 1.5rem
  8: '32px',   // 2rem
  12: '48px',  // 3rem
  16: '64px',  // 4rem
  20: '80px',  // 5rem
  24: '96px'   // 6rem
}
```

---

## 🧩 Component Specifications

### Base UI Components

#### Button Component
```typescript
// /components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  onClick,
  className
}) => {
  // Implementation with variants and states
}
```

#### Input Component
```typescript
// /components/ui/Input.tsx
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  className?: string
}
```

#### Card Component
```typescript
// /components/ui/Card.tsx
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined'
  padding: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}
```

### Property Components

#### PropertyCard3D
```typescript
// /components/property/PropertyCard3D.tsx
interface PropertyData {
  id: string
  title: string
  location: string
  price: number
  tokenPrice: number
  images: string[]
  yield: number
  liquidity: number
  verified: boolean
  onChain: boolean
}

interface PropertyCard3DProps {
  property: PropertyData
  variant: 'grid' | 'list' | 'featured'
  showMetrics?: boolean
  onSelect?: (property: PropertyData) => void
}
```

#### PropertyMetrics
```typescript
// /components/property/PropertyMetrics.tsx
interface PropertyMetrics {
  tokenPrice: number
  marketCap: number
  yield: number
  apy: number
  liquidity: number
  volume24h: number
  holders: number
  riskScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}
```

### Web3 Components

#### WalletConnect
```typescript
// /components/web3/WalletConnect.tsx
interface WalletState {
  connected: boolean
  address?: string
  balance?: string
  network?: {
    id: number
    name: string
    color: string
  }
  isConnecting: boolean
  error?: string
}
```

#### TransactionFlow
```typescript
// /components/web3/TransactionFlow.tsx
interface TransactionStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'current' | 'completed' | 'error'
  gasEstimate?: string
  txHash?: string
}

interface TransactionFlowProps {
  steps: TransactionStep[]
  currentStep: string
  onComplete?: (txHash: string) => void
  onError?: (error: Error) => void
}
```

---

## 📱 Responsive Design System

### Breakpoint Strategy
```typescript
// /styles/tokens/breakpoints.ts
export const breakpoints = {
  mobile: '0px',        // 0-767px
  tablet: '768px',      // 768-1023px  
  desktop: '1024px',    // 1024-1439px
  wide: '1440px'        // 1440px+
}

// Usage in components
const useBreakpoint = () => {
  // Custom hook implementation
}
```

### Mobile-First Component Variations
```typescript
// Example: PropertyCard responsive behavior
interface ResponsiveProps {
  mobile: {
    columns: 1,
    showMetrics: false,
    imageHeight: '200px'
  },
  tablet: {
    columns: 2,
    showMetrics: true,
    imageHeight: '240px'
  },
  desktop: {
    columns: 3,
    showMetrics: true,
    imageHeight: '280px'
  }
}
```

---

## 🔗 Web3 Integration Specifications

### Wallet Connection Architecture
```typescript
// /lib/web3/wagmi-config.ts
import { createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, base } from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http()
  }
})
```

### Multi-Chain Support
```typescript
// /lib/web3/chains.ts
interface ChainConfig {
  id: number
  name: string
  color: string
  explorer: string
  features: string[]
}

export const supportedChains: Record<number, ChainConfig> = {
  1: {
    id: 1,
    name: 'Ethereum',
    color: '#627eea',
    explorer: 'https://etherscan.io',
    features: ['defi', 'nfts', 'staking']
  },
  137: {
    id: 137, 
    name: 'Polygon',
    color: '#8247e5',
    explorer: 'https://polygonscan.com',
    features: ['low-fees', 'fast', 'scaling']
  }
}
```

### Transaction States
```typescript
// /types/web3.ts
export type TransactionStatus = 
  | 'idle'
  | 'preparing'
  | 'signing'
  | 'pending'
  | 'confirmed'
  | 'failed'

export interface TransactionState {
  status: TransactionStatus
  hash?: string
  gasUsed?: string
  gasPrice?: string
  error?: string
  confirmations?: number
}
```

---

## 🎯 Performance Specifications

### Core Web Vitals Targets
```typescript
// Performance budgets
export const performanceTargets = {
  LCP: 2500,        // Largest Contentful Paint < 2.5s
  FID: 100,         // First Input Delay < 100ms
  CLS: 0.1,         // Cumulative Layout Shift < 0.1
  TTFB: 800,        // Time to First Byte < 800ms
  TTI: 3500         // Time to Interactive < 3.5s
}
```

### Bundle Size Strategy
```typescript
// Code splitting configuration
export const bundleStrategy = {
  initialBundle: '<500KB',     // Critical path
  pageChunks: '<200KB',        // Per-page chunks
  vendorChunks: '<300KB',      // Third-party libraries
  asyncComponents: 'lazy',     // Dynamic imports
  imageOptimization: 'webp'    // Modern formats
}
```

### Animation Performance
```typescript
// GPU-accelerated animations only
export const animationRules = {
  properties: ['transform', 'opacity'],  // Only GPU-accelerated
  duration: {
    micro: '150ms',      // Button hover
    short: '300ms',      // Modal open
    medium: '500ms',     // Page transition
    long: '800ms'        // Complex animations
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
  }
}
```

---

## 🧪 Testing Strategy

### Unit Testing
```typescript
// /tests/setup.ts
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'

// Mock service worker for API calls
export const server = setupServer()

// Test utilities
export const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <WagmiProvider>
      <QueryClientProvider>
        {component}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### Component Testing Template
```typescript
// Example: Button.test.tsx
describe('Button Component', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600')
  })

  it('handles loading state correctly', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
```

### E2E Testing (Playwright)
```typescript
// /tests/e2e/property-flow.spec.ts
import { test, expect } from '@playwright/test'

test('user can view property details', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="property-card-1"]')
  await expect(page.locator('[data-testid="property-title"]')).toBeVisible()
  await expect(page.locator('[data-testid="property-metrics"]')).toBeVisible()
})
```

---

## 🔧 Development Workflow

### Git Branch Strategy
```
main                 # Production-ready code
develop             # Integration branch
feature/TASK-###    # Feature branches
hotfix/TASK-###     # Emergency fixes
release/v1.x.x      # Release preparation
```

### Code Quality Gates
```typescript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-return-types': 'warn',
    'react-hooks/exhaustive-deps': 'error'
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: pnpm install
      - name: Run tests
        run: pnpm test
      - name: Check types
        run: pnpm type-check
      - name: Lint code
        run: pnpm lint
      - name: Build project
        run: pnpm build
```

---

**Documento preparado por:** Arquitecto de Software Encrypia  
**Fecha:** Junio 29, 2025  
**Versión:** 1.0  
**Próxima revisión:** Cada sprint review
