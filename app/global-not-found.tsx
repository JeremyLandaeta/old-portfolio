import type { Metadata } from "next";
import { Alegreya, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

// global-not-found reemplaza el layout, así que carga sus propias fuentes.
const serif = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
const pixel = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Zona no encontrada",
  description: "La página que buscas no existe.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="es"
      className={`${serif.variable} ${mono.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="grain scanlines relative flex min-h-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-center text-foreground">
        {/* Kanji 道 ("el camino") de fondo, tenue */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 grid select-none place-items-center overflow-hidden font-serif text-[clamp(11rem,46vh,28rem)] leading-none text-foreground/10"
        >
          道
        </span>

        <div className="relative flex flex-col items-center">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent-2">
            {"> error_404"}
          </p>

          <h1 className="title-pixel mt-6 text-5xl leading-none sm:text-7xl">404</h1>

          <h2 className="mt-7 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            El sendero se perdió
          </h2>

          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted">
            Incluso el mejor guerrero toma un camino equivocado. Lo importante es seguir
            avanzando.
          </p>

          {/* <a> normal: global-not-found vive fuera del router, <Link> no navega aquí */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/es"
            className="btn-pixel mt-9"
          >
            ▸ Retomar el camino
          </a>
        </div>
      </body>
    </html>
  );
}
