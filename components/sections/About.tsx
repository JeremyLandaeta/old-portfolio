"use client";

import {
  MapPin,
  GraduationCap,
  Languages,
  BadgeCheck,
  BookOpen,
  Swords,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AgeCounter } from "@/components/ui/AgeCounter";
import { ChampionCard } from "@/components/ui/ChampionCard";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { CharacterStats } from "@/components/sections/CharacterStats";
import { PixelCampfireScene } from "@/components/sections/PixelCampfireScene";
import { CurrentQuestCard } from "@/components/sections/CurrentQuestCard";
import { AbilityKit } from "@/components/ui/AbilityKit";
import { BIRTH_DATE } from "@/lib/content";
import { ABOUT_GAME } from "@/lib/gamer";

const factIcon: Record<string, typeof MapPin> = {
  location: MapPin,
  education: GraduationCap,
  languages: Languages,
  availability: BadgeCheck,
};

export function About() {
  const { t, lang } = useLang();
  const g = ABOUT_GAME[lang];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <SectionHeading kicker={t.about.kicker} title={t.about.heading} />

      {/* Fila 1: Carta + Panel de stats — alturas igualadas (stretch) */}
      <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:items-stretch">
        <Reveal blur direction="left" className="lg:col-span-2">
          <ChampionCard />
        </Reveal>
        <Reveal className="lg:col-span-3">
          <CharacterStats />
        </Reveal>
      </div>

      {/* Escena pixel-art: ronin + fogata (decorativa, full width) */}
      <Reveal delay={0.05} className="mt-6">
        <PixelCampfireScene />
      </Reveal>

      {/* Fila 2: Lore + Habilidades — alturas igualadas (stretch) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5 lg:items-stretch">
        {/* Lore / backstory */}
        <Reveal className="lg:col-span-3">
          <MenuFrame
            title={g.loreLabel}
            icon={BookOpen}
            stamp="LORE.LOG"
            className="h-full px-6 pb-6 pt-7"
          >
            <div className="max-w-[68ch] space-y-3">
              {t.about.paragraphs.map((p) => (
                <p key={p} className="text-pretty leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {t.about.facts.map((f) => {
                const Icon = factIcon[f.key] ?? MapPin;
                return (
                  <span
                    key={f.key}
                    className="flex items-center gap-2 rounded-full border border-border bg-white/3 px-3 py-1.5 text-sm text-muted"
                  >
                    <Icon size={15} className="text-accent-2" />
                    {f.label}
                  </span>
                );
              })}
            </div>

            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/2 px-3 py-1.5 font-mono text-xs text-muted"
              title={t.about.ageCaption}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
              </span>
              <AgeCounter
                birth={BIRTH_DATE}
                decimals={9}
                className="tabular-nums text-foreground"
              />
              <span>{t.about.ageLabel}</span>
            </div>

            <CurrentQuestCard />
          </MenuFrame>
        </Reveal>

        {/* Habilidades */}
        <Reveal delay={0.08} className="lg:col-span-2">
          <MenuFrame
            title={g.abilitiesLabel}
            icon={Swords}
            stamp="SKILL.SET"
            accent="amber"
            className="h-full px-6 pb-6 pt-7"
          >
            <AbilityKit />
          </MenuFrame>
        </Reveal>
      </div>
    </section>
  );
}
