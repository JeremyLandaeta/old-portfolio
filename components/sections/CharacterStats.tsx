"use client";

import { Gamepad2, Hexagon } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { RadarChart } from "@/components/ui/RadarChart";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { TechFlipCard } from "@/components/ui/TechFlipCard";
import {
  SKILL_GROUPS,
  SKILL_GROUP_LABELS,
  PROJECT_SHORT,
  FOCUS_AREAS,
  FOCUS_LABELS,
  TOTAL_PROJECTS,
  GAMER_COPY,
  PLAYER_LEVEL,
} from "@/lib/gamer";

/**
 * Hoja de personaje: habilidades respaldadas por EVIDENCIA (cada tech enlaza a
 * los proyectos donde se aplicó) + radar de "foco" cuyos ejes valen por nº de
 * proyectos reales. Sin % autoasignados.
 */
export function CharacterStats() {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  const groupLabels = SKILL_GROUP_LABELS[lang];
  const shortName = PROJECT_SHORT[lang];

  const focusData = FOCUS_AREAS.map((a) => ({
    label: FOCUS_LABELS[lang][a.key] ?? a.key,
    value: a.projects.length,
  }));

  return (
    <MenuFrame
      title="STATS"
      icon={Gamepad2}
      stamp="SYS.STATS"
      accent="blue"
      className="flex h-full flex-col px-6 pb-6 pt-7 sm:px-7 sm:pb-7"
    >
      {/* leyenda (qué son las tarjetas) + nivel */}
      <div className="flex items-start justify-between gap-3">
        <p className="max-w-[34ch] font-mono text-[11px] leading-snug text-muted/70">
          {g.flipHint}
        </p>
        <span className="shrink-0 rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 font-mono text-xs font-semibold text-accent-2">
          {g.levelLabel} {PLAYER_LEVEL}
        </span>
      </div>

      {/* Habilidades en tarjetas que se voltean → evidencia (dónde se aplicó) */}
      <div className="mt-5 space-y-5">
        {SKILL_GROUPS.map((group) => (
          <div key={group.key} className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
                {groupLabels[group.key]}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {group.key === "exploring" ? (
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border border-dashed border-border bg-white/2 px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.skills.map((s) => (
                  <TechFlipCard
                    key={s.name}
                    name={s.name}
                    projects={s.projects}
                    shortName={shortName}
                    lang={lang}
                    usedIn={g.usedIn}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* divisor */}
      <div className="my-6 h-px bg-border" />

      {/* Radar de foco — ejes = áreas, valor = nº de proyectos (evidencia) */}
      <div className="flex items-center gap-2">
        <Hexagon size={16} className="text-accent-2" />
        <h4 className="font-mono text-sm font-semibold uppercase tracking-wider text-muted">
          {g.focusHeading}
        </h4>
      </div>
      <p className="mt-1 font-mono text-[11px] text-muted/70">{g.focusCaption}</p>
      <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.07),transparent_70%)] p-4">
        {/* estrellas pixel decorativas */}
        <PixelSprite name="spark" cell={3} className="pixel-twinkle absolute left-5 top-5" />
        <PixelSprite name="star" cell={3} className="pixel-twinkle absolute right-7 top-9" style={{ animationDelay: "0.6s" }} />
        <PixelSprite name="diamond" cell={3} className="pixel-twinkle absolute bottom-7 left-9" style={{ animationDelay: "1.1s" }} />
        <PixelSprite name="spark" cell={4} className="pixel-twinkle absolute bottom-6 right-6" style={{ animationDelay: "1.6s" }} />
        <PixelSprite name="star" cell={2} className="pixel-twinkle absolute left-14 top-1/2" style={{ animationDelay: "2.1s" }} />
        <RadarChart
          data={focusData}
          size={320}
          max={TOTAL_PROJECTS}
          label={`${g.focusHeading}: ${focusData.map((d) => `${d.label} ${d.value}`).join(", ")}`}
        />
      </div>
    </MenuFrame>
  );
}
