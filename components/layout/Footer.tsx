"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/providers/LanguageProvider";
import { projectPath } from "@/lib/site";

// Se calcula una sola vez a nivel de módulo: servidor y cliente coinciden y
// se evita el hydration mismatch de `new Date()` en el JSX.
const CURRENT_YEAR = new Date().getFullYear();

/**
 * Créditos finos + enlaces a todos los casos de estudio (en cada página, para
 * que ninguno dependa del carrusel para ser descubierto). El bloque de contacto
 * (status + links + CTA) vive en <Contact />, con estética terminal.
 */
export function Footer() {
  const { t, lang } = useLang();
  const pathname = usePathname();

  return (
    <footer className="border-t border-border px-4 py-10">
      <nav
        aria-label={t.footer.projects}
        className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-xs sm:justify-start"
      >
        <span className="text-accent-2">
          <span aria-hidden>~/</span>
          {t.footer.projects}
        </span>
        {t.projects.items.map((p) => {
          const href = projectPath(lang, p.id);
          const current = pathname === href;
          return (
            <Link
              key={p.id}
              href={href}
              aria-current={current ? "page" : undefined}
              className={`py-1.5 transition-colors hover:text-accent-2 ${current ? "text-foreground" : "text-muted"}`}
            >
              {p.title}
            </Link>
          );
        })}
      </nav>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
        <p>
          © {CURRENT_YEAR} Jeremy Landaeta Lizama · {t.footer.rights}
        </p>
        <p className="font-mono">{t.footer.built}</p>
      </div>
    </footer>
  );
}
