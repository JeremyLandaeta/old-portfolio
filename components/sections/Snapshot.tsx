"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ChampionCard } from "@/components/ui/ChampionCard";
import { ProjectCarousel } from "@/components/sections/ProjectCarousel";

/**
 * Snapshot profesional (tras el hero): identidad compacta + evidencia juntas.
 * Desktop → carta ~⅓ a la izquierda, carrusel ~⅔ a la derecha.
 * Mobile → primero el carrusel (proyectos), luego la carta.
 */
export function Snapshot() {
  const { t } = useLang();

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.about.kicker} title={t.about.heading} />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
        <Reveal blur direction="left" className="order-2 lg:order-1 lg:col-span-4">
          <ChampionCard />
        </Reveal>
        <div className="order-1 lg:order-2 lg:col-span-8">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}
