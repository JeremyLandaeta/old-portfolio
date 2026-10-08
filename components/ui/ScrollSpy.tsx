"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { useActiveSection } from "@/components/ui/useActiveSection";

/** Puntos de navegación laterales que marcan la sección activa (desktop). */
export function ScrollSpy() {
  const { t } = useLang();
  const active = useActiveSection(t.nav.map((n) => n.id));

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {t.nav.map((item) => {
        const isActive = active === item.id;
        return (
          <a key={item.id} href={`#${item.id}`} className="group flex items-center gap-2.5">
            <span
              className={`font-mono text-xs transition-all duration-300 ${
                isActive ? "text-accent-2 opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`block transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-accent-2 shadow-[0_0_12px_var(--accent-glow)]"
                  : "h-2 w-2 bg-muted/40 group-hover:bg-muted"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
