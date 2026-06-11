"use client";

import { ScrollText } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { ABOUT_GAME } from "@/lib/gamer";

/**
 * Mini-card RPG "Current Quest" que cuelga al final del Lore para equilibrar
 * la altura con la card de Habilidades. Borde cyan suave + dark glass.
 */
export function CurrentQuestCard() {
  const { lang } = useLang();
  const quest = ABOUT_GAME[lang].currentQuest;

  return (
    <div className="current-quest mt-5 rounded-xl border border-accent-2/30 bg-accent-2/[0.05] p-3.5 shadow-[0_0_24px_-12px_rgba(6,182,212,0.6)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-accent-2/40 bg-accent-2/10 text-accent-2">
            <ScrollText size={15} />
          </span>
          <h4 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-2">
            {quest.title}
          </h4>
        </div>
        <span className="shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-amber-300">
          {quest.badge}
        </span>
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted">{quest.text}</p>

      {/* Barra de progreso decorativa */}
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-accent to-accent-2" />
      </div>
    </div>
  );
}
