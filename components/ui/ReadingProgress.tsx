"use client";

import { m, useScroll, useSpring } from "framer-motion";

/** Barra de progreso de lectura fija en el tope de la página. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <m.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-accent"
    />
  );
}
