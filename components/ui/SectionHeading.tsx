"use client";

import { Reveal } from "./Reveal";

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
    <Reveal blur className={align === "center" ? "text-center" : ""}>
      <div className={`flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
        <span className="font-mono text-sm text-accent-2">{"// "}</span>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted">{kicker}</span>
      </div>
      <h2 className="text-shimmer mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
