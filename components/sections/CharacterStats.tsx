"use client";

import { Gamepad2, Hexagon } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { StatBar } from "@/components/ui/StatBar";
import { RadarChart } from "@/components/ui/RadarChart";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { SKILL_STATS, RADAR, GAMER_COPY, ABOUT_GAME, PLAYER_LEVEL } from "@/lib/gamer";

/** Panel de stats del personaje: barras de habilidad + radar de atributos. */
export function CharacterStats() {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  const ag = ABOUT_GAME[lang];
  const radarData = RADAR.map((r) => ({ label: ag.attrLabels[r.key] ?? r.key, value: r.value }));

  return (
    <div className="flex h-full flex-col rounded-2xl glass p-6 sm:p-7">
      {/* Skill bars */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent-2">
            <Gamepad2 size={18} />
          </span>
          <h3 className="font-semibold leading-tight">{g.statsHeading}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 font-mono text-xs font-semibold text-accent-2">
          {g.levelLabel} {PLAYER_LEVEL}
        </span>
      </div>

      <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {SKILL_STATS.map((s, i) => (
          <StatBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
        ))}
      </div>

      {/* divisor */}
      <div className="my-6 h-px bg-border" />

      {/* Radar de atributos — "mapa estelar" con estrellas pixel */}
      <div className="flex items-center gap-2">
        <Hexagon size={16} className="text-accent-2" />
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-muted">
          {ag.attrsLabel}
        </h3>
      </div>
      <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.07),transparent_70%)] p-4">
        {/* estrellas pixel decorativas */}
        <PixelSprite name="spark" cell={3} className="pixel-twinkle absolute left-5 top-5" />
        <PixelSprite name="star" cell={3} className="pixel-twinkle absolute right-7 top-9" style={{ animationDelay: "0.6s" }} />
        <PixelSprite name="diamond" cell={3} className="pixel-twinkle absolute bottom-7 left-9" style={{ animationDelay: "1.1s" }} />
        <PixelSprite name="spark" cell={4} className="pixel-twinkle absolute bottom-6 right-6" style={{ animationDelay: "1.6s" }} />
        <PixelSprite name="star" cell={2} className="pixel-twinkle absolute left-14 top-1/2" style={{ animationDelay: "2.1s" }} />
        <RadarChart data={radarData} size={320} />
      </div>
    </div>
  );
}
