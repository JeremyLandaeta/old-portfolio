"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** dirección del desplazamiento de entrada */
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  /** añade un desenfoque inicial para una entrada más cinematográfica */
  blur?: boolean;
  /** renderiza como otro tag */
  as?: "div" | "section" | "li" | "span";
};

const offset = 28;

function variants(direction: RevealProps["direction"], blur?: boolean): Variants {
  const map = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
    none: { x: 0, y: 0 },
  } as const;
  const from = map[direction ?? "up"];
  return {
    hidden: { opacity: 0, ...from, ...(blur ? { filter: "blur(10px)" } : {}) },
    visible: { opacity: 1, x: 0, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) },
  };
}

export function Reveal({ children, className, direction = "up", delay = 0, blur = false, as = "div" }: RevealProps) {
  const MotionTag = m[as];
  return (
    <MotionTag
      className={className}
      variants={variants(direction, blur)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
