"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderGit2, RotateCw } from "lucide-react";

/**
 * Tarjeta que se voltea para mostrar DÓNDE se aplicó una tecnología.
 * Front: nombre + nº de proyectos (evidencia). Back: enlaces a esos casos.
 * Accesible: el frente es un <button> (toggle por click / Enter / Espacio); en
 * desktop también voltea al hover. Los enlaces de la cara trasera solo entran al
 * orden de tabulación cuando la tarjeta está volteada, y se revierte al salir.
 */
export function TechFlipCard({
  name,
  projects,
  shortName,
  lang,
  usedIn,
}: {
  name: string;
  projects: string[];
  shortName: Record<string, string>;
  lang: string;
  usedIn: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const unit =
    lang === "en"
      ? projects.length === 1 ? "project" : "projects"
      : projects.length === 1 ? "proyecto" : "proyectos";

  return (
    <div
      className="flip h-21 select-none"
      data-flipped={flipped}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFlipped(false);
      }}
    >
      <div className="flip-inner rounded-lg">
        {/* Front: botón accesible que voltea la tarjeta */}
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          aria-label={`${name} — ${projects.length} ${unit}. ${usedIn}`}
          className="flip-face flip-front flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-border bg-white/3 px-2 text-center"
        >
          <span className="font-mono text-[13px] font-medium text-foreground/90">{name}</span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-muted/70">
            <FolderGit2 size={11} className="text-accent-2/70" />
            {projects.length} {unit}
          </span>
          <RotateCw size={10} aria-hidden className="absolute right-1.5 top-1.5 text-muted/30" />
        </button>

        {/* Back: proyectos donde se aplicó (fuera del tab-order si no está volteada) */}
        <div
          className="flip-face flip-back flex flex-col justify-center gap-1 overflow-hidden rounded-lg border border-accent-2/40 bg-accent-2/10 px-2.5 py-1.5"
          aria-hidden={!flipped}
        >
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-2/80">
            {usedIn}
          </span>
          <div className="flex flex-col gap-0.5 overflow-hidden">
            {projects.map((id) => (
              <Link
                key={id}
                href={`/${lang}/proyectos/${id}`}
                tabIndex={flipped ? 0 : -1}
                className="truncate font-mono text-[11px] leading-tight text-foreground/90 transition-colors hover:text-accent-2"
              >
                › {shortName[id] ?? id}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
