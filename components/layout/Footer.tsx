"use client";

import { useLang } from "@/components/providers/LanguageProvider";

// Se calcula una sola vez a nivel de módulo: servidor y cliente coinciden y
// se evita el hydration mismatch de `new Date()` en el JSX.
const CURRENT_YEAR = new Date().getFullYear();

/**
 * Créditos finos. El bloque de contacto (status + links + CTA) vive en
 * <Contact />, con estética terminal; aquí solo va el copyright.
 */
export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
        <p>
          © {CURRENT_YEAR} Jeremy Landaeta Lizama · {t.footer.rights}
        </p>
        <p className="font-mono">{t.footer.built}</p>
      </div>
    </footer>
  );
}
