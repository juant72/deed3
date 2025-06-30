# Guía de Uso de Componentes Base UI

Esta guía describe las mejores prácticas y ejemplos para implementar los componentes base del sistema de diseño Deed3.

## 1. Button
- Usa el componente para acciones primarias/secundarias.
- Props recomendadas: `type`, `aria-label`, `disabled`, `onClick`.
- Accesibilidad: Incluye `aria-label` descriptivo si el texto no es suficiente.
- Ejemplo:
```tsx
<Button type="submit" aria-label="Guardar cambios">Guardar</Button>
```

## 2. Input
- Usa para formularios y capturas de datos.
- Props recomendadas: `type`, `placeholder`, `aria-label`, `aria-describedby`, `required`.
- Accesibilidad: Relaciona con label y usa `aria-describedby` para mensajes de error.
- Ejemplo:
```tsx
<label htmlFor="email">Email</label>
<Input id="email" type="email" aria-label="Correo electrónico" required />
```

## 3. Card
- Usa para agrupar información o acciones relacionadas.
- Props recomendadas: `role="region"`, `aria-labelledby` para encabezados.
- Accesibilidad: Usa encabezados claros y roles semánticos.
- Ejemplo:
```tsx
<Card role="region" aria-labelledby="card-title">
  <h2 id="card-title">Resumen</h2>
  ...
</Card>
```

## Buenas prácticas generales
- Siempre provee etiquetas y descripciones accesibles.
- Usa los tokens de diseño para colores, tipografía y espaciado.
- Verifica contraste y foco visible.

---

Para detalles técnicos, consulta el archivo `design-system.md` y los ejemplos en `/client/components/ui/`.
