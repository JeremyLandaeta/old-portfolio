# Assets pixel-art

## `about-scene-base.webp`

Imagen base de la escena decorativa de la sección **Sobre mí**
(`components/sections/PixelCampfireScene.tsx`).

Debe ser un **crop horizontal** de la ilustración pixel-art con:

- samurái / ronin sentado (izquierda)
- fogata (centro)
- suelo / plataforma pixel-circuito
- cristal / save point
- terminal CRT (derecha)

**No** incluir cards ni texto de la sección.

### Recomendaciones

- Formato: `.webp` (pixel-art se comprime muy bien).
- Proporción: aproximadamente **8:1 – 6:1** (banner ancho y bajo).
- Tamaño sugerido: ~1600×260 px (se renderiza con `object-fit: cover` y `image-rendering: pixelated`).
- Composición pensada para que la fogata quede cerca del **33% horizontal**
  y el terminal/cristal en el **lado derecho** (así calzan los overlays de glow).

Mientras el archivo no exista, el componente muestra un fallback oscuro y los
overlays animados siguen funcionando: el layout no se rompe.
