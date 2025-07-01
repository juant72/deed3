# Fix: useCallback Hook Warning en Alert.tsx

## Problema
```
Warning: The 'closeAlert' function makes the dependencies of useEffect Hook (at line 65) change on every render. To fix this, wrap the definition of 'closeAlert' in its own useCallback() Hook.  react-hooks/exhaustive-deps
```

## Causa
La función `closeAlert` se estaba recreando en cada render del componente, causando que las dependencias del `useEffect` cambien constantemente. Esto puede llevar a:
- Re-ejecuciones innecesarias del effect
- Problemas de rendimiento
- Comportamiento impredecible

## Solución Aplicada

### 1. Importar useCallback
```tsx
import React, { useState, useEffect, useCallback } from 'react';
```

### 2. Envolver closeAlert en useCallback
```tsx
// Antes
const closeAlert = () => {
    setIsVisible(false);
    if (onClose) {
        setTimeout(() => {
            onClose();
        }, 300);
    }
};

// Después  
const closeAlert = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
        setTimeout(() => {
            onClose();
        }, 300);
    }
}, [onClose]);
```

## Beneficios

1. **Estabilidad de referencia**: `closeAlert` mantiene la misma referencia entre renders
2. **Optimización**: El `useEffect` solo se re-ejecuta cuando `duration` o `closeAlert` realmente cambien
3. **Mejor rendimiento**: Evita recreaciones innecesarias de la función
4. **Cumplimiento de ESLint**: Resuelve el warning de `react-hooks/exhaustive-deps`

## Verificación
- ✅ ESLint warning resuelto
- ✅ No hay warnings o errores en el proyecto
- ✅ Funcionalidad del componente mantenida
