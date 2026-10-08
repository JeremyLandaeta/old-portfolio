"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/components/providers/LanguageProvider";

/** Error boundary de las páginas del idioma (se renderiza dentro del layout). */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLang();

  useEffect(() => {
    // En producción se podría enviar a un servicio de logging.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[72svh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent-2">
        {"> system_error"}
      </p>

      <h1 className="title-pixel mt-6 text-3xl leading-none sm:text-5xl">ERROR</h1>

      <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
        Algo se rompió al renderizar esta zona. Puedes reintentar o volver al inicio.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-pixel"
        >
          ↻ Reintentar
        </button>
        <Link
          href={`/${lang}`}
          className="btn-pixel btn-pixel-ghost"
        >
          ▸ Inicio
        </Link>
      </div>
    </div>
  );
}
