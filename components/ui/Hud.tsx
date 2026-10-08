"use client";

import { useSyncExternalStore } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { PixelAvatar } from "@/components/ui/PixelAvatar";
import { GAMER_COPY, ZONE_ORDER, PLAYER_LEVEL } from "@/lib/gamer";

type HudSnap = { zone: string; progress: number };

// Snapshot de servidor estable (sin window/document) → hidrata sin mismatch.
const HUD_SERVER_SNAP: HudSnap = { zone: ZONE_ORDER[0], progress: 0 };

// Cache del último snapshot del cliente: devolvemos la MISMA referencia cuando
// nada cambió (requisito de useSyncExternalStore para no re-renderizar en bucle).
let hudSnap: HudSnap = HUD_SERVER_SNAP;

function getHudSnapshot(): HudSnap {
  const probe = window.scrollY + window.innerHeight * 0.5;
  let current = ZONE_ORDER[0];
  for (const id of ZONE_ORDER) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= probe) current = id;
  }
  const denom = document.documentElement.scrollHeight - window.innerHeight;
  const progress = denom > 0 ? Math.min(100, (window.scrollY / denom) * 100) : 0;
  if (hudSnap.zone === current && hudSnap.progress === progress) return hudSnap;
  hudSnap = { zone: current, progress };
  return hudSnap;
}

function getHudServerSnapshot(): HudSnap {
  return HUD_SERVER_SNAP;
}

function subscribeHud(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** HUD fijo estilo videojuego: nivel, zona actual y barra de XP (progreso). */
export function Hud() {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  // Suscripción a scroll/resize: el valor inicial sale de getServerSnapshot
  // (sin render extra), no de un useEffect que setea estado al montar.
  const { zone, progress } = useSyncExternalStore(subscribeHud, getHudSnapshot, getHudServerSnapshot);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden w-64 md:block" aria-hidden>
      <div className="rounded-xl glass px-3.5 py-2.5 font-mono shadow-lg shadow-black/30">
        <div className="flex items-center gap-3">
          {/* Retrato del jugador: sprite pixel-art (casco de explorador) */}
          <PixelAvatar
            cell={2}
            className="shrink-0 rounded-md border border-border bg-white/3 p-1"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-accent-2">{g.levelLabel} {PLAYER_LEVEL}</span>
              <span className="text-muted">
                {g.zoneLabel}: <span className="text-foreground">{g.zones[zone] ?? zone}</span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs uppercase text-muted">{g.xpLabel}</span>
              <div className="h-1.5 flex-1 overflow-hidden border border-border bg-white/6">
                <div
                  className="h-full bg-linear-to-r from-accent to-accent-2 transition-[width] duration-150 ease-out"
                  style={{ width: `${progress}%`, boxShadow: "0 0 8px -1px var(--accent-2)" }}
                />
              </div>
              <span className="w-9 text-right text-xs tabular-nums text-accent-2">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
