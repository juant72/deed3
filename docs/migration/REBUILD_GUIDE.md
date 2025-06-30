# 🔄 GUÍA DE RECONSTRUCCIÓN GRADUAL - Deeds3

**Fecha:** 30 de Junio, 2025  
**Problema Original:** Errores de WagmiProvider y hooks de Web3 ejecutándose fuera de contexto  
**Estrategia:** Reconstrucción gradual desde base mínima funcional  

---

## 📋 ESTADO ACTUAL

### ✅ **LO QUE FUNCIONA**
- ✅ Next.js 15.3.4 arranca correctamente
- ✅ pnpm como gestor de paquetes
- ✅ TypeScript configurado
- ✅ Tailwind CSS funcionando
- ✅ PWA configurado (deshabilitado en dev)

### ❌ **PROBLEMAS IDENTIFICADOS**
- ❌ `WagmiProviderNotFoundError`: Hooks de Wagmi ejecutándose antes del proveedor
- ❌ Doble inicialización de WalletConnect Core
- ❌ Múltiples versiones de Lit cargadas
- ❌ Orden incorrecto de proveedores en `_app.tsx`

### 🔍 **ARCHIVOS PROBLEMÁTICOS IDENTIFICADOS**
- `context/index.tsx` - Importaba hooks de Wagmi sin usar (línea 5) ✅ CORREGIDO
- `_app.tsx` - Orden incorrecto de proveedores
- `components/SocialAuth.tsx` - Usa hooks de Wagmi
- `components/SiweAuth.tsx` - Usa hooks de Wagmi
- `pages/test-wallet.tsx` - Usa hooks de Wagmi
- `pages/test-auth.tsx` - Usa hooks de Wagmi

---

## 🎯 PLAN DE RECONSTRUCCIÓN

### **FASE 1: BASE MÍNIMA FUNCIONAL** 🟡 EN PROGRESO
**Objetivo:** Página en blanco funcional sin Web3
- [ ] Crear `_app-minimal.tsx`
- [ ] Crear `index-minimal.tsx`
- [ ] Verificar que carga sin errores
- [ ] Solo Next.js + React + Tailwind

### **FASE 2: ESTRUCTURA BÁSICA**
**Objetivo:** Layout y navegación sin funcionalidad Web3
- [ ] Header simple (sin wallet connect)
- [ ] Footer básico
- [ ] Sistema de rutas
- [ ] Componentes base UI

### **FASE 3: ESTILOS Y DISEÑO**
**Objetivo:** Look & feel profesional
- [ ] Sistema de colores Encrypia
- [ ] Componentes UI (buttons, cards, etc.)
- [ ] Responsive design
- [ ] Animaciones básicas

### **FASE 4: WEB3 GRADUAL**
**Objetivo:** Integración controlada de Web3
- [ ] Wagmi + QueryClient únicamente
- [ ] RainbowKit después
- [ ] Context simplificado (sin hooks iniciales)
- [ ] Wallet connect funcional

### **FASE 5: FUNCIONALIDAD COMPLETA**
**Objetivo:** Restaurar toda la funcionalidad
- [ ] Datos mock primero
- [ ] Smart contracts después
- [ ] IPFS y Pinata
- [ ] Autenticación social

---

## 📂 ESTRUCTURA DE ARCHIVOS BACKUP

### **Archivos Originales (Guardados como .backup)**
```
pages/
  _app.tsx.backup          # Configuración original problemática
  _app-broken.tsx          # Versión con errores identificados
  _app-complex.tsx         # Versión completa para referencia

context/
  index.tsx.backup         # Context original con hooks de Wagmi problemáticos
```

### **Archivos de Trabajo Actual**
```
pages/
  _app.tsx                 # Versión mínima funcional actual
  _app-minimal.tsx         # Versión ultra-mínima
  index-minimal.tsx        # Página principal mínima

docs/migration/
  REBUILD_GUIDE.md         # Este documento
  COMPONENTS_INVENTORY.md  # Inventario de componentes (a crear)
  WEB3_CONFIG_GUIDE.md     # Guía específica de Web3 (a crear)
```

---

