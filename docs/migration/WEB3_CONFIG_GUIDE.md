# 🌐 GUÍA DE CONFIGURACIÓN WEB3 - Deeds3

**Fecha:** 30/06/2025  
**Propósito:** Documentar la configuración correcta de Web3 para implementación gradual  

---

## 🎯 CONFIGURACIÓN ACTUAL FUNCIONAL

### **✅ Configuración Mínima que FUNCIONA**
```tsx
// _app.tsx - Configuración actual sin errores
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  </QueryClientProvider>
</WagmiProvider>
```

### **⚙️ Wagmi Config (lib/wagmi-config.ts)**
```typescript
export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    metaMask(),
    // Solo WalletConnect si tenemos project ID válido
    ...(projectId && projectId !== 'demo' ? [
      walletConnect({ 
        projectId,
        metadata: {
          name: "Deeds3 - Real Estate NFT",
          description: "Decentralized Real Estate Platform",
          url: getBaseUrl(),
          icons: [`${getBaseUrl()}/logo.png`]
        }
      })
    ] : []),
    coinbaseWallet({
      appName: "Deeds3",
      appLogoUrl: `${getBaseUrl()}/logo.png`
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  ssr: false,
  multiInjectedProviderDiscovery: false,
});
```

---

## 🚀 CONFIGURACIÓN OBJETIVO COMPLETA

### **🎯 Stack Completo para Fase 4-5**
```tsx
// _app.tsx - Configuración objetivo final
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <RainbowKitSiweNextAuthProvider>
        <RainbowKitProvider 
          theme={rainbowKitTheme} 
          initialChain={mainnet}
          showRecentTransactions={true}
          coolMode={false}
        >
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

### **📦 Dependencias Requeridas**
```json
{
  "@rainbow-me/rainbowkit": "^2.2.8",
  "@rainbow-me/rainbowkit-siwe-next-auth": "^0.5.0",
  "@tanstack/react-query": "^5.81.5",
  "next-auth": "^4.24.11",
  "siwe": "^3.0.0",
  "viem": "^2.31.4",
  "wagmi": "^2.15.6"
}
```

---

## 🔧 CONFIGURACIONES POR FASE

### **FASE 1: SIN WEB3** ✅ ACTUAL
```tsx
// Solo Next.js básico
<Component {...pageProps} />
```

### **FASE 2: WAGMI BÁSICO**
```tsx
// Agregar Wagmi + QueryClient únicamente
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
</WagmiProvider>
```

### **FASE 3: CONTEXT SIMPLIFICADO**
```tsx
// Agregar StateContext sin hooks Web3 iniciales
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  </QueryClientProvider>
</WagmiProvider>
```

### **FASE 4: RAINBOWKIT**
```tsx
// Agregar RainbowKit para UI de wallet
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider theme={rainbowKitTheme}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </RainbowKitProvider>
  </QueryClientProvider>
</WagmiProvider>
```

### **FASE 5: AUTENTICACIÓN COMPLETA**
```tsx
// Stack completo con NextAuth + SIWE
// (Configuración objetivo mostrada arriba)
```

---

## 🛠️ ARCHIVOS DE CONFIGURACIÓN

### **lib/wagmi-config.ts** ✅ FUNCIONANDO
- ✅ Chains configuradas (Mainnet, Polygon, Arbitrum)
- ✅ Connectors configurados (MetaMask, WalletConnect, Coinbase)
- ✅ Project ID de WalletConnect válido
- ✅ SSR deshabilitado correctamente

### **lib/rainbowkit-theme.ts** 📋 PENDIENTE
```typescript
// Configuración del tema personalizado para RainbowKit
import { Theme } from '@rainbow-me/rainbowkit';

