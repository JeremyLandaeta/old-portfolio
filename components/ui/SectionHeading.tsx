"use client";

import { Reveal } from "./Reveal";

/**
 * Encabezado de sección: una línea en serif cursiva (la "voz de historia") y el
 * título en pixel con sombra dura, igual que el logo del hero.
 */
export function SectionHeading({
  kicker,
  title,
  align = "left",
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p className="text-lg italic text-straw">{kicker}</p>
      <h2 className="title-pixel mt-3 text-base leading-normal sm:text-xl md:text-2xl">{title}</h2>
    </Reveal>
  );
}
