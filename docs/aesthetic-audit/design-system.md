# Sistema de Diseño Deed3 Platform
## Design System & Component Library - Julio 2025

**Versión:** 2.0  
**Última Actualización:** Julio 2025  
**Mantenedor:** Team UI/UX  

---

## 🎨 IDENTIDAD VISUAL CORE

### Logo & Marca

#### Logo Principal
```
Concepto: Geometría blockchain + arquitectura inmobiliaria
- Símbolo: Hexágono conectado (blockchain) + Casa estilizada
- Wordmark: "DEED3" con "3" destacado en color primario
- Variaciones: Horizontal, vertical, isotipo, monocromático
```

#### Uso del Logo
- **Mínimo:** 24px altura (digital), 0.5" (impreso)
- **Espaciado:** Área protegida = 2x altura del logo
- **Combinaciones:** Prohibir alteraciones, rotaciones, efectos

---

## 🎨 PALETA DE COLORES

### Colores Primarios
```css
/* Primary Brand Colors */
--deed3-primary-blue: #0066FF;      /* CTA principal, enlaces */
--deed3-primary-dark: #0052CC;      /* Hover states, dark mode */
--deed3-primary-light: #4285F4;     /* Backgrounds sutiles */

/* Secondary Colors */  
--deed3-gold: #FFB020;              /* Accentos premium, success */
--deed3-emerald: #10B981;           /* Success states, confirmations */
--deed3-coral: #FF6B6B;             /* Alerts, destructive actions */
```

### Colores Neutrales
```css
/* Gray Scale - Modern & Accessible */
--gray-900: #111827;    /* Texto principal */
--gray-800: #1F2937;    /* Texto secundario */
--gray-700: #374151;    /* Texto terciario */
--gray-600: #4B5563;    /* Placeholders */
--gray-500: #6B7280;    /* Disabled text */
--gray-400: #9CA3AF;    /* Borders, dividers */
--gray-300: #D1D5DB;    /* Light borders */
--gray-200: #E5E7EB;    /* Background subtle */
--gray-100: #F3F4F6;    /* Background cards */
--gray-50: #F9FAFB;     /* Page background */
```

### Colores Semánticos
```css
/* Semantic Colors */
--success: #10B981;     /* Transactions completed */
--warning: #F59E0B;     /* Pending states, cautions */
--error: #EF4444;       /* Errors, failed transactions */
--info: #3B82F6;        /* Information, neutral alerts */
```

### Modo Oscuro
```css
/* Dark Mode Palette */
--dark-bg-primary: #0D1117;      /* Page background */
--dark-bg-secondary: #161B22;    /* Card backgrounds */
--dark-bg-tertiary: #21262D;     /* Input backgrounds */
--dark-text-primary: #F0F6FC;    /* Primary text */
--dark-text-secondary: #8B949E;  /* Secondary text */
--dark-border: #30363D;          /* Borders, dividers */
```

---

## 📝 TIPOGRAFÍA

### Font Families
```css
/* Primary Font - UI Interface */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 
                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

/* Secondary Font - Display/Headlines */  
--font-display: 'Cal Sans', 'SF Pro Display', 'Inter', sans-serif;

/* Monospace - Code, Addresses */
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 
             'Roboto Mono', Consolas, monospace;
```

### Escala Tipográfica
```css
/* Display - Headlines, Heroes */
.text-display-xl  { font-size: 4.5rem; line-height: 1.1; }  /* 72px */
.text-display-lg  { font-size: 3.75rem; line-height: 1.1; } /* 60px */
.text-display-md  { font-size: 3rem; line-height: 1.2; }    /* 48px */
.text-display-sm  { font-size: 2.25rem; line-height: 1.3; } /* 36px */

/* Headers - Sections, Cards */
.text-h1 { font-size: 2rem; line-height: 1.3; }      /* 32px */
.text-h2 { font-size: 1.75rem; line-height: 1.4; }   /* 28px */
.text-h3 { font-size: 1.5rem; line-height: 1.4; }    /* 24px */
.text-h4 { font-size: 1.25rem; line-height: 1.4; }   /* 20px */

/* Body Text */
.text-lg { font-size: 1.125rem; line-height: 1.6; }  /* 18px */
.text-md { font-size: 1rem; line-height: 1.6; }      /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.5; }  /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1.4; }   /* 12px */
```

### Font Weights
```css
.font-light     { font-weight: 300; }  /* Texto sutil */
.font-normal    { font-weight: 400; }  /* Texto regular */
.font-medium    { font-weight: 500; }  /* Semi-emphasis */
.font-semibold  { font-weight: 600; }  /* Headings */
.font-bold      { font-weight: 700; }  /* Strong emphasis */
.font-extrabold { font-weight: 800; }  /* Display only */
```

---

## 📏 ESPACIADO Y LAYOUT

