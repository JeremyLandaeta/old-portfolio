"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { KONAMI_COPY, KONAMI_SEQUENCE } from "@/lib/gamer";
import { DUR, EASE } from "@/lib/motion";

const STORAGE_KEY = "konami-unlocked";
const EMBER_COLORS = ["bg-flame", "bg-accent", "bg-accent-2"];

// Brasas que suben al desbloquear, como las de la fogata del hero. Posiciones
// deterministas (sin Math.random para no romper SSR/lint).
const EMBERS = Array.from({ length: 24 }, (_, i) => ({
  // id estable por brasa (la lista es fija y nunca se reordena/filtra).
  id: `ember-${i}`,
  left: (i * 37) % 100,
  delay: (i % 8) * 0.09,
  drift: ((i * 53) % 60) - 30,
  size: 4 + (i % 3) * 2,
  color: EMBER_COLORS[i % EMBER_COLORS.length],
}));

/**
 * Easter egg: al teclear el código Konami (↑↑↓↓←→←→ B A) se desbloquea un
 * "logro secreto", con el mismo panel de los logros normales en grande.
 * El desbloqueo persiste en localStorage, pero el código siempre se puede repetir.
 */
export function KonamiEgg() {
  const { lang } = useLang();
  const c = KONAMI_COPY[lang];
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignora si el foco está en un input/textarea (no interferir al escribir).
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const expected = KONAMI_SEQUENCE[progress.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === expected) {
        progress.current += 1;
        if (progress.current === KONAMI_SEQUENCE.length) {
          progress.current = 0;
          try {
            localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* almacenamiento no disponible: el egg igual funciona */
          }
          setOpen(true);
        }
      } else {
        // Reinicia, pero permite que esta tecla sea el inicio de una nueva secuencia.
        progress.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.fast }}
          className="fixed inset-0 z-100 grid place-items-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={c.title}
        >
          {/* Telón */}
          <button
            type="button"
            aria-label={c.close}
            className="absolute inset-0 bg-background/90"
            onClick={() => setOpen(false)}
          />

          {/* Brasas subiendo */}
          {!reduced && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {EMBERS.map((p) => (
                <m.span
                  key={p.id}
                  className={`absolute -bottom-3 ${p.color}`}
                  style={{ left: `${p.left}%`, width: p.size, height: p.size }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: "-105vh", x: p.drift, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.6, delay: p.delay, ease: "easeOut" }}
                />
              ))}
            </div>
          )}

          {/* Panel del logro */}
          <m.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0, transition: { duration: DUR.fast } }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="relative w-full max-w-sm bg-background-soft px-6 pb-7 pt-8 text-center shadow-[inset_0_0_0_2px_var(--accent),0_6px_0_0_var(--accent-deep)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
            >
              <X size={16} />
            </button>

            <p className="mx-8 font-pixel text-[0.5rem] uppercase leading-relaxed text-straw">{c.unlocked}</p>

            <div className="mx-auto mt-5 grid h-28 w-28 place-items-center bg-background">
              <PixelSprite name="dpad" cell={7} />
            </div>

            <h2 className="title-pixel mt-6 text-base leading-normal">{c.title}</h2>
            <p className="mx-auto mt-3 max-w-[18rem] text-pretty italic leading-snug text-muted">{c.flavor}</p>

            <p className="mt-5 font-mono text-base tracking-widest text-foreground">{c.hint}</p>

            <p className="mt-4 text-accent-2">{c.reward}</p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
