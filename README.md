# jlandaeta.dev

Portafolio bilingüe de Jeremy Landaeta, construido con **Next.js 16, React 19, TypeScript, Tailwind CSS 4 y Framer Motion**. Presenta proyectos profesionales, freelance, personales y académicos con casos de estudio técnicos, sin perder su identidad RPG/pixel-art.

## Desarrollo

```bash
pnpm install
pnpm dev       # http://localhost:3000 → /es
pnpm lint
pnpm test      # valida el contenido bilingüe de proyectos y casos
pnpm build
pnpm start
```

Requiere Node.js 20.9 o superior. El sitio no necesita variables de entorno y sus rutas de contenido se prerenderizan.

## Arquitectura

```text
app/[lang]/
  layout.tsx                    metadata, fuentes, providers y JSON-LD
  page.tsx                      composición de la home
  proyectos/[slug]/page.tsx    casos de estudio ES/EN
components/
  sections/                     hero, proyectos, experiencia, perfil, stack…
  ui/                           sistema visual RPG, motion y navegación
lib/
  content.ts                    contenido bilingüe tipado y datos de proyectos
  projectMedia.ts               capturas reales y emblemas por proyecto
  gamer.ts                      inventario, sprites y capa narrativa
  allies.ts                     fichas de la sección Aliados
  site.ts                       URL canónica, metadata y rutas
```

Los proyectos tienen dos dimensiones independientes:

- Categoría: profesional, freelance, personal o académico.
- Estado: producción, uso interno, en pausa, completado, en desarrollo, prototipo o mockup.

Además, `featured` marca los proyectos principales de la home (el resto va al carrusel) y `own` distingue los proyectos propios, cuya tarjeta dice "Qué soluciona" en vez de "Mi aporte".

Agregar un proyecto requiere registrar su contenido en ambos idiomas, su caso de estudio y, si existen, sus medios reales. Los casos sin capturas públicas usan emblemas pixel-art; no se generan interfaces ficticias como evidencia.

## Internacionalización y SEO

- `/es` y `/en` son rutas indexables.
- Los casos viven en `/[lang]/proyectos/[slug]`.
- Metadata, canonical, hreflang, Open Graph, sitemap, JSON-LD y `/llms.txt` se generan desde las mismas fuentes tipadas.
- La raíz redirige a `/es`; los slugs antiguos relevantes conservan redirecciones.

## Identidad y accesibilidad

La estética “Fogata” usa una paleta nocturna, tipografía pixel para rótulos, serif para lectura y mono para datos técnicos. La navegación y el contenido conservan semántica HTML, foco visible, soporte de teclado, contraste, `prefers-reduced-motion` e imágenes optimizadas con `next/image`.

## CV

Las fuentes HTML viven en `scripts/cv-es.html` y `scripts/cv-en.html`.

```bash
pnpm cv
```

El comando usa Chrome headless en macOS para generar `public/cv-es.pdf` y `public/cv-en.pdf`.

## Deploy

El proyecto está preparado para Vercel. No ejecutar un despliegue desde este repositorio sin revisar primero el dominio primario, las redirecciones y los PDFs publicados.
