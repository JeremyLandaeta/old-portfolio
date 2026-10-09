"use client";

import { useLang } from "@/components/providers/LanguageProvider";

// Se calcula una sola vez a nivel de módulo: servidor y cliente coinciden y
// se evita el hydration mismatch de `new Date()` en el JSX.
const CURRENT_YEAR = new Date().getFullYear();

/**
 * Una sola línea de créditos, para que la escena del cierre quede casi al
 * borde de la página. Los enlaces a los casos de estudio ya están en las
 * tarjetas de Proyectos y en "Más proyectos" de cada caso; el contacto vive en
 * <Contact />.
 */
export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border px-4 py-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-1 text-xs text-muted sm:flex-row">
        <p>
          © {CURRENT_YEAR} Jeremy Landaeta Lizama · {t.footer.rights}
        </p>
        <p className="font-mono">{t.footer.built}</p>
      </div>
    </footer>
  );
}
