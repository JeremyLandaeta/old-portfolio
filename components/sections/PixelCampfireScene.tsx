"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Escena pixel-art decorativa de la sección "Sobre mí".
 *
 * Arquitectura por capas: una imagen base pixel-art (samurái + fogata + suelo +
 * cristal + terminal) y, encima, capas animadas reales con Framer Motion
 * (glow de la fogata, luz sobre el suelo, brasas, luciérnagas, glow cyan y
 * scanlines del terminal) + fades/vignette para fundirla con el fondo.
 *
 * 100% decorativa → aria-hidden. Respeta `prefers-reduced-motion` vía
 * `useReducedMotion()` (apaga las animaciones de overlay).
 *
 * TODO: Add /public/pixel/about-scene-base.webp
 * El asset debe ser un crop horizontal de la escena (sin cards ni texto de la
 * sección). Mientras no exista, se muestra un fallback oscuro y los overlays
 * siguen animando, así el layout nunca se rompe.
 */

// Brasas que suben desde la zona de la fogata (posiciones estáticas → sin
// hydration mismatch).
const EMBERS = [
  { left: "44.2%", bottom: "48%", size: 3, delay: 0, duration: 3.2 },
  { left: "45.1%", bottom: "53%", size: 4, delay: 0.5, duration: 3.8 },
  { left: "46.0%", bottom: "50%", size: 2, delay: 1.1, duration: 3.4 },
  { left: "46.8%", bottom: "56%", size: 3, delay: 1.6, duration: 4.1 },
  { left: "44.7%", bottom: "60%", size: 2, delay: 2.1, duration: 3.5 },
  { left: "47.4%", bottom: "62%", size: 3, delay: 2.7, duration: 4.4 },
];

// Luciérnagas cyan/cálidas flotando por la escena.
const FIREFLIES = [
  { left: "7%", top: "50%", size: 3, delay: 0, duration: 5.8, warm: false },
  { left: "20%", top: "38%", size: 2, delay: 1.2, duration: 7, warm: false },
  { left: "45%", top: "32%", size: 2, delay: 0.8, duration: 6.4, warm: true },
  { left: "58%", top: "55%", size: 3, delay: 1.7, duration: 7.5, warm: false },
  { left: "70%", top: "40%", size: 2, delay: 2.2, duration: 6.8, warm: false },
  { left: "86%", top: "46%", size: 2, delay: 0.4, duration: 7.2, warm: true },
];

export function PixelCampfireScene() {
  const reduceMotion = useReducedMotion();
  const [baseOk, setBaseOk] = useState(true);

  return (
    <div
      aria-hidden="true"
      className="pixel-scene relative h-[150px] w-full overflow-hidden rounded-xl sm:h-[180px] lg:h-[205px]"
    >
      {/* Fallback siempre presente detrás de la imagen: si el .webp no existe,
          la escena queda oscura/ambiental en vez de romperse. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_33%_85%,#101a2b_0%,#0a0f1c_55%,#070b13_100%)]" />
      {!baseOk && (
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
      )}

      {/* Imagen base pixel-art */}
      <img
        src="/pixel/about-scene-base.webp"
        alt=""
        draggable={false}
        onError={() => setBaseOk(false)}
        className={`pixelated pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center transition-opacity duration-500 ${
          baseOk ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Pista discreta solo cuando falta el asset (toda la escena es aria-hidden) */}
      {!baseOk && (
        <span className="absolute bottom-2 right-3 font-mono text-[10px] text-muted/50">
          + /pixel/about-scene-base.webp
        </span>
      )}

      {/* Fades superior/inferior para integrar con el fondo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background via-background/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background via-background/30 to-transparent" />

      {/* Glow cálido de la fogata */}
      <motion.div
        className="pointer-events-none absolute left-[45%] top-[55%] h-28 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.58),rgba(239,68,68,0.2)_42%,transparent_72%)] blur-xl"
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.75, 0.5], scale: [1, 1.08, 0.98] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Luz cálida proyectada sobre el suelo */}
      <motion.div
        className="pointer-events-none absolute bottom-[18%] left-[45%] h-9 w-64 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(251,146,60,0.36),transparent_72%)] blur-md"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.65, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow cyan del cristal / terminal */}
      <motion.div
        className="pointer-events-none absolute bottom-[22%] right-[5%] h-28 w-56 rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.24),transparent_70%)] blur-xl"
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.5, 0.3] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanlines / pulse del terminal (oculto en mobile) */}
      <motion.div
        className="pointer-events-none absolute bottom-[34%] right-[8%] hidden h-[48px] w-[118px] rounded-sm bg-[repeating-linear-gradient(to_bottom,rgba(0,255,140,0.12)_0_1px,transparent_1px_3px)] mix-blend-screen sm:block"
        animate={reduceMotion ? { opacity: 0.3 } : { opacity: [0.18, 0.42, 0.24] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Brasas */}
      {!reduceMotion &&
        EMBERS.map((ember, index) => (
          <motion.span
            key={`ember-${index}`}
            className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,#fde68a,#f97316_55%,transparent_75%)] shadow-[0_0_8px_rgba(249,115,22,0.8)]"
            style={{ left: ember.left, bottom: ember.bottom, width: ember.size, height: ember.size }}
            initial={{ y: 0, opacity: 0, scale: 0.7 }}
            animate={{ y: [-2, -38], opacity: [0, 1, 0], scale: [0.8, 1, 0.3] }}
            transition={{ duration: ember.duration, delay: ember.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

      {/* Luciérnagas */}
      {!reduceMotion &&
        FIREFLIES.map((fly, index) => (
          <motion.span
            key={`firefly-${index}`}
            className={`pointer-events-none absolute rounded-full ${
              fly.warm
                ? "bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.85)]"
                : "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
            }`}
            style={{ left: fly.left, top: fly.top, width: fly.size, height: fly.size }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 0.75, 0], x: index % 2 === 0 ? [0, 12] : [0, -10], y: [0, -18] }}
            transition={{ duration: fly.duration, delay: fly.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Vignette lateral para fundir la escena */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
