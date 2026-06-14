"use client";

import Image from "next/image";
import { MapPin, Hexagon, Rocket, Leaf, Languages, Award } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { Counter } from "@/components/ui/Counter";
import { Tilt } from "@/components/ui/Tilt";
import { SOCIALS } from "@/lib/content";
import { ABOUT_GAME, PLAYER_LEVEL } from "@/lib/gamer";

const STAT_ICONS = [Rocket, Leaf, Languages, Award];

/** Carta coleccionable estilo TCG (premium) que representa a Jeremy. */
export function ChampionCard() {
  const { t, lang } = useLang();
  const g = ABOUT_GAME[lang];

  return (
    <Tilt className="group h-full [transform-style:preserve-3d]">
      {/* borde de rareza (foil dorado legendario) */}
      <div className="relative h-full rounded-2xl bg-gradient-to-b from-amber-300/60 via-accent-2/40 to-accent/50 p-[1.5px] shadow-xl shadow-black/50">
        <div className="relative h-full overflow-hidden rounded-[15px] bg-background-soft p-4">
          {/* foil holográfico */}
          <span className="holo-foil absolute inset-0 z-30 rounded-[15px]" />

          {/* esquinas decorativas */}
          <span className="pointer-events-none absolute left-2 top-2 z-20 h-3 w-3 border-l border-t border-accent-2/50" />
          <span className="pointer-events-none absolute right-2 top-2 z-20 h-3 w-3 border-r border-t border-accent-2/50" />
          <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-3 w-3 border-b border-l border-accent-2/50" />
          <span className="pointer-events-none absolute bottom-2 right-2 z-20 h-3 w-3 border-b border-r border-accent-2/50" />

          {/* cabecera: coste + rareza */}
          <div className="relative z-20 flex items-center justify-between">
            <span className="flex items-center gap-1 rounded-md border border-accent-2/40 bg-accent-2/10 px-2 py-0.5 font-mono text-xs font-bold text-accent-2">
              <Hexagon size={12} /> Lv {PLAYER_LEVEL}
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              ✦ {g.rarity}
            </span>
          </div>

          {/* ventana de arte */}
          <div className="relative z-20 mt-3 aspect-square overflow-hidden rounded-xl border border-amber-300/20 bg-grid">
            <Image
              src="/pixel/jeremy-pixel.png"
              alt="Jeremy Landaeta — avatar pixel-art"
              fill
              sizes="(min-width: 640px) 320px, 90vw"
              draggable={false}
              className="pixelated select-none object-cover object-top"
            />
            {/* tinte para fundir con la identidad cyan/azul */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-2/20 mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background-soft/70 to-transparent" />
            <PixelSprite name="spark" cell={3} className="pixel-twinkle absolute left-4 top-4" />
            <PixelSprite name="star" cell={2} className="pixel-twinkle absolute bottom-5 left-8" style={{ animationDelay: "1s" }} />
            <PixelSprite name="spark" cell={2} className="pixel-twinkle absolute right-5 bottom-7" style={{ animationDelay: "1.8s" }} />
            <span className="absolute right-2 top-2 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
          </div>

          {/* type line: nombre + clase */}
          <div className="relative z-20 mt-3 rounded-lg border border-border bg-white/[0.03] px-3 py-2">
            <h3 className="text-lg font-bold leading-tight">Jeremy Landaeta</h3>
            <p className="font-mono text-xs text-accent-2">{g.cardRole}</p>
          </div>

          {/* flavor / lore corto */}
          <p className="relative z-20 mt-3 text-sm italic leading-snug text-muted">“{g.cardFlavor}”</p>

          {/* traits */}
          <div className="relative z-20 mt-3 flex flex-wrap gap-1.5">
            {g.traits.map((tr) => (
              <span
                key={tr}
                className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {tr}
              </span>
            ))}
          </div>

          {/* stats de la carta (métricas) */}
          <div className="relative z-20 mt-3 grid grid-cols-2 gap-2">
            {t.about.highlights.map((h, i) => {
              const Icon = STAT_ICONS[i] ?? Rocket;
              return (
                <div key={h.label} className="rounded-lg border border-border bg-white/[0.02] p-2.5">
                  <Icon size={15} className="text-accent-2" />
                  <Counter value={h.value} className="mt-1 block text-gradient text-lg font-bold leading-none" />
                  <p className="mt-0.5 text-xs leading-tight text-muted">{h.label}</p>
                </div>
              );
            })}
          </div>

          {/* footer: ubicación + acciones */}
          <div className="relative z-20 mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <MapPin size={13} /> {t.hero.location}
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
              >
                <FaGithub size={15} />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
              >
                <FaLinkedin size={15} />
              </a>
              <a
                href={SOCIALS.cv}
                download
                className="btn-shine flex h-8 items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3.5 text-sm font-semibold text-background"
              >
                {t.cta.cv}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
