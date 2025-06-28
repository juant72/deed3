# Scripts Útiles - Deeds3

## Comandos de Desarrollo

### Iniciar Servidor de Desarrollo
```bash
cd client && pnpm run dev
```
**URL**: http://localhost:3000

### Build de Producción
```bash
cd client && pnpm run build
```

### Testing de Autenticación
**URL de test**: http://localhost:3000/test-auth

### Limpiar Cache y Reinstalar
```bash
cd client
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

## URLs Importantes

- **App principal**: http://localhost:3000
- **Testing auth**: http://localhost:3000/test-auth
- **NextAuth API**: http://localhost:3000/api/auth

## Estados de Autenticación

### Wallet Only (Funcional)
- Conectar wallet via RainbowKit
- Estado: `isWalletConnected: true`
- Uso: `const { isWalletConnected } = useAuth()`

### Social Login (Requiere OAuth)
- Descomentar credenciales en `.env.local`
- Reiniciar servidor
- Probar botones sociales

### SIWE (Componente Listo)
- Componente: `<SiweAuth />`
- Requiere wallet conectado
- Backend configurado

## Debugging

### Ver Estado de Auth
```javascript
// En cualquier componente
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const auth = useAuth();
  console.log('Auth state:', auth);
  return <div>{JSON.stringify(auth, null, 2)}</div>;
};
```

### NextAuth Session
```javascript
// En cualquier componente
import { useSession } from 'next-auth/react';

const MyComponent = () => {
  const { data: session } = useSession();
  console.log('Session:', session);
  return <div>{JSON.stringify(session, null, 2)}</div>;
};
```

## Estructura de Archivos Clave

```
client/
├── components/SocialAuth.jsx    # UI de autenticación completa
├── components/SiweAuth.jsx      # SIWE component listo
├── hooks/useAuth.js             # Hook de estado unificado
├── lib/wagmi-config.js          # Configuración Web3
├── pages/test-auth.js           # Página de testing
├── pages/api/auth/[...nextauth].js # Backend auth
└── .env.local                   # Variables de entorno
```

## Variables de Entorno Importantes

```bash
# Requeridas para funcionalidad básica
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=2f5b4a0a8f8c4f6e8e2d1c3b4a5f6d7e
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-replace-in-production-with-random-string

# Opcionales para social login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Troubleshooting

### Error: "Module not found"
```bash
cd client && pnpm install
```

### Error de Build
```bash
cd client
rm -rf .next
pnpm run build
```

### Warnings de WalletConnect
- Son normales en desarrollo
- No afectan funcionalidad
- Se resuelven con ID real en producción

### Error de TypeScript
- Configuración mixta JS/TS activa
- Permitir JS en proyecto TS está habilitado
- Ver `tsconfig.json` para configuración
