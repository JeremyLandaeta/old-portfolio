import type { Metadata } from "next";
import Link from "next/link";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

// global-not-found reemplaza el layout, así que carga sus propias fuentes.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });
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
      className={`${inter.variable} ${mono.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="grain scanlines flex min-h-full flex-col items-center justify-center bg-background px-4 py-16 text-center text-foreground">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent-2">
          {"> error_404"}
        </p>

        <h1 className="text-shimmer mt-6 font-pixel text-5xl leading-none sm:text-7xl">404</h1>

        <p className="mt-6 font-pixel text-xs uppercase leading-relaxed text-muted sm:text-sm">
          Zona no encontrada
        </p>

        <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
          Este sector no existe en el mapa. Quizá el enlace está roto o te alejaste
          demasiado del camino.
        </p>

        <Link
          href="/es"
          className="btn-shine mt-9 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background"
        >
          ▸ Volver al inicio
        </Link>
      </body>
    </html>
  );
}
