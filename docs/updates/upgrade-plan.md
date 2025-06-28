# Plan de Actualización - Cliente Web Real Estate NFT

## Estado Actual del Proyecto

### Dependencias Actuales
- **Next.js**: 13.4.1 (Mayo 2023)
- **React**: 18.2.0 (Junio 2022)
- **React DOM**: 18.2.0
- **Ethers**: 5.7.2 (versión legacy)
- **Axios**: 1.4.0
- **ESLint**: 9.8.0 (versión muy nueva)
- **Otras**: react-hot-toast, react-countdown, web3modal

### Arquitectura Actual
- **Framework**: Next.js con Pages Router
- **Estilos**: CSS tradicional con Bootstrap y librerías jQuery
- **Estado**: Context API de React
- **Web3**: Ethers v5 + Web3Modal v1
- **Scripts**: Múltiples dependencias jQuery en el cliente

## Versiones Objetivo (Diciembre 2024)

### Dependencias Target
- **Next.js**: 15.1.x (App Router)
- **React**: 18.3.x
- **Tailwind CSS**: 3.4.x
- **Shadcn/ui**: Última versión estable
- **Ethers**: 6.x.x
- **TypeScript**: 5.x.x
- **Web3Modal**: 3.x.x

## Plan de Migración por Fases

### Fase 1: Preparación y Configuración Base (Semana 1-2)
**Objetivo**: Establecer bases sólidas sin romper funcionalidad existente

#### 1.1 Backup y Branch de Trabajo
- [ ] Crear branch `feature/modernization`
- [ ] Backup completo del proyecto actual
- [ ] Documentar estado funcional actual

#### 1.2 Configuración de TypeScript
- [ ] Instalar TypeScript y tipos
- [ ] Crear `tsconfig.json` progresivo
- [ ] Migrar archivos de configuración a TS
- [ ] Actualizar `next.config.mjs` a `next.config.ts`

#### 1.3 Preparación de Tailwind CSS
- [ ] Instalar Tailwind CSS
- [ ] Configurar PostCSS
- [ ] Crear estrategia de migración CSS gradual
- [ ] Mantener estilos existentes como fallback

**Comandos de instalación:**
```bash
pnpm add -D typescript @types/react @types/node
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @types/react-dom
```

### Fase 2: Actualización de Next.js Core (Semana 3-4)
**Objetivo**: Migrar a Next.js 15 manteniendo Pages Router inicialmente

#### 2.1 Actualización Incremental de Next.js
- [ ] Actualizar a Next.js 14.x.x primero
- [ ] Probar y validar funcionalidad
- [ ] Actualizar a Next.js 15.x.x
- [ ] Migrar `@next/font` a `next/font`

#### 2.2 Actualización de React
- [ ] Actualizar React a 18.3.x
- [ ] Migrar React DOM
- [ ] Actualizar tipos de React

#### 2.3 Modernización de Scripts
- [ ] Migrar scripts jQuery a módulos ES6
- [ ] Implementar carga dinámica de scripts
- [ ] Usar Next.js Script component

**Comandos de actualización:**
```bash
pnpm update next react react-dom
pnpm add next@latest react@latest react-dom@latest
```

### Fase 3: Integración de Shadcn/ui (Semana 5-6)
**Objetivo**: Introducir sistema de componentes moderno

#### 3.1 Configuración de Shadcn/ui
- [ ] Instalar y configurar shadcn/ui
- [ ] Configurar tema base
- [ ] Crear componentes de ejemplo

#### 3.2 Migración Gradual de Componentes
- [ ] Identificar componentes críticos para migrar
- [ ] Crear versiones Shadcn de componentes básicos
- [ ] Implementar sistema de componentes híbrido

