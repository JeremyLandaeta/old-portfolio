"use client";

import { Wrench } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechOrbit } from "@/components/ui/TechOrbit";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { CharacterStats } from "@/components/sections/CharacterStats";

export function Stack() {
  const { t, lang } = useLang();

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.stack.kicker} title={t.stack.heading} />

      {/* Órbita de tecnologías (visual) */}
      <Reveal className="mt-10">
        <TechOrbit />
      </Reveal>

      {/* Habilidades con EVIDENCIA (core / proyectos / explorando) + radar de foco.
          Es la jerarquía técnica principal: cada tech enlaza a sus proyectos. */}
      <Reveal className="mt-12">
        <CharacterStats />
      </Reveal>

      {/* Resto del toolbox — peso visual menor para no competir con el core
          ni repetir lo que ya muestran la órbita y las flip-cards. */}
      <Reveal className="mt-6">
        <MenuFrame
          title={lang === "en" ? "TOOLBOX" : "HERRAMIENTAS"}
          icon={Wrench}
          accent="amber"
          stamp="ENV"
          className="px-5 pb-5 pt-7"
        >
          <div className="flex flex-wrap gap-2">
            {t.stack.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-lg border border-border bg-white/2 px-2.5 py-1 font-mono text-xs text-muted/80 transition-colors hover:border-accent-2 hover:text-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </MenuFrame>
      </Reveal>
    </section>
  );
}
