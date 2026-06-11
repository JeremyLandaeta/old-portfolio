# Revisión del portafolio + checklist de deploy en Vercel

> Generado el 2026-06-10. Estado del repo: rama `main`, sin commits (todo staged).
> Build de producción: **`next build` pasa limpio (exit 0)**, Next.js 16.2.7 (Turbopack).

## ✅ Estado: correcciones aplicadas (2026-06-10)

Se aplicaron **todas** las correcciones salvo la migración estructural de i18n (#1),
que se dejó fuera a propósito (ver nota en ese punto). `pnpm lint` y `pnpm build`
quedan **limpios** (0 errores, 0 warnings).

| Item | Estado |
|------|--------|
| #2 `notFound()` para slugs inexistentes | ✅ hecho |
| #3 `:focus-visible` global | ✅ hecho |
| #4 reduced-motion en partículas (frame estático, sin RAF continuo) | ✅ hecho |
| #5 `CursorGlow` solo en puntero fino + sin reduced-motion | ✅ hecho |
| #6 a11y menú mobile (Escape, `aria-expanded`, `aria-controls`) | ✅ hecho |
| #7 a11y acordeón FAQ (`aria-controls` + `role=region`) | ✅ hecho |
| #8 `canonical` en home y case studies + `sitemap.ts` + `robots.ts` | ✅ hecho |
| #9 `engines.node` en package.json | ✅ hecho |
| Lint: 5 errores `set-state-in-effect` + 1 warning | ✅ resueltos (hook `usePrefersReducedMotion`, Meteors determinista) |
| #1 i18n por rutas `[lang]` (SEO del inglés) | ✅ hecho — rutas `/es` y `/en` indexables, hreflang, OG por idioma |

Lo de abajo es el detalle original de la revisión.

## TL;DR

El proyecto está **listo para deployar** y es un caso ideal para Vercel: el build
genera **todo estático** (las 11 rutas se prerenderizan, sin SSR ni API routes ni
variables de entorno), así que el costo de funciones serverless es prácticamente
cero. No hay nada que bloquee el deploy.

Las correcciones de abajo son para **calidad** (SEO real del inglés, accesibilidad,
reduced-motion, rendimiento en móvil), no para que "funcione".

---

## ✅ Lo que ya está bien para Vercel

- `next build` compila y type-checkea sin errores.
- Salida **100% estática** (`○ Static` / `● SSG`) → deploy rápido y barato.
- Sin `process.env` ni secretos → no hay que configurar env vars.
- pnpm detectado automáticamente (`pnpm-lock.yaml` presente).
- Link de descarga de CV (`/cv.pdf`) existe en `public/` → no da 404 en prod.
- No se usan `<img>` crudos → sin penalización de imágenes sin optimizar.
- `.gitignore` ya excluye `.vercel`, `.next/`, `.env*`.

---

## 🔴 Importantes (calidad / antes de promocionar el dominio)

### 1. El inglés no es indexable — i18n es solo un toggle de cliente
**Archivos:** `app/layout.tsx:22-62`, `app/proyectos/[slug]/page.tsx:11-27`

`LanguageProvider` cambia el idioma en el cliente, pero **no hay rutas por idioma**.
Consecuencias reales en producción:

- `app/layout.tsx:62` → `<html lang="es">` queda fijo aunque el usuario pase a inglés.
- `app/layout.tsx:22-54` → el `metadata` (title, description, OpenGraph, Twitter) está
  hardcodeado en español. Compartir el link estando en inglés muestra texto en español.
- `app/proyectos/[slug]/page.tsx:17` → `generateMetadata` lee solo `dictionaries.es`.
- Google nunca ve el contenido en inglés porque no tiene URL propia.

**Opciones:**
- *(mínimo)* Asumir que el SEO/canónico es español y dejar el inglés como comodidad UX.
- *(correcto)* Migrar a rutas `app/[lang]/...` con `generateStaticParams` para `es`/`en`,
  y mover `metadata` + `<html lang>` a server según el segmento. Sigue siendo 100% estático.

### 2. Slug inexistente devuelve HTTP 200 en vez de 404
**Archivo:** `app/proyectos/[slug]/page.tsx:34`

La página renderiza siempre; `CaseStudyView` muestra un 404 *visual* pero el status HTTP
es **200**. Los crawlers lo indexan como página válida.

```tsx
// app/proyectos/[slug]/page.tsx
import { notFound } from "next/navigation";
import { dictionaries } from "@/lib/content";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exists = dictionaries.es.projects.items.some((p) => p.id === slug);
  if (!exists) notFound();
  // ...resto igual
}
```

### 3. No hay estilos `:focus-visible` en todo el sitio
**Archivo:** `app/globals.css` (no aparece ningún `focus`)

Quien navega con teclado no ve dónde está el foco en botones/links custom. Para un
portafolio que se vende por la UI, conviene un estilo global:

```css
/* app/globals.css */
:focus-visible {
  outline: 2px solid var(--accent-2);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 4. `prefers-reduced-motion` no se respeta del todo
**Archivo:** `components/ui/GlobalParticles.tsx:51`

El flag `reduce` solo pausa el *drift* de las partículas, pero el bucle
`requestAnimationFrame` sigue corriendo cada frame: `clearRect`, dibujo, el bucle de
enlaces **O(n²)** (líneas 72-87) y el seguimiento del mouse. Quien activa reduced-motion
igual recibe animación continua y consumo de CPU.

**Fix:** si `reduce` es `true`, renderizar un frame estático y **no** volver a llamar a
`requestAnimationFrame` (o no montar el canvas).

---

## 🟡 Recomendado (rendimiento y a11y)

### 5. Varios loops de animación globales siempre activos
**Archivo:** `app/layout.tsx:65-66` (+ `CursorGlow`, `TechOrbit`, framer-motion por sección)

`GlobalParticles` (canvas + RAF) y `CursorGlow` (RAF) se montan globalmente y corren
**también en móvil**, donde seguir el cursor no aporta nada → batería y jank en equipos
lentos. Sugerencia: no montarlos en punteros táctiles.

```tsx
// montar solo en dispositivos con puntero fino
const finePointer = window.matchMedia("(pointer: fine)").matches;
```

### 6. Accesibilidad del menú mobile
**Archivo:** `components/layout/Navbar.tsx:104-110`

- El botón hamburguesa no tiene `aria-expanded` ni `aria-controls`.
- `aria-label="Menu"` no refleja abierto/cerrado.
- No se cierra con `Escape` ni hay focus trap.

### 7. Acordeón FAQ sin asociación aria
**Archivo:** `components/sections/Faq.tsx:28-31`

El botón tiene `aria-expanded` pero le falta `aria-controls` apuntando a un `id` del panel
para que el lector de pantalla conecte botón ↔ contenido.

---

## 🟢 Específico de Vercel (opcional, buenas prácticas)

### 8. `metadataBase` apunta al dominio final
**Archivo:** `app/layout.tsx:20-23` → `https://jeremylandaeta.dev`

En los deploys de preview (`*.vercel.app`) las URLs absolutas de OG/Twitter resolverán a
`jeremylandaeta.dev`. Si ese dominio aún no está live, la preview de la tarjeta social
puede salir rota hasta que conectes el dominio custom. Verifica que el dominio esté
apuntado a Vercel antes de compartir el link en redes.

### 9. Fijar la versión de Node
**Archivo:** `package.json` (sin campo `engines`)

Vercel usa su Node por defecto (hoy 22.x). El build funciona, pero para reproducibilidad
conviene fijarla:

```jsonc
// package.json
"engines": { "node": ">=20.9.0" }
```
(o configurar la versión en *Project Settings → Node.js Version* en Vercel).

### 10. `next.config.ts` vacío — está OK
No hace falta tocarlo hoy. Solo importa si más adelante agregas imágenes raster: ahí
usar `next/image` y tener en cuenta que `pnpm-workspace.yaml` ignora el build de `sharp`
(`ignoredBuiltDependencies`), que es lo que Next usa para optimizar imágenes.

### 11. `vercel.json` — no es necesario
Con salida estática y framework auto-detectado, no necesitas `vercel.json`. Solo lo
agregarías para headers/redirects custom.

---

## Menores

- `components/ui/AgeCounter.tsx:28,51` → variable `interval` declarada pero nunca asignada
  (dead code inofensivo, se puede borrar).
- El script `pnpm cv` (`package.json`) genera `public/cv-branded.pdf` con Chrome local,
  pero `SOCIALS.cv` apunta a `/cv.pdf`. El archivo *branded* no se usa: o lo conectas o
  eliminas el script para evitar confusión.

---

## Orden sugerido de arreglo

| Prioridad | Items | Esfuerzo |
|-----------|-------|----------|
| Rápidos y de alto impacto | #2 (notFound), #3 (focus-visible), #4 (reduced-motion) | ~bajo |
| Antes de difundir el dominio | #8 (metadataBase / dominio) | trivial |
| A11y pulido | #6 (menú mobile), #7 (FAQ) | medio |
| Decisión de fondo | #1 (i18n / SEO en inglés) | alto |
| Higiene | #9 (Node), menores | trivial |
