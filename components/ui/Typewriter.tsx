"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

type TypewriterProps = {
  text: string;
  /** Empieza a tipear solo cuando es true (para encadenar varias). */
  start?: boolean;
  /** ms por carácter. */
  speed?: number;
  withCaret?: boolean;
  onDone?: () => void;
  className?: string;
};

/**
 * Tipea `text` carácter a carácter, con caret parpadeante opcional.
 * Respeta prefers-reduced-motion (muestra todo al instante).
 */
export function Typewriter({
  text,
  start = true,
  speed = 42,
  withCaret = true,
  onDone,
  className = "",
}: TypewriterProps) {
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  const firedRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduce || !start || n >= text.length) return;
    const tmr = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(tmr);
  }, [start, n, text, speed, reduce]);

  const done = reduce || n >= text.length;

  // dispara onDone una sola vez al terminar
  useEffect(() => {
    if (done && (start || reduce) && !firedRef.current) {
      firedRef.current = true;
      onDoneRef.current?.();
    }
  }, [done, start, reduce]);

  return (
    <span className={className}>
      {reduce ? text : text.slice(0, n)}
      {withCaret && !reduce && start && !done && (
        <span
          aria-hidden
          className="cursor-blink ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.1em] bg-accent-2 align-baseline"
        />
      )}
    </span>
  );
}
