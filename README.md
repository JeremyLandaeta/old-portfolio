# Portafolio — Jeremy Landaeta Lizama

Portafolio personal bilingüe (ES/EN) construido con **Next.js + TypeScript + Tailwind CSS + Framer Motion**.
Dark mode con identidad azul/cyan, animaciones al scroll y vibe developer (glass + terminal).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animaciones y reveal-on-scroll
- **lucide-react** + **react-icons** — iconografía y logos de tecnologías

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de producción
pnpm start    # servir el build
```

## Estructura

```
app/
  layout.tsx          # metadata/SEO, fuentes, LanguageProvider
  page.tsx            # ensambla las secciones
  globals.css         # identidad visual (aurora, grid, glow, marquee)
  opengraph-image.tsx # imagen Open Graph generada
components/
  providers/          # LanguageProvider (i18n ES/EN, persiste en localStorage)
  layout/             # Navbar flotante + Footer terminal
  sections/           # Hero, About, Projects, Experience, Stack, CurrentlyBuilding, Contact
  ui/                 # Reveal, GlowCard, Marquee, AuroraBackground, SectionHeading
lib/
  content.ts          # TODO el contenido bilingüe, tipado
public/
  cv.pdf              # CV descargable (branded)
scripts/
  cv.html             # fuente del CV → genera el PDF
```

## Idiomas

El contenido vive en `lib/content.ts` (diccionarios `es` / `en`). El selector ES/EN
de la navbar cambia todo el sitio y guarda la preferencia en `localStorage`.

## Regenerar el CV en PDF

El CV se genera desde `scripts/cv.html` (mismo branding que el sitio):

```bash
pnpm cv   # genera public/cv.pdf con Chrome headless
```

> El script usa Google Chrome instalado en macOS. Si editas tus datos, hazlo en
> `scripts/cv.html` y vuelve a ejecutar `pnpm cv`.

## Deploy

Optimizado para **Vercel**: conecta el repo y deploy. Sin variables de entorno requeridas.

---

Hecho en Santiago, Chile.
