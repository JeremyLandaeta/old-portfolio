"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

type Datum = { label: string; value: number };

/** Serializa puntos a la cadena de `points` de un polígono SVG. Pura: solo usa su parámetro. */
const toStr = (pts: [number, number][]) =>
  pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

/** Radar/telaraña hexagonal de atributos estilo MOBA. Se dibuja al entrar en vista. */
export function RadarChart({
  data,
  size = 280,
}: {
  data: Datum[];
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = usePrefersReducedMotion();

  const n = data.length;
  // viewBox más ancho que alto: deja aire horizontal para las etiquetas
  // laterales (Backend, Equipo, Resolución…) que antes se salían del borde.
  const padX = 112;
  const w = size + padX * 2;
  const cx = w / 2;
  const cy = size / 2;
  const R = size / 2 - 28; // margen vertical para las etiquetas de arriba/abajo
  const labelR = R + 16;

  const angle = (i: number) => (-90 + (360 / n) * i) * (Math.PI / 180);
  const at = (i: number, radius: number): [number, number] => [
    cx + Math.cos(angle(i)) * radius,
    cy + Math.sin(angle(i)) * radius,
  ];
  const rings = [0.25, 0.5, 0.75, 1].map((f) =>
    data.map((_, i) => at(i, R * f)),
  );
  const valuePts = data.map((d, i) =>
    at(i, R * (Math.max(0, Math.min(100, d.value)) / 100)),
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${size}`}
      width={w}
      height={size}
      className="mx-auto block h-auto w-full max-w-[600px]"
      role="img"
      aria-label="Radar de atributos"
    >
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* anillos de la grilla */}
      {rings.map((ring, idx) => (
        <polygon
          key={idx}
          points={toStr(ring)}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}

      {/* radios */}
      {data.map((_, i) => {
        const [x, y] = at(i, R);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        );
      })}

      {/* área de valores (animada) */}
      <m.polygon
        points={toStr(valuePts)}
        fill="url(#radar-fill)"
        stroke="var(--accent-2)"
        strokeWidth={2}
        strokeLinejoin="round"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          filter: "drop-shadow(0 0 6px rgba(34,211,238,0.4))",
        }}
        initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: reduce ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* vértices */}
      {inView &&
        valuePts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="var(--accent-2)" />
        ))}

      {/* etiquetas */}
      {data.map((d, i) => {
        const [lx, ly] = at(i, labelR);
        const anchor =
          Math.abs(lx - cx) < 4 ? "middle" : lx < cx ? "end" : "start";
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-muted font-mono"
            style={{ fontSize: 12 }}
          >
            {d.label}
            <tspan className="fill-accent-2" dx="4" style={{ fontWeight: 700 }}>
              {d.value}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}
