"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ChampionCard } from "@/components/ui/ChampionCard";
import { ProjectCarousel } from "@/components/sections/ProjectCarousel";

/**
 * Snapshot profesional (tras el hero): identidad compacta + evidencia juntas.
 * Desktop → carta ~⅓ a la izquierda y carrusel ~⅔ a la derecha (lado a lado).
 * Mobile → un único carrusel donde la carta de perfil es la primera slide y
 * rota junto a los proyectos (con swipe). El toggle es por CSS (sin parpadeo de
 * hidratación): cada layout vive en un contenedor con `lg:hidden` / `lg:block`.
 */
export function Snapshot() {
  const { t } = useLang();

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.about.kicker} title={t.about.heading} />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
        {/* Desktop: carta a la izquierda + carrusel (solo proyectos) a la derecha */}
        <Reveal blur direction="left" className="hidden lg:order-1 lg:col-span-4 lg:block">
          <ChampionCard />
        </Reveal>
        <div className="hidden lg:order-2 lg:col-span-8 lg:block">
          <ProjectCarousel />
        </div>

        {/* Mobile: la carta entra como primera slide y rota con los proyectos */}
        <div className="lg:hidden">
          <ProjectCarousel leadingCard={<ChampionCard />} />
        </div>
      </div>
    </section>
  );
}
