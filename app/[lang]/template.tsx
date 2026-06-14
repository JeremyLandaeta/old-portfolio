"use client";

import { m } from "framer-motion";

/**
 * Transición que se ejecuta en cada navegación de ruta:
 * un "wipe" con gradiente que se retira + el contenido que entra con blur.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Wipe de salida */}
      <m.div
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-gradient-to-b from-accent via-accent-2 to-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Sello que aparece y se desvanece durante el wipe */}
      <m.div
        className="pointer-events-none fixed inset-0 z-[81] grid place-items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <span className="font-mono text-2xl font-bold text-background">{"</>"}</span>
      </m.div>

      {/* Contenido — SOLO opacidad: transform/filter en un ancestro romperían
          el position:fixed de Navbar / ScrollSpy / CursorGlow. */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </>
  );
}
