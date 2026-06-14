"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { PixelAvatar } from "@/components/ui/PixelAvatar";
import { GAMER_COPY, ZONE_ORDER, PLAYER_LEVEL } from "@/lib/gamer";

/** HUD fijo estilo videojuego: nivel, zona actual y barra de XP (progreso). */
export function Hud() {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  const [zone, setZone] = useState(ZONE_ORDER[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.5;
      let current = ZONE_ORDER[0];
      for (const id of ZONE_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = id;
      }
      setZone(current);

      const denom = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(denom > 0 ? Math.min(100, (window.scrollY / denom) * 100) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden w-64 md:block" aria-hidden>
      <div className="rounded-xl glass px-3.5 py-2.5 font-mono shadow-lg shadow-black/30">
        <div className="flex items-center gap-3">
          {/* Retrato del jugador: sprite pixel-art (casco de explorador) */}
          <PixelAvatar
            cell={2}
            className="shrink-0 rounded-md border border-border bg-white/[0.03] p-1"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-accent-2">{g.levelLabel} {PLAYER_LEVEL}</span>
              <span className="text-muted">
                {g.zoneLabel}: <span className="text-foreground">{g.zones[zone] ?? zone}</span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] uppercase text-muted">{g.xpLabel}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full border border-border bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-150 ease-out"
                  style={{ width: `${progress}%`, boxShadow: "0 0 8px -1px var(--accent-2)" }}
                />
              </div>
              <span className="w-9 text-right text-[10px] tabular-nums text-accent-2">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
