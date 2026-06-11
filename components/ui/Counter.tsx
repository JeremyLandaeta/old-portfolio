"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

/**
 * Anima un valor numérico al entrar en vista. Conserva sufijos/prefijos no
 * numéricos (ej. "6+", "805", "2025").
 */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  const hasNumber = /^(\D*)(\d+)(.*)$/.test(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseInt(num, 10);
    const duration = 1100;
    let start: number | null = null;
    let raf = 0;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {hasNumber && !reduce ? display : value}
    </span>
  );
}
