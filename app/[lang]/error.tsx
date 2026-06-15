"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Error boundary de las páginas del idioma (se renderiza dentro del layout). */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción se podría enviar a un servicio de logging.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[72svh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent-2">
        {"> system_error"}
      </p>

      <h1 className="text-shimmer mt-6 font-pixel text-3xl leading-none sm:text-5xl">ERROR</h1>

      <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
        Algo se rompió al renderizar esta zona. Puedes reintentar o volver al inicio.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-shine inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background"
        >
          ↻ Reintentar
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border glass px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent-2"
        >
          ▸ Inicio
        </Link>
      </div>
    </div>
  );
}