### Spacing Scale (8px base)
```css
/* Spacing System - 8px Grid */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Container Sizes
```css
/* Container Widths */
.container-sm  { max-width: 640px; }   /* Mobile landscape */
.container-md  { max-width: 768px; }   /* Tablet */
.container-lg  { max-width: 1024px; }  /* Desktop */
.container-xl  { max-width: 1280px; }  /* Large desktop */
.container-2xl { max-width: 1536px; }  /* Ultra wide */
```

### Grid System
```css
/* CSS Grid Layout */
.grid-12 { 
  display: grid; 
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Common Layouts */
.layout-sidebar { 
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-8);
}

.layout-cards-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-6);
}
```

---

## 🎯 COMPONENTES BASE

### Buttons
```css
/* Button Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  min-height: 44px; /* Touch target */
}

/* Button Sizes */
.btn-sm  { padding: 8px 16px; font-size: 14px; min-height: 36px; }
.btn-md  { padding: 12px 20px; font-size: 16px; min-height: 44px; }
.btn-lg  { padding: 16px 24px; font-size: 18px; min-height: 52px; }

/* Button Variants */
.btn-primary {
  background: var(--deed3-primary-blue);
  color: white;
}
.btn-primary:hover {
  background: var(--deed3-primary-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: var(--deed3-primary-blue);
  border: 2px solid var(--deed3-primary-blue);
}

.btn-ghost {
  background: transparent;
  color: var(--gray-700);
}
.btn-ghost:hover {
  background: var(--gray-100);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-property {
  position: relative;
  overflow: hidden;
}

.card-property::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--deed3-primary-blue), var(--deed3-gold));
}
```

### Inputs
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-300);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--deed3-primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.input:invalid {
  border-color: var(--error);
}

.input-group {
  position: relative;
}

.input-group .input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-500);
}
```

---

## 🎭 ICONOGRAFÍA

### Icon System
```
Librería Base: Heroicons v2.0 + Custom Web3/Real Estate icons
Tamaños: 16px, 20px, 24px, 32px, 48px
Estilo: Outline primary, Solid para emphasis
Stroke: 1.5px (outline), 2px (emphasis)
```

### Custom Icons Requeridos
```
Real Estate:
- property-house, property-apartment, property-commercial
- map-pin-house, virtual-tour, investment-chart
- mortgage-calculator, property-comparison

Web3:
- wallet-connect, metamask, coinbase-wallet
- blockchain-link, smart-contract, gas-fee
- ethereum-logo, polygon-logo, token-swap

UI Elements:
- filter-advanced, search-property, notification-bell
- user-verified, security-shield, analytics-dashboard
```

---

## 🎨 EFECTOS Y ANIMACIONES

### Shadows
```css
/* Elevation System */
.shadow-xs  { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
.shadow-sm  { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.shadow-md  { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.shadow-lg  { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
.shadow-xl  { box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1); }

/* Interactive Shadows */
.shadow-glow-primary {
  box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
}
```

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.glass-dark {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Transitions
```css
/* Standard Transitions */
.transition-fast   { transition: all 0.15s ease; }
.transition-normal { transition: all 0.2s ease; }
.transition-slow   { transition: all 0.3s ease; }

/* Spring Animations (Framer Motion) */
.spring-bounce {
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.spring-gentle {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm - Mobile landscape */ }
@media (min-width: 768px)  { /* md - Tablet */ }
@media (min-width: 1024px) { /* lg - Desktop */ }
@media (min-width: 1280px) { /* xl - Large desktop */ }
@media (min-width: 1536px) { /* 2xl - Ultra wide */ }

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .btn { min-height: 48px; } /* Larger touch targets */
  .card { padding: 20px; }   /* More spacing */
}
```

---

## ♿ ACCESIBILIDAD

### Contrast Ratios
```
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum  
- UI components: 3:1 minimum
- Focus indicators: 3:1 minimum
```

### Focus States
```css
.focus-ring {
  outline: 2px solid var(--deed3-primary-blue);
  outline-offset: 2px;
}

.focus-ring-inset {
  box-shadow: inset 0 0 0 2px var(--deed3-primary-blue);
}
```

### Screen Reader Support
```html
<!-- Labels obligatorios -->
<button aria-label="Connect wallet">Connect</button>
<input aria-describedby="error-message" />

<!-- Estado de carga -->
<div aria-live="polite" aria-busy="true">Loading...</div>
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Setup Base
- [ ] Instalar fuentes (Inter, Cal Sans, JetBrains Mono)
- [ ] Configurar CSS custom properties
- [ ] Implementar paleta de colores
- [ ] Setup sistema de espaciado

### Fase 2: Componentes Core  
- [ ] Button variants completos
- [ ] Input system con validación
- [ ] Card layouts responsivos
- [ ] Icon library integrada

### Fase 3: Patrones Avanzados
- [ ] Glassmorphism effects
- [ ] Micro-interactions
- [ ] Loading states
- [ ] Error handling UI

### Fase 4: Accesibilidad
- [ ] Focus management
- [ ] ARIA labels comprehensivos  
- [ ] Keyboard navigation
- [ ] Screen reader testing

---

**Próximo:** Ver `branding.md` para guidelines específicos de marca y `ux-ui-improvements.md` para patrones de navegación.
