# Scripts de Migración Automatizada

## Script de Preparación Inicial

### 1. setup-migration.ps1
```powershell
# Script para Windows PowerShell
# Preparación inicial del proyecto para migración

Write-Host "🚀 Iniciando preparación para migración..." -ForegroundColor Green

# Verificar prerrequisitos
Write-Host "📋 Verificando prerrequisitos..." -ForegroundColor Yellow

# Verificar Node.js version
$nodeVersion = node --version
Write-Host "Node.js version: $nodeVersion"

if ([version]($nodeVersion -replace 'v', '') -lt [version]"18.17.0") {
    Write-Host "❌ Node.js 18.17+ requerido para Next.js 15" -ForegroundColor Red
    exit 1
}

# Verificar pnpm
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ pnpm no encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Crear backup branch
Write-Host "💾 Creando branch de respaldo..." -ForegroundColor Yellow
git checkout -b backup/pre-migration
git push origin backup/pre-migration

# Crear branch de trabajo
git checkout -b feature/modernization
git push origin feature/modernization

# Crear estructura de docs si no existe
if (!(Test-Path "docs")) {
    New-Item -ItemType Directory -Path "docs"
    New-Item -ItemType Directory -Path "docs/updates"
    New-Item -ItemType Directory -Path "docs/migration"
    New-Item -ItemType Directory -Path "docs/architecture"
    New-Item -ItemType Directory -Path "docs/planning"
}

Write-Host "✅ Preparación completada. Branch 'feature/modernization' creado." -ForegroundColor Green
```

### 2. phase1-typescript.ps1
```powershell
# Fase 1: Configuración de TypeScript
Write-Host "📝 Fase 1: Configurando TypeScript..." -ForegroundColor Green

# Instalar TypeScript y tipos
pnpm add -D typescript @types/react @types/node @types/react-dom

# Crear tsconfig.json básico
$tsconfigContent = @"
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@

$tsconfigContent | Out-File -FilePath "tsconfig.json" -Encoding UTF8

Write-Host "✅ TypeScript configurado. Puedes empezar a migrar archivos .js a .ts/.tsx" -ForegroundColor Green
```

### 3. phase2-nextjs.ps1
```powershell
# Fase 2: Actualización de Next.js
Write-Host "⚡ Fase 2: Actualizando Next.js y React..." -ForegroundColor Green

# Backup package.json
Copy-Item "package.json" "package.json.backup"

# Actualizar Next.js y React
Write-Host "📦 Actualizando dependencias principales..." -ForegroundColor Yellow
pnpm add next@latest react@latest react-dom@latest

# Actualizar @next/font a next/font
Write-Host "🔄 Actualizando imports de fonts..." -ForegroundColor Yellow

# Script para buscar y reemplazar imports de fonts
$files = Get-ChildItem -Recurse -Include "*.js", "*.jsx", "*.ts", "*.tsx" | Where-Object { $_.FullName -notmatch "node_modules" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace '@next/font', 'next/font'
    if ($content -ne $newContent) {
        $newContent | Set-Content $file.FullName
        Write-Host "Updated: $($file.Name)" -ForegroundColor Cyan
    }
}

# Verificar build
Write-Host "🏗️ Verificando build..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Fase 2 completada. Next.js actualizado exitosamente." -ForegroundColor Green
} else {
    Write-Host "❌ Error en build. Revisa los errores arriba." -ForegroundColor Red
    # Restaurar backup si hay errores
    Copy-Item "package.json.backup" "package.json"
    pnpm install
}
```

