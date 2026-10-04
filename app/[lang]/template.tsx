"use client";

import { m } from "framer-motion";
import { usePathname } from "next/navigation";

const WIPE = "pointer-events-none fixed inset-0 z-[80] origin-top bg-linear-to-b from-accent via-accent-2 to-accent";
const SEAL = "pointer-events-none fixed inset-0 z-[81] grid place-items-center";

/**
 * Transición que se ejecuta en cada navegación de ruta:
 * un "wipe" con gradiente que se retira + el contenido que entra con fade.
 *
 * - Home: con Framer Motion. El wipe espera a la hidratación a propósito: hace
 *   de pantalla de carga hasta que el intro del hero (que es JS) puede arrancar.
 * - Resto (casos de estudio): la misma animación en CSS puro (`.route-*` en
 *   globals.css), que parte en el primer paint sin esperar al JS, así el
 *   contenido —y el LCP— no dependen de la hidratación.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = /^\/(es|en)\/?$/.test(pathname);

  if (!isHome) {
    return (
      <>
        <div className={`route-wipe ${WIPE}`} />
        <div className={`route-seal ${SEAL}`}>
          <span className="font-mono text-2xl font-bold text-background">{"</>"}</span>
        </div>
        {/* Solo opacidad, igual que abajo (ver nota del position:fixed). */}
        <div className="route-content">{children}</div>
      </>
    );
  }

  return (
    <>
      {/* Wipe de salida */}
      <m.div
        className={WIPE}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Sello que aparece y se desvanece durante el wipe */}
      <m.div
        className={SEAL}
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
