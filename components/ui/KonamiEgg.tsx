"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { KONAMI_COPY, KONAMI_SEQUENCE, SPRITES } from "@/lib/gamer";

const STORAGE_KEY = "konami-unlocked";
const SPRITE_NAMES = Object.keys(SPRITES) as (keyof typeof SPRITES)[];

// Posiciones deterministas del confeti (sin Math.random para no romper SSR/lint).
const CONFETTI = Array.from({ length: 28 }, (_, i) => {
  const left = (i * 37) % 100;
  const delay = (i % 7) * 0.08;
  const drift = ((i * 53) % 40) - 20;
  const sprite = SPRITE_NAMES[i % SPRITE_NAMES.length];
  const size = 3 + (i % 3);
  // id estable por partícula (la lista es fija y nunca se reordena/filtra).
  return { id: `confetti-${i}`, left, delay, drift, sprite, size };
});

/**
 * Easter egg: al teclear el código Konami (↑↑↓↓←→←→ B A) se desbloquea un
 * "logro secreto" con una carta estilo TCG y una lluvia de sprites pixel-art.
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] grid place-items-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={c.title}
        >
          {/* Telón */}
          <button
            type="button"
            aria-label={c.close}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Lluvia de sprites pixel-art */}
          {!reduced && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {CONFETTI.map((p) => (
                <m.div
                  key={p.id}
                  className="absolute -top-10"
                  style={{ left: `${p.left}%` }}
                  initial={{ y: -40, opacity: 0, rotate: 0 }}
                  animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: p.drift, rotate: 360 }}
                  transition={{ duration: 2.4, delay: p.delay, ease: "easeIn" }}
                >
                  <PixelSprite name={p.sprite} cell={p.size} />
                </m.div>
              ))}
            </div>
          )}

          {/* Carta de recompensa estilo TCG */}
          <m.div
            initial={{ scale: 0.8, y: 30, rotateX: -12 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-accent-2/40 glass p-6 text-center shadow-2xl shadow-accent-2/20 card-beam"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
            >
              <X size={16} />
            </button>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
              {c.unlocked}
            </p>

            {/* Sello de rareza */}
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber-300">
              <Sparkles size={12} />
              {c.rarity}
            </div>

            {/* Sprite estrella grande */}
            <div className="mt-5 grid place-items-center">
              <div className="grid h-24 w-24 place-items-center rounded-2xl bg-linear-to-br from-accent/20 to-accent-2/20">
                <PixelSprite name="diamond" cell={9} className={reduced ? "" : "pixel-idle"} />
              </div>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gradient">{c.title}</h2>
            <p className="mx-auto mt-2 max-w-[18rem] text-pretty text-sm text-muted">{c.flavor}</p>

            <p className="mt-4 font-mono text-base tracking-widest text-foreground">{c.hint}</p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-4 py-1.5 font-mono text-xs font-semibold text-background">
              {c.reward}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
