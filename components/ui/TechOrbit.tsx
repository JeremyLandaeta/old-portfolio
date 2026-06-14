"use client";

import { memo, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiOpenai,
  SiDocker, SiPostgresql, SiGit, SiJavascript, SiMongodb, SiVercel,
  SiNestjs, SiMysql,
} from "react-icons/si";

/* Componente de órbita de tecnologías.
   Adaptado del patrón "Orbiting Skills" de 21st.dev a la identidad del sitio:
   logos reales, paleta azul/cyan, responsive y pausa al hover. */

type Skill = {
  id: string;
  Icon: IconType;
  color: string;
  ring: number;
  /** posición inicial en el anillo (radianes) */
  phase: number;
  label: string;
};

const LIGHT = "#e6edf7";

// Tres anillos. ring 0 = interno.
const SKILLS: Skill[] = [
  // Interno
  { id: "react", Icon: SiReact, color: "#61DAFB", ring: 0, phase: 0, label: "React" },
  { id: "next", Icon: SiNextdotjs, color: LIGHT, ring: 0, phase: (2 * Math.PI) / 3, label: "Next.js" },
  { id: "ts", Icon: SiTypescript, color: "#3178C6", ring: 0, phase: (4 * Math.PI) / 3, label: "TypeScript" },
  // Medio
  { id: "tailwind", Icon: SiTailwindcss, color: "#06B6D4", ring: 1, phase: 0, label: "Tailwind" },
  { id: "node", Icon: SiNodedotjs, color: "#339933", ring: 1, phase: (2 * Math.PI) / 5, label: "Node.js" },
  { id: "openai", Icon: SiOpenai, color: LIGHT, ring: 1, phase: (4 * Math.PI) / 5, label: "OpenAI" },
  { id: "docker", Icon: SiDocker, color: "#2496ED", ring: 1, phase: (6 * Math.PI) / 5, label: "Docker" },
  { id: "postgres", Icon: SiPostgresql, color: "#4169E1", ring: 1, phase: (8 * Math.PI) / 5, label: "PostgreSQL" },
  // Externo
  { id: "js", Icon: SiJavascript, color: "#F7DF1E", ring: 2, phase: 0, label: "JavaScript" },
  { id: "git", Icon: SiGit, color: "#F05032", ring: 2, phase: Math.PI / 3, label: "Git" },
  { id: "mongo", Icon: SiMongodb, color: "#47A248", ring: 2, phase: (2 * Math.PI) / 3, label: "MongoDB" },
  { id: "vercel", Icon: SiVercel, color: LIGHT, ring: 2, phase: Math.PI, label: "Vercel" },
  { id: "nest", Icon: SiNestjs, color: "#E0234E", ring: 2, phase: (4 * Math.PI) / 3, label: "NestJS" },
  { id: "mysql", Icon: SiMysql, color: "#4479A1", ring: 2, phase: (5 * Math.PI) / 3, label: "MySQL" },
];

// fracción del radio (respecto a la mitad del contenedor) por anillo
const RING_FRAC = [0.4, 0.65, 0.92];
const RING_SPEED = [0.45, -0.3, 0.2];

const OrbitIcon = memo(function OrbitIcon({
  skill,
  angle,
  half,
  iconSize,
}: {
  skill: Skill;
  angle: number;
  half: number;
  iconSize: number;
}) {
  const [hover, setHover] = useState(false);
  const r = RING_FRAC[skill.ring] * half;
  // posición en px planos (sin calc) para evitar mismatch de hidratación
  const left = Number((half + Math.cos(angle) * r).toFixed(2));
  const top = Number((half + Math.sin(angle) * r).toFixed(2));

  return (
    <div
      className="absolute"
      style={{
        width: iconSize,
        height: iconSize,
        left,
        top,
        transform: "translate(-50%, -50%)",
        zIndex: hover ? 30 : 10,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="relative grid h-full w-full place-items-center rounded-xl border border-border bg-background-soft/90 backdrop-blur-sm transition-transform duration-300"
        style={{
          transform: hover ? "scale(1.25)" : "scale(1)",
          boxShadow: hover ? `0 0 22px ${skill.color}55` : "0 4px 14px rgba(0,0,0,0.35)",
        }}
      >
        <skill.Icon size={iconSize * 0.55} style={{ color: skill.color }} />
        {hover && (
          <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-0.5 font-mono text-[11px] text-foreground shadow-lg">
            {skill.label}
          </span>
        )}
      </div>
    </div>
  );
});

function Ring({ frac, half }: { frac: number; half: number }) {
  const d = frac * half * 2;
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: d,
        height: d,
        border: "1px solid rgba(56,140,255,0.18)",
        boxShadow: "inset 0 0 40px rgba(6,182,212,0.06)",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, transparent 60%, rgba(6,182,212,0.05) 100%)" }}
      />
    </div>
  );
}

export function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const pausedRef = useRef(false);

  // tamaño responsive vía useSyncExternalStore: el ResizeObserver es la
  // suscripción y getSnapshot mide el ancho actual. 440 es el snapshot de
  // servidor (= max-w-110), así hidrata limpio sin un render extra.
  const size = useSyncExternalStore(
    (onChange) => {
      const el = containerRef.current;
      if (!el) return () => {};
      const ro = new ResizeObserver(onChange);
      ro.observe(el);
      return () => ro.disconnect();
    },
    () => containerRef.current?.getBoundingClientRect().width ?? 440,
    () => 440,
  );

  // bucle de animación
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) setTime((t) => t + dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const half = size / 2;
  const iconSize = Math.max(28, Math.min(46, size * 0.095));

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-110"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* halo central */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />

      {/* anillos */}
      {RING_FRAC.map((frac) => (
        <Ring key={frac} frac={frac} half={half} />
      ))}

      {/* núcleo */}
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-linear-to-br from-accent to-accent-2 shadow-[0_0_30px_var(--accent-glow)]">
        <span className="font-mono text-lg font-bold text-background">{"</>"}</span>
      </div>

      {/* iconos orbitando */}
      {SKILLS.map((s) => (
        <OrbitIcon
          key={s.id}
          skill={s}
          half={half}
          iconSize={iconSize}
          angle={time * RING_SPEED[s.ring] + s.phase}
        />
      ))}
    </div>
  );
}