export const rainbowKitTheme: Theme = {
  // Tema personalizado Encrypia Deeds3
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: '#0070f3', // Azul Encrypia
    accentColorForeground: '#ffffff',
    actionButtonBorder: 'rgba(255, 255, 255, 0.04)',
    // ... más configuración
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
  radii: {
    actionButton: '12px',
    connectButton: '12px',
    menuButton: '12px',
    modal: '16px',
    modalMobile: '16px',
  },
};
```

### **context/index.tsx** 🔄 EN REVISIÓN
**Problemas identificados:**
- ❌ Importaba hooks de Wagmi sin usar (CORREGIDO)
- ⚠️ Funciones de Web3 pueden fallar si no hay providers
- 📝 Necesita refactor para manejo graceful de errores

**Plan de refactor:**
1. **Fase 3:** Versión sin hooks Web3 iniciales
2. **Fase 4:** Agregar hooks cuando providers estén listos
3. **Fase 5:** Integración completa con smart contracts

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### **Error 1: WagmiProviderNotFoundError**
```
`useConfig` must be used within `WagmiProvider`
```
**Causa:** Hook de Wagmi ejecutándose antes del provider  
**Solución:** Asegurar orden correcto de providers

### **Error 2: WalletConnect doble inicialización**
```
WalletConnect Core is already initialized
```
**Causa:** React StrictMode o hot reload  
**Solución:** Deshabilitado en next.config.mjs

### **Error 3: Múltiples versiones de Lit**
```
Multiple versions of Lit loaded
```
**Causa:** Conflicto de dependencias  
**Solución:** Revisar node_modules y lock file

---

## 🔍 TESTING Y VALIDACIÓN

### **Comandos de Testing por Fase**
```bash
# Fase 1-2: Testing básico
pnpm dev
curl http://localhost:3000  # Debería retornar 200

# Fase 3: Testing de Context
# Verificar que useStateContext funciona

# Fase 4: Testing de Wallet
# Probar conexión de MetaMask

# Fase 5: Testing completo
# Probar autenticación social
```

### **Métricas de Éxito por Fase**
- **Fase 1:** ✅ App carga sin errores console
- **Fase 2:** ✅ Wagmi provider disponible
- **Fase 3:** ✅ StateContext funciona sin Web3
- **Fase 4:** ✅ Wallet connect UI funciona
- **Fase 5:** ✅ Sign-in completo funciona

---

## 📋 VARIABLES DE ENTORNO

### **Requeridas para Web3**
```bash
# WalletConnect (OBLIGATORIO para Fase 4+)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=3feff0a1fba248bcd18c26c02435db4d

# NextAuth (OBLIGATORIO para Fase 5)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-replace-in-production

# Opcionales para providers OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# Smart Contracts (Para funcionalidad completa)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_REAL_ESTATE_ADDRESS=your_real_estate_contract
```

### **Requeridas para IPFS**
```bash
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

---

## 🚀 ESTRATEGIA DE ROLLOUT

### **Desarrollo Local**
1. Implementar fase por fase
2. Testing en cada fase antes de continuar
3. Documentar problemas encontrados

### **Testing**
1. Build de producción en cada fase
2. Testing cross-browser
3. Testing mobile responsive

### **Producción**
1. Deploy incremental
2. Feature flags para funcionalidades Web3
3. Fallbacks para usuarios sin wallet

---

## 📊 ROADMAP DE IMPLEMENTACIÓN

### **Semana 1: Bases (Fases 1-2)**
- [ ] Configuración mínima estable
- [ ] Wagmi + QueryClient
- [ ] UI básico sin Web3

### **Semana 2: Context (Fase 3)**
- [ ] StateContext refactorizado
- [ ] Manejo de errores graceful
- [ ] Mock data funcional

### **Semana 3: Wallets (Fase 4)**
- [ ] RainbowKit integrado
- [ ] Conexión de wallets
- [ ] UI de wallet funcional

### **Semana 4: Completo (Fase 5)**
- [ ] Autenticación social
- [ ] Smart contracts
- [ ] Testing completo

---

**💡 RECORDATORIO:** Cada fase debe ser completamente funcional antes de pasar a la siguiente.
