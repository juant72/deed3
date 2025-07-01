# Informe de Mejoras de Accesibilidad (A11y)

Este documento resume las mejoras de accesibilidad implementadas en la plataforma Deed3 como parte de la modernización de la interfaz de usuario.

## 1. Fundamentos de Accesibilidad (Sprint 1 y 2)

Se ha realizado una auditoría y validación completa de los componentes base de la aplicación para asegurar que cumplen con los estándares de la WCAG 2.1.

- **Semántica HTML:** Uso correcto de etiquetas HTML5 (`<nav>`, `<main>`, `<header>`, `<footer>`, etc.) para una estructura de página clara y comprensible para lectores de pantalla.
- **Roles y Atributos ARIA:** Se han añadido atributos ARIA (`role`, `aria-label`, `aria-modal`, etc.) donde ha sido necesario para mejorar la experiencia de usuarios con tecnologías de asistencia. Por ejemplo, en los modales y botones sin texto visible.
- **Etiquetas Accesibles:** Todos los controles de formulario (`input`, `select`, etc.) están asociados a una etiqueta (`<label>`) para una correcta descripción.
- **Navegación por Teclado Básica:** Se ha asegurado que todos los elementos interactivos son accesibles y operables mediante el teclado, con un indicador de foco visible y claro.

## 2. Mejoras Avanzadas de Accesibilidad (Sprint 2)

### 2.1. Gestión Avanzada del Foco (Focus Trap)

Para componentes que superponen contenido, como los **modales**, se ha implementado un "focus trap".

- **Funcionalidad:** Cuando un modal está abierto, el foco del teclado queda confinado dentro del modal. El usuario no puede interactuar accidentalmente con el contenido de la página principal que se encuentra detrás.
- **Navegación:** La tecla `Tab` (y `Shift + Tab`) cicla a través de los elementos enfocables solo dentro del modal.
- **Cierre:** La tecla `Escape` cierra el modal y devuelve el foco al elemento que lo abrió originalmente.

### 2.2. Temas y Contraste

La plataforma ahora ofrece un sistema de temas robusto gestionado por el hook `useTheme`.

- **Modo Oscuro:** Se ha implementado un modo oscuro con un alto ratio de contraste (21:1 para texto y fondo principal), superando el nivel AAA de las directrices WCAG. Esto asegura una legibilidad excelente en condiciones de poca luz.
- **Modo de Alto Contraste:** El sistema de temas incluye una opción de "Alto Contraste" que puede ser activada por el usuario. Esta opción ajusta la paleta de colores para maximizar la legibilidad.
- **Preferencia del Sistema:** La aplicación respeta la preferencia de tema (claro/oscuro) del sistema operativo del usuario por defecto.

### 2.3. Movimiento Reducido

Para usuarios sensibles al movimiento, la aplicación respeta la configuración de "movimiento reducido" del sistema operativo.

- **Funcionalidad:** Cuando está activada, se desactivan o reducen las animaciones y transiciones no esenciales en toda la interfaz, como fundidos, deslizamientos y otras animaciones complejas.

## 3. Próximos Pasos

- **Dropdowns y Menús:** Aplicar la gestión avanzada del foco a los menús desplegables complejos.
- **Pruebas con Usuarios:** Realizar pruebas con usuarios reales que dependen de tecnologías de asistencia para validar la efectividad de las mejoras implementadas.
- **Documentación Continua:** Mantener esta documentación actualizada a medida que se desarrollen nuevos componentes.
