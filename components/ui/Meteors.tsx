"use client";

import { useMemo, type CSSProperties } from "react";

/**
 * Lluvia de meteoros (adaptado de 21st.dev — Meteors).
 * Las posiciones se derivan del índice de forma determinista: se ven repartidas
 * pero coinciden en servidor y cliente (sin mismatch de hidratación ni effect).
 * El movimiento se desactiva vía CSS bajo prefers-reduced-motion.
 */
export function Meteors({ number = 18, className = "" }: { number?: number; className?: string }) {
  const styles = useMemo<CSSProperties[]>(
    () =>
      Array.from({ length: number }, (_, i) => ({
        top: `${((i * 41) % 70) - 10}%`,
        left: `${(i * 53) % 100}%`,
        animationDelay: `${(((i * 7) % 60) / 10).toFixed(2)}s`,
        animationDuration: `${4 + (i % 6)}s`,
      })),
    [number],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {styles.map((style, i) => (
        <span key={i} className="meteor" style={style} />
      ))}
    </div>
  );
}
