# Web Portafolio — Jeremy Landaeta Lizama

Portafolio personal bilingüe (ES/EN) construido con **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion**.
Dark mode con identidad azul/cyan, animaciones al scroll y una capa "gamer" (RPG/MOBA/TCG) que le da un toque personal.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (sin archivo de config, todo en `globals.css`)
- **Framer Motion** — animaciones y reveal-on-scroll
- **lucide-react** + **react-icons** — iconografía y logos de tecnologías

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:3000  (redirige a /es)
pnpm build    # build de producción (estático)
pnpm start    # servir el build
pnpm lint     # eslint
```

## Internacionalización (i18n)

El idioma es **parte de la URL**, no un toggle de cliente: cada idioma tiene su propia
ruta indexable.

- `/es` y `/en` → home en cada idioma.
- `/es/proyectos/[slug]` y `/en/proyectos/[slug]` → casos de estudio.
- `/` redirige a `/es` (a nivel de routing, sin función serverless).
- El selector ES/EN de la navbar **navega** a la URL equivalente del otro idioma.
- SEO por idioma: `<html lang>`, `canonical`, `hreflang`, OpenGraph y `sitemap.xml`
  se generan por locale.

Todo el contenido vive tipado en `lib/content.ts` (diccionarios `es` / `en`).

## Estructura

```
app/
  [lang]/
    layout.tsx          # <html lang>, metadata/SEO por idioma, fuentes, providers
    page.tsx            # ensambla las secciones de la home
    template.tsx        # transición de página (wipe)
    opengraph-image.tsx # imagen Open Graph por idioma
    proyectos/[slug]/   # casos de estudio (SSG, ambos idiomas)
  globals.css           # identidad visual + animaciones (aurora, grid, glow, scanlines…)
  sitemap.ts / robots.ts
components/
  providers/            # LanguageProvider (idioma desde la ruta)
  layout/               # Navbar flotante + Footer terminal
  sections/             # Hero, About, Projects, Experience, Stack,
                        #   CurrentlyBuilding, Faq, Contact, CaseStudyView, CharacterStats
  ui/                   # Reveal, GlowCard, Marquee, AuroraBackground, RadarChart,
                        #   ChampionCard, StatBar, PixelAvatar/PixelSprite, Hud, Achievements…
lib/
  content.ts            # contenido bilingüe, tipado
  gamer.ts              # capa gamer: stats, atributos, habilidades, sprites pixel-art
public/
  cv.pdf                # CV descargable
scripts/
  cv.html               # fuente del CV → genera el PDF
```

## Capa "gamer"

Toques de videojuego pensados como detalle, no como tema completo:

- **Sobre mí → Champion Profile**: carta coleccionable estilo TCG (con tilt 3D + foil),
  barras de stats RPG, radar de atributos tipo MOBA y un kit de habilidades P/Q/W/E/R.
- **HUD** fijo con nivel, zona actual y barra de XP atada al scroll.
- **Logros** ("achievement unlocked") que se desbloquean al recorrer las secciones.
- Avatar y detalles **pixel-art**, scanlines CRT sutiles.

Todo respeta `prefers-reduced-motion` y es fácil de ajustar desde `lib/gamer.ts`.

## Regenerar el CV en PDF

El CV se genera desde `scripts/cv.html` (mismo branding que el sitio):

```bash
pnpm cv   # genera public/cv.pdf con Chrome headless (macOS)
```

## Deploy

Optimizado para **Vercel**: el build es 100% estático (sin variables de entorno).
Conecta el repo y deploy — el redirect de la raíz y las rutas por idioma funcionan a nivel de routing.

---

Hecho en Santiago, Chile.
