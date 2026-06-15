"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Fallback para errores en el propio root layout ([lang]/layout). Reemplaza el
 * layout, así que define su <html>/<body>. Estilos vía globals.css (sin las
 * fuentes next/font, que viven en el layout) — suficiente para este caso raro.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="grain flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground antialiased">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent-2">
          {"> fatal_error"}
        </p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Algo salió mal</h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Ocurrió un error inesperado. Intenta recargar la página.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background"
        >
          ↻ Reintentar
        </button>
      </body>
    </html>
  );
}