### 4. phase3-tailwind-shadcn.ps1
```powershell
# Fase 3: Instalación de Tailwind CSS y Shadcn/ui
Write-Host "🎨 Fase 3: Configurando Tailwind CSS y Shadcn/ui..." -ForegroundColor Green

# Instalar Tailwind CSS
Write-Host "📦 Instalando Tailwind CSS..." -ForegroundColor Yellow
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configurar Tailwind
$tailwindConfig = @"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './PageComponents/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Evitar conflictos con estilos existentes
  corePlugins: {
    preflight: false,
  },
}
"@

$tailwindConfig | Out-File -FilePath "tailwind.config.js" -Encoding UTF8

# Crear archivo CSS para Tailwind (sin eliminar estilos existentes)
$tailwindCss = @"
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Mantener imports existentes */
@import url("./assets/css/plugins/feature.css");
@import url("./assets/css/plugins/jquery-ui.min.css");
@import url("./assets/css/vendor/bootstrap.min.css");
@import url("./assets/css/vendor/nice-select.css");
@import url("./assets/css/vendor/odometer.css");
@import url("./assets/css/vendor/slick-theme.css");
@import url("./assets/css/vendor/slick.css");
@import url("./assets/css/style.css");
"@

# Backup del CSS actual
Copy-Item "styles/globals.css" "styles/globals.css.backup"
$tailwindCss | Out-File -FilePath "styles/tailwind.css" -Encoding UTF8

# Configurar Shadcn/ui
Write-Host "🎯 Configurando Shadcn/ui..." -ForegroundColor Yellow

# Crear components.json para shadcn
$componentsJson = @"
{
  "`$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "styles/tailwind.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
"@

$componentsJson | Out-File -FilePath "components.json" -Encoding UTF8

# Crear directorio de componentes
if (!(Test-Path "components")) {
    New-Item -ItemType Directory -Path "components"
    New-Item -ItemType Directory -Path "components/ui"
}

# Crear directorio lib
if (!(Test-Path "lib")) {
    New-Item -ItemType Directory -Path "lib"
}

# Crear utils básicos
$utilsContent = @"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
"@

$utilsContent | Out-File -FilePath "lib/utils.ts" -Encoding UTF8

# Instalar dependencias de shadcn
pnpm add class-variance-authority clsx tailwind-merge lucide-react

Write-Host "✅ Fase 3 completada. Tailwind CSS y Shadcn/ui configurados." -ForegroundColor Green
Write-Host "💡 Ahora puedes instalar componentes con: npx shadcn-ui@latest add button" -ForegroundColor Cyan
```

### 5. phase4-web3.ps1
```powershell
# Fase 4: Actualización del stack Web3
Write-Host "🔗 Fase 4: Actualizando stack Web3..." -ForegroundColor Green

Write-Host "⚠️  ATENCIÓN: Esta fase requiere testing manual extensivo de Web3" -ForegroundColor Red
Write-Host "Asegúrate de tener wallets de prueba y acceso a testnets" -ForegroundColor Yellow

# Backup del contexto actual
Copy-Item -Recurse "context" "context.backup"

# Actualizar Ethers a v6
Write-Host "📦 Actualizando Ethers a v6..." -ForegroundColor Yellow
pnpm remove ethers
pnpm add ethers@^6

# Actualizar Web3Modal
Write-Host "📦 Actualizando Web3Modal..." -ForegroundColor Yellow
pnpm remove web3modal
pnpm add @web3modal/ethers5@^3

Write-Host "🔧 Creando helpers de migración..." -ForegroundColor Yellow

# Crear helper para migración de Ethers
$ethersHelper = @"
// Helpers para migración de Ethers v5 a v6
// Usar estos helpers durante la migración gradual

import { ethers as ethersV6 } from 'ethers';

// Helper para mantener compatibilidad durante migración
export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethersV6.BrowserProvider(window.ethereum);
  }
  throw new Error('No Ethereum provider found');
};

export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

export const getContract = (address, abi, signerOrProvider) => {
  return new ethersV6.Contract(address, abi, signerOrProvider);
};

// Helper para conversión de BigNumber (v5) a BigInt (v6)
export const convertBigNumber = (value) => {
  if (typeof value === 'object' && value._isBigNumber) {
    return BigInt(value.toString());
  }
  return value;
};
"@

$ethersHelper | Out-File -FilePath "utils/ethers-v6-helpers.js" -Encoding UTF8

Write-Host "✅ Fase 4 preparada. Archivos de contexto respaldados." -ForegroundColor Green
Write-Host "🚨 SIGUIENTE: Migra manualmente el archivo context/index.js usando los helpers" -ForegroundColor Yellow
Write-Host "📋 Testing requerido: Conexión de wallets, contratos, transacciones" -ForegroundColor Cyan
```

## Scripts de Validación

### validate-phase.ps1
```powershell
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("1","2","3","4","5")]
    [string]$Phase
)

