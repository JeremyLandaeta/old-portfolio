"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/**
 * Card con tilt 3D + borde glow + spotlight que sigue el cursor.
 */
export function GlowCard({
  children,
  className = "",
  tilt = true,
  beam = false,
  beamDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  /** borde con beam de gradiente girando */
  beam?: boolean;
  /** desfase del beam (s) para que no giren sincronizados */
  beamDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    if (tilt && !window.matchMedia("(pointer: coarse)").matches) {
      ry.set((px - 0.5) * 9);
      rx.set((0.5 - py) * 9);
    }
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        ...(beam ? ({ ["--beam-delay"]: `${beamDelay}s` } as Record<string, string>) : {}),
      }}
      className={`glow-border group relative overflow-hidden rounded-2xl glass transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(6,182,212,0.45)] ${beam ? "card-beam" : ""} ${className}`}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(56,140,255,0.16), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 h-full" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </m.div>
  );
}
