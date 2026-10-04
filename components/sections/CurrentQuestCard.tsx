"use client";

import { ScrollText, Check } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { ABOUT_GAME } from "@/lib/gamer";

/** Nº de bloques de la barra de progreso estilo 8-bit. */
const SEGMENTS = 16;

/**
 * Quest-log RPG "Current Quest" al final del Lore: título en pixel-font,
 * objetivos con checkboxes 8-bit (hecho / en progreso / pendiente) y barra de
 * progreso por bloques. El progreso se deriva de los estados (done=1, active=0.5)
 * para que nunca quede desincronizado con la lista.
 */
export function CurrentQuestCard() {
  const { lang } = useLang();
  const quest = ABOUT_GAME[lang].currentQuest;

  const score = quest.objectives.reduce(
    (acc, o) => acc + (o.state === "done" ? 1 : o.state === "active" ? 0.5 : 0),
    0,
  );
  const progress = Math.round((score / quest.objectives.length) * 100);
  const filled = Math.round((progress / 100) * SEGMENTS);

  return (
    <div className="current-quest mt-5 rounded-xl border border-accent-2/30 bg-accent-2/5 p-4 shadow-[0_0_24px_-12px_rgba(6,182,212,0.6)]">
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-accent-2/40 bg-accent-2/10 text-accent-2">
            <ScrollText size={15} />
          </span>
          <h4 className="font-pixel text-[0.6rem] uppercase leading-none text-accent-2">
            {quest.title}
          </h4>
        </div>
        <span className="shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 font-pixel text-[0.5rem] text-amber-300">
          {quest.badge}
        </span>
      </div>

      {/* objetivos */}
      <ul className="mt-4 space-y-2.5">
        {quest.objectives.map((o) => (
          <li key={o.label} className="flex items-center gap-2.5">
            {o.state === "done" ? (
              <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-xs bg-accent-2 text-background">
                <Check size={10} strokeWidth={3.5} />
              </span>
            ) : o.state === "active" ? (
              <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-xs border border-accent-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-[1px] bg-accent-2" />
              </span>
            ) : (
              <span className="h-3.5 w-3.5 shrink-0 rounded-xs border border-border" />
            )}
            <span
              className={
                o.state === "done"
                  ? "text-sm text-muted/70 line-through decoration-accent-2/40"
                  : o.state === "active"
                    ? "text-sm font-medium text-foreground"
                    : "text-sm text-muted"
              }
            >
              {o.label}
            </span>
          </li>
        ))}
      </ul>

      {/* barra de progreso por bloques (8-bit) */}
      <div className="mt-4 flex items-center gap-2.5">
        <div
          className="flex flex-1 gap-0.75"
          role="progressbar"
          aria-label={quest.title}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-[1px] ${
                i < filled
                  ? "bg-linear-to-b from-accent to-accent-2 shadow-[0_0_6px_-2px_var(--accent-2)]"
                  : "bg-white/6"
              }`}
            />
          ))}
        </div>
        <span className="font-pixel text-[0.55rem] tabular-nums text-accent-2">{progress}%</span>
      </div>
    </div>
  );
}
