"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, m } from "framer-motion";
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

// Las flechas del código se dibujan con el mismo cursor ▸ del menú, girado.
const ARROW_ROTATION: Record<string, string> = {
  ArrowUp: "-rotate-90",
  ArrowDown: "rotate-90",
  ArrowLeft: "rotate-180",
  ArrowRight: "",
};

/**
 * Easter egg: al teclear el código Konami (↑↑↓↓←→←→ B A) aparece una ventana de
 * "objeto obtenido" como las de un RPG: el marco y la placa de las ventanas del
 * sitio, el código en teclas pixel y la recompensa junto a la fogata.
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
          className="fixed inset-0 z-100 grid place-items-center px-5"
          role="dialog"
          aria-modal="true"
          aria-label={c.title}
        >
          {/* Telón */}
          <button
            type="button"
            tabIndex={-1}
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

          {/* Ventana de objeto obtenido: el marco de las ventanas del sitio, en brasa */}
          <m.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0, transition: { duration: DUR.fast } }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="window w-full max-w-sm px-5 pb-6 pt-9 text-center sm:px-6"
            style={{ "--frame-color": "var(--accent)" } as CSSProperties}
          >
            <p className="window-tag bg-accent">{c.unlocked}</p>

            {/* el objeto, en una casilla como las del inventario */}
            <div className="mx-auto grid h-24 w-24 place-items-center border-2 border-frame bg-background">
              <PixelSprite name="dpad" cell={6} />
            </div>

            <h2 className="title-pixel mt-5 text-base leading-normal">{c.title}</h2>
            <p className="mx-auto mt-3 max-w-[19rem] text-pretty italic leading-snug text-foreground/85">{c.flavor}</p>

            {/* el código, tecla por tecla */}
            <ol aria-label={c.hint} className="mt-5 flex flex-wrap justify-center gap-0.5 sm:gap-1">
              {KONAMI_SEQUENCE.map((key, i) => (
                <m.li
                  key={`${key}-${i}`}
                  aria-hidden
                  initial={reduced ? false : { opacity: 0.2, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR.fast, delay: 0.3 + i * 0.07 }}
                  className="grid h-7 w-7 place-items-center border-2 border-frame bg-background text-flame"
                >
                  {key in ARROW_ROTATION ? (
                    <span className={`cursor-mark text-[0.65rem] ${ARROW_ROTATION[key]}`} />
                  ) : (
                    <span className="font-pixel text-[0.55rem] uppercase leading-none">{key}</span>
                  )}
                </m.li>
              ))}
            </ol>

            {/* la recompensa, junto al fuego */}
            <div className="mt-6 flex items-center gap-4 border-t-2 border-frame pt-5 text-left">
              <span
                aria-hidden
                className="emblem-stage grid h-14 w-14 shrink-0 place-items-center border-2 border-frame"
              >
                <PixelSprite name="fire" cell={3} />
              </span>
              <p>
                <span className="block font-pixel text-[0.5rem] uppercase leading-relaxed text-straw">
                  {c.rewardLabel}
                </span>
                <span className="mt-1 block text-lg font-bold leading-tight text-flame">{c.reward}</span>
              </p>
            </div>

            <button type="button" autoFocus onClick={() => setOpen(false)} className="btn-pixel mt-6">
              {c.close}
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
