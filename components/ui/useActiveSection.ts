"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección actualmente visible (scroll-spy compartido por
 * el ScrollSpy lateral y el header). Pasa [] para desactivarlo (ej. fuera de la
 * home, donde las secciones no existen).
 */
export function useActiveSection(ids: string[]): string {
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (!list.length) return;

    const onScroll = () => {
      // línea guía al centro del viewport (las secciones finales sí se alcanzan)
      const probe = window.scrollY + window.innerHeight * 0.5;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = id;
      }
      // La última sección suele no cruzar el centro por el clamp de scroll:
      // márcala cuando ya está bien visible (borde superior en el 70% superior).
      const lastEl = document.getElementById(list[list.length - 1]);
      if (lastEl && lastEl.getBoundingClientRect().top < window.innerHeight * 0.7) {
        current = list[list.length - 1];
      }
      // y al tocar fondo, asegurar la última
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = list[list.length - 1];
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
  }, [key]);

  return active;
}