**Comandos de instalación:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
```

### Fase 4: Modernización Web3 (Semana 7-8)
**Objetivo**: Actualizar stack Web3 a versiones modernas

#### 4.1 Actualización de Ethers
- [ ] Migrar de Ethers v5 a v6
- [ ] Actualizar sintaxis de conexión
- [ ] Probar funcionalidad de contratos

#### 4.2 Web3Modal v3
- [ ] Migrar a Web3Modal v3
- [ ] Actualizar lógica de conexión de wallets
- [ ] Implementar nuevas opciones de conectores

**Comandos de actualización:**
```bash
pnpm remove ethers web3modal
pnpm add ethers@^6 @web3modal/ethers5@^3
```

### Fase 5: Migración a App Router (Semana 9-12)
**Objetivo**: Migrar gradualmente a App Router de Next.js 15

#### 5.1 Configuración Paralela
- [ ] Crear estructura `app/` junto a `pages/`
- [ ] Migrar rutas simples primero
- [ ] Implementar layouts
- [ ] Migrar middleware si existe

#### 5.2 Migración de Páginas
- [ ] Migrar páginas estáticas primero
- [ ] Migrar páginas con datos dinámicos
- [ ] Actualizar sistema de navegación
- [ ] Migrar API routes

#### 5.3 Optimizaciones App Router
- [ ] Implementar Server Components donde aplique
- [ ] Optimizar loading states
- [ ] Implementar error boundaries

### Fase 6: Refinamiento y Optimización (Semana 13-14)
**Objetivo**: Pulir la aplicación y optimizar rendimiento

#### 6.1 Limpieza de Código Legacy
- [ ] Remover dependencias jQuery innecesarias
- [ ] Limpiar CSS no utilizado
- [ ] Optimizar bundle size

#### 6.2 Testing y Validación
- [ ] Pruebas de funcionalidad Web3
- [ ] Pruebas de responsividad
- [ ] Validación de rendimiento
- [ ] Testing en diferentes navegadores

#### 6.3 Documentación
- [ ] Documentar nuevos patrones
- [ ] Crear guías de desarrollo
- [ ] Actualizar README

## Estrategias de Mitigación de Riesgos

### 1. Migración Gradual
- Mantener ambos sistemas funcionando en paralelo
- Feature flags para alternar entre versiones
- Rollback rápido si hay problemas

### 2. Testing Continuo
- Pruebas automatizadas en cada fase
- Testing manual de funcionalidades críticas
- Validación de smart contracts

### 3. Backup de Seguridad
- Branches de respaldo en cada fase
- Snapshots del estado funcional
- Documentación de cambios

## Comandos de Migración por Fase

### Scripts de Preparación
```bash
# Backup del proyecto
git checkout -b feature/modernization
git push origin feature/modernization

# Instalación de dependencias base
pnpm add -D typescript @types/react @types/node @types/react-dom
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D eslint-config-next@latest
```

### Scripts de Actualización
```bash
# Actualización de Next.js y React
pnpm update next react react-dom
pnpm add @next/font@latest

# Instalación de Shadcn/ui
npx shadcn-ui@latest init
```

### Scripts de Web3
```bash
# Actualización de Web3
pnpm remove ethers web3modal
pnpm add ethers@^6 @web3modal/wagmi@^3
```

## Cronograma Estimado

| Fase | Duración | Descripción |
|------|----------|-------------|
| 1 | 2 semanas | Preparación y TypeScript |
| 2 | 2 semanas | Next.js 15 + React 18.3 |
| 3 | 2 semanas | Shadcn/ui + Tailwind |
| 4 | 2 semanas | Web3 Modernization |
| 5 | 4 semanas | App Router Migration |
| 6 | 2 semanas | Refinamiento |
| **Total** | **14 semanas** | **3.5 meses aprox** |

## Consideraciones Especiales

### Compatibilidad Web3
- Ethers v6 tiene cambios de breaking changes
- Web3Modal v3 require nueva configuración
- Testing exhaustivo de conexiones de wallet

### Rendimiento
- App Router puede mejorar significativamente el rendimiento
- Server Components reducen bundle size
- Lazy loading de componentes pesados

### SEO y Accesibilidad
- App Router mejora SSR y SEO
- Shadcn/ui incluye mejores prácticas de accesibilidad
- Optimización de Core Web Vitals

---

**Nota**: Este plan es progresivo y permite rollback en cualquier momento. Cada fase debe ser validada antes de continuar con la siguiente.
