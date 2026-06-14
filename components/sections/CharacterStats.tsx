"use client";

import { Gamepad2, Hexagon } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { StatBar } from "@/components/ui/StatBar";
import { RadarChart } from "@/components/ui/RadarChart";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { SKILL_STATS, RADAR, GAMER_COPY, ABOUT_GAME, PLAYER_LEVEL } from "@/lib/gamer";

/** Panel de stats del personaje: barras de habilidad + radar de atributos. */
export function CharacterStats() {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  const ag = ABOUT_GAME[lang];
  const radarData = RADAR.map((r) => ({ label: ag.attrLabels[r.key] ?? r.key, value: r.value }));

  return (
    <MenuFrame
      title="STATS"
      icon={Gamepad2}
      stamp="SYS.STATS"
      accent="blue"
      className="flex h-full flex-col px-6 pb-6 pt-7 sm:px-7 sm:pb-7"
    >
      {/* nivel del personaje */}
      <div className="flex items-center justify-end">
        <span className="shrink-0 rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 font-mono text-xs font-semibold text-accent-2">
          {g.levelLabel} {PLAYER_LEVEL}
        </span>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {SKILL_STATS.map((s, i) => (
          <StatBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
        ))}
      </div>

      {/* divisor */}
      <div className="my-6 h-px bg-border" />

      {/* Radar de atributos — "mapa estelar" con estrellas pixel */}
      <div className="flex items-center gap-2">
        <Hexagon size={16} className="text-accent-2" />
        <h4 className="font-mono text-sm font-semibold uppercase tracking-wider text-muted">
          {ag.attrsLabel}
        </h4>
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
    </MenuFrame>
  );
}
