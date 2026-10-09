"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Provider único de Framer Motion para toda la app.
 *
 * Framer queda solo para lo que necesita animar la salida o un alto automático
 * (menú móvil, acordeón del FAQ, logro secreto, barra de lectura). Las entradas
 * al hacer scroll son CSS (ver components/ui/Reveal.tsx).
 *
 * Se carga `domAnimation`, el paquete chico: nada usa `drag` ni `layout`, que
 * son lo que suma `domMax`. Por eso los componentes usan `m.*` (no `motion.*`).
 *
 * `strict` hace que cualquier uso de `motion.*` lance un error en desarrollo,
 * evitando que se reintroduzca el bundle completo por accidente.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
