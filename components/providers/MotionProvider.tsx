"use client";

import { LazyMotion, domMax } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Provider único de Framer Motion para toda la app.
 *
 * Carga de forma diferida el paquete `domMax` (animaciones de entrada/salida,
 * variants, gestos + `drag`/`pan` y animaciones de `layout`) en lugar del bundle
 * completo que arrastra el import de `motion`. Por eso todos los componentes
 * animados usan `m.*` (no `motion.*`).
 *
 * Usamos `domMax` (no `domAnimation`) porque el carrusel de proyectos necesita
 * `drag` para el swipe; `domAnimation` no incluye `drag` ni `layout`.
 *
 * `strict` hace que cualquier uso de `motion.*` lance un error en desarrollo,
 * evitando que se reintroduzca el bundle completo por accidente.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
