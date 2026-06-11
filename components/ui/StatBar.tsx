"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

/** Barra de stat estilo RPG (HP/MP): se llena al entrar en vista. */
export function StatBar({
  name,
  level,
  delay = 0,
}: {
  name: string;
  level: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  // Contador numérico sincronizado con el llenado de la barra.
  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1000;
    const start = delay * 1000;
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const elapsed = ts - t0 - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * level));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, level, delay, reduce]);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between font-mono text-[13px]">
        <span className="text-foreground/90">{name}</span>
        <span className="text-accent-2 tabular-nums">{reduce ? level : display}<span className="text-muted">/100</span></span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full border border-border bg-white/[0.04]">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
          style={{
            // muescas tipo segmento para el toque retro-HUD
            backgroundImage:
              "linear-gradient(to right, var(--accent), var(--accent-2)), repeating-linear-gradient(90deg, transparent 0 11px, rgba(0,0,0,0.35) 11px 12px)",
            backgroundBlendMode: "overlay",
            boxShadow: "0 0 12px -2px var(--accent-2)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 1, ease: [0.22, 1, 0.36, 1], delay }
          }
        />
      </div>
    </div>
  );
}
