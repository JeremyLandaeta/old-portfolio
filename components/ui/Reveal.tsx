"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  /** posición dentro de un grupo: escalona la entrada (order × --reveal-step) */
  order?: number;
  /** "rise" sube y aparece; "grow" crece desde arriba (trazos como la línea de tiempo) */
  kind?: "rise" | "grow";
  /** renderiza como otro tag */
  as?: "div" | "section" | "li" | "span";
};

// Un solo IntersectionObserver para todas las entradas del sitio. La animación
// vive en globals.css ([data-reveal]); acá solo se decide cuándo dispararla.
let observer: IntersectionObserver | null = null;
const measured = new WeakSet<Element>();

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const first = !measured.has(el);
        measured.add(el);

        if (entry.isIntersecting) {
          // Solo se anima lo que estaba oculto; lo visible al cargar queda quieto.
          if (!first) el.dataset.reveal = "shown";
          observer?.unobserve(el);
        } else if (first) {
          // Primera medición: se oculta únicamente lo que está bajo el pliegue.
          if (entry.boundingClientRect.top >= window.innerHeight) el.dataset.reveal = "hidden";
          else observer?.unobserve(el);
        }
      }
    },
    { rootMargin: "0px 0px -80px 0px" },
  );
  return observer;
}

/**
 * Entrada al hacer scroll. El contenido llega visible en el HTML: al hidratar
 * se oculta solo si está bajo el pliegue y se anima (CSS) cuando entra al
 * viewport. Una sola curva, duración y distancia para todo el sitio.
 */
export function Reveal({ children, className, order = 0, kind = "rise", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      // el tag varía, pero todos comparten la interfaz de HTMLElement
      ref={ref as never}
      className={className}
      data-reveal-kind={kind === "grow" ? "grow" : undefined}
      style={order ? ({ "--reveal-order": order } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
