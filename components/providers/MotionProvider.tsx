"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Provider único de Framer Motion para toda la app.
 *
 * Carga de forma diferida solo el paquete de features `domAnimation` (~15kb:
 * animaciones de entrada/salida, variants y gestos) en lugar del bundle completo
 * que arrastra el import de `motion` (~34kb gzip). Por eso todos los componentes
 * animados usan `m.*` (no `motion.*`).
 *
 * `strict` hace que cualquier uso de `motion.*` lance un error en desarrollo,
 * evitando que se reintroduzca el bundle completo por accidente. Si en el futuro
 * se necesita `drag`, `pan` o animaciones de `layout`, cambiar `domAnimation` por
 * `domMax`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