Write-Host "🔍 Validando Fase $Phase..." -ForegroundColor Green

switch ($Phase) {
    "1" {
        Write-Host "Validando TypeScript..." -ForegroundColor Yellow
        if (Test-Path "tsconfig.json") {
            Write-Host "✅ tsconfig.json existe" -ForegroundColor Green
        } else {
            Write-Host "❌ tsconfig.json falta" -ForegroundColor Red
        }
        
        # Verificar que TypeScript compila
        npx tsc --noEmit
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ TypeScript compila sin errores" -ForegroundColor Green
        }
    }
    "2" {
        Write-Host "Validando Next.js..." -ForegroundColor Yellow
        pnpm build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build exitoso" -ForegroundColor Green
        }
        
        # Verificar versión de Next.js
        $nextVersion = pnpm list next | Select-String "next@"
        Write-Host "Next.js version: $nextVersion" -ForegroundColor Cyan
    }
    "3" {
        Write-Host "Validando Tailwind CSS..." -ForegroundColor Yellow
        if (Test-Path "tailwind.config.js") {
            Write-Host "✅ Tailwind configurado" -ForegroundColor Green
        }
        
        if (Test-Path "components.json") {
            Write-Host "✅ Shadcn/ui configurado" -ForegroundColor Green
        }
        
        pnpm build
    }
    "4" {
        Write-Host "Validando Web3..." -ForegroundColor Yellow
        Write-Host "🚨 Requiere testing manual:" -ForegroundColor Red
        Write-Host "  - Conectar wallet" -ForegroundColor Yellow
        Write-Host "  - Verificar contratos" -ForegroundColor Yellow
        Write-Host "  - Probar transacciones" -ForegroundColor Yellow
    }
    "5" {
        Write-Host "Validando App Router..." -ForegroundColor Yellow
        if (Test-Path "app") {
            Write-Host "✅ Directorio app/ existe" -ForegroundColor Green
        }
        
        pnpm build
        pnpm start &
        Start-Sleep 5
        
        # Test basic routes
        try {
            $response = Invoke-WebRequest "http://localhost:3000" -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Página principal carga correctamente" -ForegroundColor Green
            }
        } catch {
            Write-Host "❌ Error cargando página principal" -ForegroundColor Red
        }
        
        Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "🏁 Validación de Fase $Phase completada" -ForegroundColor Green
```

## Script de Rollback de Emergencia

### emergency-rollback.ps1
```powershell
param(
    [Parameter(Mandatory=$true)]
    [string]$BackupCommit
)

Write-Host "🚨 ROLLBACK DE EMERGENCIA" -ForegroundColor Red
Write-Host "Volviendo a commit: $BackupCommit" -ForegroundColor Yellow

# Confirmar acción
$confirmation = Read-Host "¿Estás seguro? Esto eliminará cambios no commitados (y/n)"
if ($confirmation -ne 'y') {
    Write-Host "Operación cancelada" -ForegroundColor Yellow
    exit
}

# Rollback
git reset --hard $BackupCommit
git clean -fd

# Reinstalar dependencias
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
pnpm install

Write-Host "✅ Rollback completado" -ForegroundColor Green
Write-Host "🔧 Ejecuta 'pnpm dev' para verificar que todo funciona" -ForegroundColor Cyan
```

## Uso de los Scripts

### Orden de Ejecución:
```powershell
# 1. Preparación
.\setup-migration.ps1

# 2. Ejecutar fases en orden
.\phase1-typescript.ps1
.\validate-phase.ps1 -Phase "1"

.\phase2-nextjs.ps1
.\validate-phase.ps1 -Phase "2"

.\phase3-tailwind-shadcn.ps1
.\validate-phase.ps1 -Phase "3"

.\phase4-web3.ps1
.\validate-phase.ps1 -Phase "4"

# 5. App Router (manual + scripts personalizados)

# En caso de emergencia:
.\emergency-rollback.ps1 -BackupCommit "abc123"
```

**Nota**: Estos scripts están diseñados para Windows PowerShell. Para otros sistemas, adaptar la sintaxis correspondiente.
