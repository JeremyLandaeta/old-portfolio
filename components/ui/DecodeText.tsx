"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

// glifos angostos (binario/símbolos/hex) → "decode" tipo Matrix sin jiggle fuerte
const GLYPHS = "01<>/\\|[]{}=+*!?:;._-0123456789ABCDEF";

const rnd = (n: number) => Math.floor(Math.random() * n);

type DecodeTextProps = {
  text: string;
  /** Empieza el decode solo cuando es true (para encadenar). */
  start?: boolean;
  onDone?: () => void;
  className?: string;
};

/**
 * Revela `text` con un efecto de "decodificación" tipo Matrix: todas las
 * posiciones muestran glifos aleatorios y van resolviendo al carácter real.
 * Respeta prefers-reduced-motion (muestra todo al instante).
 */
export function DecodeText({ text, start = true, onDone, className = "" }: DecodeTextProps) {
  const reduce = usePrefersReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");
  const firedRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduce || !start) return;

    // cada carácter resuelve en un frame final aleatorio (cascada)
    const queue = Array.from(text, (ch) => ({ to: ch, end: ch === " " ? 0 : rnd(26) + 8 }));
    let frame = 0;
    let raf = 0;

    const tick = () => {
      let res = "";
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          res += q.to;
          done++;
        } else {
          res += GLYPHS[rnd(GLYPHS.length)];
        }
      }
      setOut(res);
      if (done === queue.length) {
        if (!firedRef.current) {
          firedRef.current = true;
          onDoneRef.current?.();
        }
        return;
      }
      frame++;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, [start, text, reduce]);

  return <span className={className}>{reduce ? text : out}</span>;
}