## 🔧 CONFIGURACIONES IMPORTANTES

### **Variables de Entorno (.env.local)**
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=3feff0a1fba248bcd18c26c02435db4d
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-replace-in-production-with-random-string
NODE_ENV=development
```

### **Scripts de Package.json**
```json
{
  "dev": "next dev",
  "build": "next build", 
  "start": "next start",
  "type-check": "tsc --noEmit",
  "lint": "next lint"
}
```

### **Dependencias Críticas**
```json
{
  "next": "15.3.4",
  "react": "19.1.0",
  "wagmi": "^2.15.6",
  "@rainbow-me/rainbowkit": "^2.2.8",
  "@tanstack/react-query": "^5.81.5",
  "ethers": "^6.14.4"
}
```

---

## 🚨 ORDEN CORRECTO DE PROVEEDORES

### **✅ CORRECTO (Base mínima actual)**
```tsx
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  </QueryClientProvider>
</WagmiProvider>
```

### **🎯 OBJETIVO FINAL (Cuando agregemos todo)**
```tsx
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <RainbowKitSiweNextAuthProvider>
        <RainbowKitProvider theme={theme} initialChain={mainnet}>
          <StateContextProvider>
            <ClientOnly>
              <Component {...pageProps} />
            </ClientOnly>
          </StateContextProvider>
        </RainbowKitProvider>
      </RainbowKitSiweNextAuthProvider>
    </SessionProvider>
  </QueryClientProvider>
</WagmiProvider>
```

---

## 📝 COMPONENTES A MIGRAR GRADUALMENTE

### **🔴 PROBLEMÁTICOS (Usar Web3 - Migrar después)**
- `components/SocialAuth.tsx` - Hooks: useAccount, useDisconnect
- `components/SiweAuth.tsx` - Hooks: useAccount, useSignMessage  
- `pages/test-wallet.tsx` - Hooks: useAccount
- `pages/test-auth.tsx` - Hooks: useAccount, useDisconnect

### **🟢 SEGUROS (No usan Web3 - Migrar primero)**
- `components/ui/*` - Componentes UI básicos
- `PageComponents/Components/ProductSimple.tsx`
- `PageComponents/Components/SearchAndFiltersSimple.tsx`
- Layouts básicos

---

## 🏃‍♂️ PASOS SIGUIENTES INMEDIATOS

1. **✅ HECHO:** Identificar problema de orden de proveedores
2. **✅ HECHO:** Crear versión mínima funcional
3. **🟡 AHORA:** Documentar todo en esta guía
4. **⏭️ SIGUIENTE:** Crear `_app-minimal.tsx` y `index-minimal.tsx`
5. **⏭️ DESPUÉS:** Probar carga en blanco sin errores

---

## 🚀 COMANDOS ÚTILES

### **Desarrollo**
```bash
cd c:\Users\Juan\work\encrypia\labs\deed3\client
pnpm dev                    # Iniciar desarrollo
pnpm build                  # Build de producción
pnpm type-check            # Verificar TypeScript
```

### **Debugging**
```bash
# Matar procesos Node.js si se cuelga
taskkill /F /IM node.exe

# Limpiar cache
pnpm clean

# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml && pnpm install
```

---

## 📊 PROGRESO TRACKING

- [ ] **Fase 1:** Base mínima - 0/4 tareas
- [ ] **Fase 2:** Estructura - 0/4 tareas  
- [ ] **Fase 3:** Estilos - 0/4 tareas
- [ ] **Fase 4:** Web3 - 0/4 tareas
- [ ] **Fase 5:** Funcionalidad - 0/4 tareas

**Total:** 0/20 tareas completadas

---

## 🔄 HISTORIAL DE CAMBIOS

### **30/06/2025 - Sesión Inicial**
- ✅ Identificado problema de orden de proveedores
- ✅ Removida importación innecesaria de hooks Wagmi en context
- ✅ Creado _app.tsx mínimo funcional
- ✅ Aplicación carga sin errores de Wagmi
- ✅ Creada esta guía de migración

---

**💡 NOTA:** Este documento debe actualizarse después de cada cambio significativo para mantener el tracking del progreso.
