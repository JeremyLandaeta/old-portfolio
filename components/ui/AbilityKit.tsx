"use client";

import { Compass, LayoutPanelTop, Server, BrainCircuit, Rocket } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { ABOUT_GAME } from "@/lib/gamer";

const ICONS: Record<string, typeof Compass> = {
  compass: Compass,
  layout: LayoutPanelTop,
  server: Server,
  brain: BrainCircuit,
  rocket: Rocket,
};

/** Kit de habilidades estilo MOBA: Pasiva + Q/W/E/R. */
export function AbilityKit() {
  const { lang } = useLang();
  const g = ABOUT_GAME[lang];

  return (
    <div>
      <ul className="space-y-2">
        {g.abilities.map((a) => {
          const Icon = ICONS[a.icon] ?? Compass;
          const isUlt = a.slot === "R";
          return (
            <li
              key={a.slot}
              className={`group flex items-start gap-3 rounded-xl border bg-white/2 p-3 transition-colors ${
                isUlt ? "border-amber-400/30 hover:border-amber-300/50" : "border-border hover:border-accent-2/40"
              }`}
            >
              <div className="relative shrink-0">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-lg ${
                    isUlt
                      ? "bg-linear-to-br from-amber-400/20 to-amber-500/20 text-amber-300"
                      : "bg-linear-to-br from-accent/20 to-accent-2/20 text-accent-2"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span className="absolute -bottom-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded border border-border bg-background font-mono text-xs font-bold text-foreground">
                  {a.slot}
                </span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold leading-tight">
                  {a.name}
                  {isUlt && (
                    <span className="rounded bg-amber-400/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
                      Ult
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{a.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
