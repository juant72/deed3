# Checklist de Implementación Fase 1 (Sprint 1)

## Design System & Branding
- [x] Definir tokens de diseño (colores, tipografía, espaciado)
- [x] Ampliar tokens: paleta extendida, tipografía responsiva, espaciados, radios y sombras
- [x] Crear componentes base: Button, Input, Card
- [x] Documentar guidelines de uso

## Accesibilidad
- [x] Contraste adecuado en componentes base
- [x] Navegación por teclado y focus visible
- [x] Añadir roles y atributos ARIA donde aplique
- [x] Validar con testing automatizado/manual
  - Se utilizó axe y Lighthouse para validar los componentes base (`Button`, `Input`, `Card`).
  - Resultado: Sin errores críticos de accesibilidad. Se recomienda mantener validaciones continuas en nuevos componentes.

## Mobile-First
- [x] Componentes base responsive
- [x] Revisar breakpoints y layout global
  - Breakpoints documentados y auditados: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
  - Layout global usa Tailwind y grid 8px, mobile-first.
  - Recomendación: limpiar estilos legacy y asegurar uso de utilidades Tailwind en layouts principales.
- [x] Preparar estructura para PWA
  - `manifest.json` revisado y completo en `/public`.
  - Service worker básico creado en `/public/service-worker.js`.
  - Configuración base de next-pwa documentada en `next.config.pwa.mjs`.
  - Siguiente paso: instalar dependencia `next-pwa` y testear en entorno real.

## Migración de Componentes Core
- [x] Identificar componentes a migrar
  - Header/NavBar (navegación principal)
  - Footer
  - Card de propiedad/inmueble
  - Modal/Dialog
  - Formulario de login/autenticación
  - Listado de propiedades (PropertyList)
  - Loader/Spinner
- [x] Migrar Header/NavBar al nuevo sistema de diseño
- [x] Migrar Footer
- [x] Migrar Card de propiedad/inmueble
- [x] Migrar Modal/Dialog
- [x] Migrar Formulario de login/autenticación
- [ ] Migrar Listado de propiedades (PropertyList)
- [ ] Migrar Loader/Spinner

---

_Actualizar este checklist conforme avance el sprint._

**Última actualización:** 30/06/2025

**Notas:**
- Formulario de login migrado e integrado.
- Siguiente paso: migrar Listado de propiedades (PropertyList) al nuevo sistema de diseño.
