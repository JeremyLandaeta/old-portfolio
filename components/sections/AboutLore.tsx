"use client";

import {
  MapPin,
  GraduationCap,
  Languages,
  BriefcaseBusiness,
  BookOpen,
  Swords,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { CurrentQuestCard } from "@/components/sections/CurrentQuestCard";
import { AbilityKit } from "@/components/ui/AbilityKit";
import { ABOUT_GAME } from "@/lib/gamer";

const factIcon: Record<string, typeof MapPin> = {
  location: MapPin,
  education: GraduationCap,
  languages: Languages,
  current: BriefcaseBusiness,
};

/**
 * Lore extendido (después de proyectos): backstory, datos, Current Quest y el
 * kit de habilidades. La identidad visual compacta vive en Snapshot/ChampionCard,
 * arriba, junto a la evidencia profesional.
 */
export function AboutLore() {
  const { t, lang } = useLang();
  const g = ABOUT_GAME[lang];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.about.loreKicker} title={t.about.loreHeading} />

      {/* Lore + Habilidades — alturas igualadas (stretch) */}
      <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:items-stretch">
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
                    className="flex items-center gap-2 border border-border bg-white/3 px-3 py-1.5 text-sm text-muted"
                  >
                    <Icon size={15} className="text-accent-2" />
                    {f.label}
                  </span>
                );
              })}
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
