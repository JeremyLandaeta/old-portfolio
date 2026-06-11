"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

const CHARS = "!<>-_\\/[]{}—=+*^?#abcdef0123456789";

/** Rota entre `words` con un efecto de decodificación tipo terminal. */
export function ScrambleText({
  words,
  className = "",
  hold = 2200,
}: {
  words: string[];
  className?: string;
  hold?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const [output, setOutput] = useState(words[0] ?? "");
  const indexRef = useRef(0);
  const rafRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Sin animación: cuando hay una sola palabra o el usuario pidió menos
  // movimiento, mostramos la primera palabra directamente (sin setState en effect).
  const animating = !reduce && words.length > 1;

  useEffect(() => {
    if (!animating) return;

    let cancelled = false;

    function scrambleTo(next: string) {
      const from = words[indexRef.current];
      const len = Math.max(from.length, next.length);
      const queue = Array.from({ length: len }, (_, i) => ({
        to: next[i] ?? "",
        start: Math.floor(Math.random() * 12),
        end: Math.floor(Math.random() * 18) + 12,
      }));

      let frame = 0;
      const tick = () => {
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            out += q.to;
            done++;
          } else if (frame >= q.start) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            out += "";
          }
        }
        setOutput(out);
        if (done === queue.length) {
          schedule();
          return;
        }
        frame++;
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    }

    function schedule() {
      timeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        const nextIndex = (indexRef.current + 1) % words.length;
        const nextWord = words[nextIndex];
        indexRef.current = nextIndex;
        scrambleTo(nextWord);
      }, hold);
    }

    schedule();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [animating, words, hold]);

  return <span className={className}>{animating ? output : words[0] ?? ""}</span>;
}
