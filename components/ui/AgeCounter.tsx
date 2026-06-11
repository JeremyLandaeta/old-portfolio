"use client";

import { useEffect, useState } from "react";

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Edad en años en tiempo real, con muchos decimales corriendo.
 * `birth` es una fecha ISO (ej. "2000-05-14T08:30:00").
 */
export function AgeCounter({
  birth,
  decimals = 9,
  className = "",
}: {
  birth: string;
  decimals?: number;
  className?: string;
}) {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const b = new Date(birth).getTime();
    if (Number.isNaN(b)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => setAge((Date.now() - b) / MS_PER_YEAR);

    if (reduce) {
      update();
    } else {
      const loop = () => {
        update();
        raf = requestAnimationFrame(loop);
      };
      loop();
      // pausa cuando la pestaña no está visible
      const onVis = () => {
        if (document.hidden) {
          cancelAnimationFrame(raf);
        } else {
          raf = requestAnimationFrame(loop);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("visibilitychange", onVis);
      };
    }
  }, [birth]);

  if (age === null) {
    return (
      <span className={className} suppressHydrationWarning>
        ··········
      </span>
    );
  }

  const [intPart, decPart] = age.toFixed(decimals).split(".");

  return (
    <span className={className} suppressHydrationWarning>
      {intPart}
      <span className="opacity-50">.{decPart}</span>
    </span>
  );
}
