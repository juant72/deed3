// Design Tokens - Encrypia Deeds3
// Modern Web3 Real Estate Platform

export const designTokens = {
  // BRAND COLORS
  colors: {
    brand: {
      // Encrypia Primary Brand
      encrypia: {
        50: '#f8fafc',
        100: '#f1f5f9', 
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',  // Primary Encrypia Brand
        950: '#020617'
      },
      
      // Deeds3 Product Brand  
      deeds3: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe', 
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',  // Primary Deeds3 Blue
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554'
      },

      // Accent Colors
      accent: {
        emerald: '#10b981',    // Success/Growth
        amber: '#f59e0b',      // Warning/Attention  
        red: '#ef4444',        // Error/Danger
        cyan: '#06b6d4'        // Info/Highlight
      }
    },

    // SEMANTIC COLORS
    semantic: {
      success: {
        light: '#dcfce7',
        DEFAULT: '#22c55e',
        dark: '#166534'
      },
      warning: {
        light: '#fef3c7', 
        DEFAULT: '#f59e0b',
        dark: '#92400e'
      },
      error: {
        light: '#fecaca',
        DEFAULT: '#ef4444', 
        dark: '#991b1b'
      },
      info: {
        light: '#cffafe',
        DEFAULT: '#06b6d4',
        dark: '#155e75'
      }
    },

    // NEUTRAL SCALE
    neutral: {
      0: '#ffffff',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0', 
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },

  // TYPOGRAPHY SYSTEM
  typography: {
    fontFamily: {
      sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      display: ['Cabinet Grotesk', 'Inter Variable', 'sans-serif']
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],  // 14px  
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],           // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],        // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],         // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],   // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],   // 36px
      '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }],           // 48px
      '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],        // 60px
      '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }]          // 72px
    },
    
    fontWeight: {
      thin: 100,
      extralight: 200, 
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    }
  },

  // SPACING SYSTEM (8px grid)
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '2px',   // 0.125rem
    1: '4px',     // 0.25rem
    1.5: '6px',   // 0.375rem
    2: '8px',     // 0.5rem  - Base unit
    2.5: '10px',  // 0.625rem
    3: '12px',    // 0.75rem
    3.5: '14px',  // 0.875rem
    4: '16px',    // 1rem
    5: '20px',    // 1.25rem
    6: '24px',    // 1.5rem
    7: '28px',    // 1.75rem
    8: '32px',    // 2rem
    9: '36px',    // 2.25rem
    10: '40px',   // 2.5rem
    11: '44px',   // 2.75rem
    12: '48px',   // 3rem
    14: '56px',   // 3.5rem
    16: '64px',   // 4rem
    20: '80px',   // 5rem
    24: '96px',   // 6rem
    28: '112px',  // 7rem
    32: '128px',  // 8rem
    36: '144px',  // 9rem
    40: '160px',  // 10rem
    44: '176px',  // 11rem
    48: '192px',  // 12rem
    52: '208px',  // 13rem
    56: '224px',  // 14rem
    60: '240px',  // 15rem
    64: '256px',  // 16rem
    72: '288px',  // 18rem
    80: '320px',  // 20rem
    96: '384px'   // 24rem
  },

  // BORDER RADIUS SYSTEM
  borderRadius: {
    none: '0px',
    sm: '2px',
    DEFAULT: '4px',
    md: '6px', 
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px'
  },

  // SHADOW SYSTEM
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',

    // Web3 Specific Shadows
    glow: '0 0 20px rgb(59 130 246 / 0.5)',
    'glow-emerald': '0 0 20px rgb(16 185 129 / 0.5)',
    'glow-amber': '0 0 20px rgb(245 158 11 / 0.5)'
  },

  // ANIMATION SYSTEM
  animation: {
    duration: {
      micro: '150ms',    // Button hover, small transitions
      short: '300ms',    // Modal open, dropdown
      medium: '500ms',   // Page transitions
      long: '800ms'      // Complex animations
    },
    
    easing: {
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out', 
      'ease-in-out': 'ease-in-out',
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      'swift': 'cubic-bezier(0.4, 0.0, 0.6, 1)'
    }
  },

  // BREAKPOINTS
  screens: {
    xs: '475px',
    sm: '640px', 
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Export individual token groups for easier usage
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const boxShadow = designTokens.boxShadow;
export const animation = designTokens.animation;
export const screens = designTokens.screens;

// Default export
export default designTokens;
