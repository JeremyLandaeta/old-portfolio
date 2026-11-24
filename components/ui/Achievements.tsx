"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { GAMER_COPY, type SpriteName } from "@/lib/gamer";

type Toast = { key: number; sprite: SpriteName; title: string; desc: string };

/** Duración de `toast-life` en globals.css (entrada + pausa + salida). */
const LIFE_MS = 2500;

/** Avisos de "logro desbloqueado" al llegar a cada sección. */
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
    const timers: number[] = [];

    // La sección cuenta como "alcanzada" cuando cruza la franja central del
    // viewport. Un umbral por porcentaje visible no sirve: las secciones más
    // altas que la pantalla nunca llegarían a cumplirlo.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || fired.has(id)) continue;
          fired.add(id);

          const key = ++counterRef.current;
          setToasts([{ key, ...g.achievements[id] }]);
          timers.push(
            window.setTimeout(() => {
              setToasts((prev) => prev.filter((t) => t.key !== key));
            }, LIFE_MS),
          );
        }
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
    // g cambia sólo con el idioma; los logros ya disparados no se repiten.
  }, [g]);

  const toast = toasts[0];
  if (!toast) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-70 sm:w-[min(20rem,calc(100vw-2rem))]">
      <div key={toast.key} className="toast-pixel">
        <span className="grid h-12 w-12 shrink-0 place-items-center bg-background">
          <PixelSprite name={toast.sprite} cell={3} />
        </span>
        <div className="hidden min-w-0 sm:block">
          <p className="font-pixel text-[0.5rem] uppercase leading-relaxed text-straw">{g.achievementUnlocked}</p>
          <p className="mt-0.5 truncate text-lg font-bold leading-tight">{toast.title}</p>
          <p className="truncate text-sm leading-snug text-muted">{toast.desc}</p>
        </div>
      </div>
    </div>
  );
}
