# 📦 INVENTARIO DE COMPONENTES - Deeds3

**Última actualización:** 30/06/2025  
**Propósito:** Mapear todos los componentes y su estado de migración  

---

## 🎯 CLASIFICACIÓN POR RIESGO

### 🔴 **ALTO RIESGO - USAN WEB3 DIRECTAMENTE**
*Estos componentes requieren Web3 providers activos*

| Componente | Hooks Web3 Usados | Estado | Prioridad |
|------------|-------------------|--------|-----------|
| `components/SocialAuth.tsx` | useAccount, useDisconnect | ❌ Pendiente | 🔴 Critical |
| `components/SiweAuth.tsx` | useAccount, useSignMessage | ❌ Pendiente | 🔴 Critical |
| `pages/test-wallet.tsx` | useAccount | ❌ Pendiente | 🟡 Testing |
| `pages/test-auth.tsx` | useAccount, useDisconnect | ❌ Pendiente | 🟡 Testing |

### 🟡 **MEDIO RIESGO - USAN CONTEXT PERSONALIZADO**
*Dependen de StateContext pero no directamente de Web3*

| Componente | Dependencias | Estado | Notas |
|------------|-------------|--------|-------|
| `PageComponents/Components/Header.tsx` | useStateContext | ❌ Pendiente | Usa connectWallet, userBalance |
| `pages/index.tsx` | useStateContext | ❌ Pendiente | Usa getAllRealEstate |
| `PageComponents/Components/AdvancedWalletConnect.tsx` | Ninguna directa | ✅ Seguro | No usa hooks Web3 |

### 🟢 **BAJO RIESGO - COMPONENTES UI PUROS**
*Sin dependencias Web3, seguros para migrar primero*

| Componente | Tipo | Estado | Descripción |
|------------|------|--------|-------------|
| `components/ClientOnly.tsx` | Utility | ✅ Listo | Wrapper SSR-safe |
| `components/ui/*` | UI | ✅ Seguros | Componentes base |
| `components/ModernCarousels.tsx` | UI | ✅ Seguro | Solo UI/animaciones |

---

## 📁 ESTRUCTURA ACTUAL DEL PROYECTO

### **Components Directory**
```
components/
├── ClientOnly.tsx              🟢 Seguro
├── ModernCarousels.tsx         🟢 Seguro  
├── SiweAuth.tsx                🔴 Web3 (useAccount, useSignMessage)
├── SocialAuth.tsx              🔴 Web3 (useAccount, useDisconnect)
├── a11y/                       🟢 Seguros
├── layout/                     🟡 Revisar
├── mobile/                     🟡 Revisar
├── optimization/               🟢 Seguros
├── property/                   🟡 Revisar
├── testing/                    🟡 Revisar
├── ui/                         🟢 Seguros
├── validation/                 🟢 Seguros
└── web3/                       🔴 Web3
```

### **PageComponents Directory**
```
PageComponents/
├── Components/
│   ├── Header.tsx              🟡 useStateContext
│   ├── AdvancedWalletConnect   🟢 Seguro
│   ├── ProductSimple.tsx       🟢 Seguro
│   ├── SearchAndFilters*       🟢 Seguros
│   └── ...                     🟡 Revisar
├── AboutPage/                  🟡 Revisar
├── ActivityPage/               🟡 Revisar
├── AuthorPage/                 🟡 Revisar
├── BlogDetail/                 🟡 Revisar
├── BlogPage/                   🟡 Revisar
├── CollectionPage/             🟡 Revisar
├── ConnectPage/                🔴 Web3
├── ContactPage/                🟢 Seguro
├── CreatePage/                 🔴 Web3
├── CreatorPage/                🟡 Revisar
├── DetailPage/                 🟡 Revisar
├── EditProfilepage/            🔴 Web3
├── ExplorePage/                🟡 Revisar
├── ForgetPage/                 🟢 Seguro
├── FourmPage/                  🟡 Revisar
├── LoginPage/                  🔴 Web3
├── NewsPage/                   🟢 Seguro
├── PrivacyPage/                🟢 Seguro
├── ProductPAge/                🟡 Revisar
└── RankingPage/                🟡 Revisar
```

### **Pages Directory**
```
pages/
├── _app.tsx                    🟡 En migración
├── index.tsx                   🟡 useStateContext
├── test-wallet.tsx             🔴 Web3 (useAccount)
├── test-auth.tsx               🔴 Web3 (useAccount, useDisconnect)
└── api/                        🟢 Seguros
```

