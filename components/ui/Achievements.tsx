"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import { GAMER_COPY } from "@/lib/gamer";

type Toast = { key: number; sectionId: string; icon: string; title: string; desc: string };

/** Toasts de "logro desbloqueado" al desplazarse por las secciones. */
export function Achievements() {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  const [toasts, setToasts] = useState<Toast[]>([]);
  const firedRef = useRef<Set<string> | null>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const ids = Object.keys(g.achievements);
    // Inicialización perezosa dentro del effect: el Set se crea una sola vez y
    // así no entra en las deps (es referencia estable, pero el linter estático
    // no puede inferirlo si vive en el cuerpo del componente).
    const fired = (firedRef.current ??= new Set<string>());

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;
          if (fired.has(id)) continue;
          fired.add(id);

          const a = g.achievements[id];
          const key = ++counterRef.current;
          setToasts((prev) => [...prev, { key, sectionId: id, ...a }]);
          window.setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.key !== key));
          }, 4200);
        }
      },
      { threshold: [0.35] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // g cambia sólo con el idioma; los logros ya disparados no se repiten.
  }, [g]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <m.div
            key={t.key}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-xl border border-accent-2/30 glass p-3 shadow-lg shadow-black/40"
          >
            {/* brillo que recorre la tarjeta */}
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, transparent 30%, rgba(34,211,238,0.18) 50%, transparent 70%)",
                backgroundSize: "250% 100%",
                animation: "achievement-shine 0.9s ease-out",
              }}
            />
            <div className="relative flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent/25 to-accent-2/25 text-xl">
                {t.icon}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent-2">
                  {g.achievementUnlocked}
                </p>
                <p className="truncate font-semibold leading-tight">{t.title}</p>
                <p className="truncate text-xs text-muted">{t.desc}</p>
              </div>
            </div>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
