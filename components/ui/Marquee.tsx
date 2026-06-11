"use client";

import type { ReactNode } from "react";

/**
 * Marquee infinito. Duplica los hijos para un loop continuo y los desplaza con CSS.
 */
export function Marquee({
  children,
  duration = 32,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee-mask marquee-pause overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-4"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