---

## 🛠️ PLAN DE MIGRACIÓN POR FASES

### **FASE 1: PREPARACIÓN** 
*Crear versiones mínimas para testing*

- [ ] Crear `_app-minimal.tsx` (sin StateContext)
- [ ] Crear `index-minimal.tsx` (página en blanco con mensaje)
- [ ] Verificar que carga sin errores
- [ ] Documentar configuración mínima funcional

### **FASE 2: COMPONENTES UI SEGUROS**
*Migrar componentes que no dependen de Web3*

- [ ] Migrar `components/ui/*`
- [ ] Migrar `components/layout/*` (versiones sin Web3)
- [ ] Crear Header básico (sin wallet)
- [ ] Crear Footer básico
- [ ] Implementar sistema de rutas

### **FASE 3: PÁGINAS ESTÁTICAS**
*Páginas que no requieren Web3*

- [ ] ContactPage
- [ ] AboutPage  
- [ ] PrivacyPage
- [ ] NewsPage
- [ ] Página 404 personalizada

### **FASE 4: WEB3 BÁSICO**
*Integración gradual de Web3*

- [ ] StateContext simplificado (sin hooks iniciales)
- [ ] Wagmi configuration
- [ ] Wallet connection básico
- [ ] Header con wallet connect

### **FASE 5: FUNCIONALIDAD COMPLETA**
*Restaurar toda la funcionalidad*

- [ ] Smart contract integration
- [ ] IPFS y Pinata
- [ ] Autenticación social
- [ ] Páginas complejas (Create, Edit, etc.)

---

## 🚨 COMPONENTES CRÍTICOS PARA REVISAR

### **Headers y Navigation**
- `PageComponents/Components/Header.tsx` - Usa wallet connection
- Necesita versión sin Web3 primero

### **Autenticación**
- `components/SocialAuth.tsx` - OAuth providers
- `components/SiweAuth.tsx` - Sign-In with Ethereum
- Requieren configuración completa de Web3

### **Páginas de Interacción**
- `CreatePage/` - Crear propiedades NFT
- `EditProfilepage/` - Editar perfil usuario
- `ConnectPage/` - Conectar wallet
- Todas requieren Web3 funcional

---

## 📋 CHECKLIST DE MIGRACIÓN

### **Por cada componente migrado:**
- [ ] ✅ Compilación sin errores TypeScript
- [ ] ✅ No imports de hooks Web3 no disponibles
- [ ] ✅ Funciona sin StateContext (si es UI puro)
- [ ] ✅ Responsive design mantenido
- [ ] ✅ Estilos Tailwind funcionando
- [ ] ✅ Props y interfaces correctas
- [ ] ✅ Testing básico funcionando

### **Validación por fase:**
- [ ] ✅ Aplicación arranca sin errores
- [ ] ✅ Hot reload funcionando
- [ ] ✅ No warnings de console críticos
- [ ] ✅ Navegación básica funcional
- [ ] ✅ Estilos aplicados correctamente

---

## 🔧 HERRAMIENTAS DE MIGRACIÓN

### **Scripts útiles para migración:**
```bash
# Buscar uso de hooks Web3
grep -r "useAccount\|useConnect\|useDisconnect" components/ pages/

# Buscar uso de StateContext
grep -r "useStateContext" components/ pages/

# Verificar imports problemáticos
grep -r "from \"wagmi\"" components/ pages/
```

### **Testing durante migración:**
```bash
# Build de prueba
pnpm build

# Type checking
pnpm type-check

# Lint check
pnpm lint
```

---

## 📊 MÉTRICAS DE PROGRESO

### **Componentes Totales:** ~50+
### **Estado Actual:**
- 🟢 **Seguros:** ~15 componentes
- 🟡 **Requieren revisión:** ~25 componentes  
- 🔴 **Web3 críticos:** ~10 componentes

### **Progreso por Fase:**
- **Fase 1:** 0/4 ✅
- **Fase 2:** 0/5 ✅
- **Fase 3:** 0/5 ✅
- **Fase 4:** 0/4 ✅
- **Fase 5:** 0/4 ✅

---

**💡 PRÓXIMA ACTUALIZACIÓN:** Después de completar Fase 1
