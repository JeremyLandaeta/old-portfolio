"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";

/** Puntos de navegación laterales que marcan la sección activa (desktop). */
export function ScrollSpy() {
  const { t } = useLang();
  const [active, setActive] = useState(t.nav[0]?.id ?? "");

  useEffect(() => {
    const ids = t.nav.map((n) => n.id);

    const onScroll = () => {
      // línea guía al centro del viewport (las secciones finales sí se alcanzan)
      const probe = window.scrollY + window.innerHeight * 0.5;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = id;
      }
      // La última sección suele no poder cruzar el centro por el clamp de scroll:
      // márcala cuando ya está bien visible (su borde superior en el 70% superior).
      const lastEl = document.getElementById(ids[ids.length - 1]);
      if (lastEl && lastEl.getBoundingClientRect().top < window.innerHeight * 0.7) {
        current = ids[ids.length - 1];
      }
      // y al tocar fondo, asegurar la última
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [t.nav]);

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
              className={`block rounded-full transition-all duration-300 ${
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
