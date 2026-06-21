"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { projectMedia } from "@/lib/projectMedia";
import type { Project } from "@/lib/content";

/** Orden pensado para reclutadores: primero el mayor peso profesional. */
const ORDER = ["greensoft", "orbix", "lexy", "pagos", "landings", "portfolio"];
/** Auto-avance pausado (no marquee): una card cada 6.5s. */
const AUTO_MS = 6500;
const GAP = 16; // gap-4

const accentMap: Record<Project["accent"], { dot: string; badge: string; glow: string }> = {
  blue: { dot: "bg-blue-400", badge: "text-blue-300 border-blue-400/30 bg-blue-400/10", glow: "from-blue-500/25" },
  cyan: { dot: "bg-cyan-400", badge: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10", glow: "from-cyan-500/25" },
  violet: { dot: "bg-violet-400", badge: "text-violet-300 border-violet-400/30 bg-violet-400/10", glow: "from-violet-500/25" },
  emerald: { dot: "bg-emerald-400", badge: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10", glow: "from-emerald-500/25" },
};

/**
 * Carrusel horizontal de proyectos con scroll-snap. Avanza UNA card a la vez,
 * con calma; se pausa al pasar el mouse o al enfocar una card, y con
 * `prefers-reduced-motion` queda 100% manual. Controles ◂ ▸ + scroll/teclado:
 * el carrusel nunca es la única forma de llegar a los proyectos.
 */
export function ProjectCarousel() {
  const { t, lang } = useLang();
  const reduce = usePrefersReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const paused = hover || focus;

  const items = [...t.projects.items].sort(
    (a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99),
  );

  /** Ancho de avance = una card + gap (cae con gracia a ~80% del viewport). */
  const step = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector("li");
    return card ? card.getBoundingClientRect().width + GAP : el.clientWidth * 0.8;
  }, []);

  const scrollByDir = useCallback(
    (dir: number) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollBy({ left: step() * dir, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce, step],
  );

  useEffect(() => {
    if (reduce || paused) return;
    const el = trackRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12;
      if (nearEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: step(), behavior: "smooth" });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, paused, step]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setFocus(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false);
      }}
    >
      {/* Cabecera + controles manuales */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">{t.projects.kicker}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            aria-label={lang === "en" ? "Previous projects" : "Proyectos anteriores"}
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            aria-label={lang === "en" ? "Next projects" : "Siguientes proyectos"}
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Pista scroll-snap */}
      <ul ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {items.map((p) => {
          const accent = accentMap[p.accent];
          const cover = projectMedia[p.id]?.cover;
          const links = t.caseStudies[p.id]?.links;
          return (
            <li key={p.id} className="flex w-[85%] shrink-0 snap-start sm:w-[58%] lg:w-[47%]">
              <MenuFrame
                title={lang === "en" ? "PROJECT" : "PROYECTO"}
                accent={p.accent}
                stamp={`0${ORDER.indexOf(p.id) + 1}`}
                headingLevel="none"
                className="flex h-full w-full flex-col px-5 pb-5 pt-7"
              >
                {/* imagen / placeholder con estado */}
                <div className="relative mb-4 h-36 overflow-hidden rounded-lg border border-border">
                  {cover ? (
                    <>
                      <Image
                        src={cover}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 80vw"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="relative grid h-full w-full place-items-center bg-grid px-4">
                      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} to-transparent`} />
                      <span className="relative text-balance text-center font-pixel text-sm uppercase leading-snug text-foreground/85">
                        {p.title}
                      </span>
                    </div>
                  )}
                  {p.badge && (
                    <span className={`absolute left-2 top-2 rounded-full border px-2 py-0.5 text-[10px] font-medium ${accent.badge}`}>
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* tipo de producto + título */}
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${accent.dot}`} />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.tagline}</span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight">{p.title}</h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.description}</p>

                <p className="mt-2.5 line-clamp-2 text-[13px] leading-snug text-foreground/80">
                  <span className="font-semibold text-accent-2">{lang === "en" ? "My role: " : "Mi aporte: "}</span>
                  {p.contribution}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-border bg-white/3 px-2 py-0.5 font-mono text-[10px] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs: caso de estudio + demo/código (o repo privado) */}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                  <Link
                    href={`/${lang}/proyectos/${p.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-2 transition-colors hover:text-foreground"
                  >
                    {t.cta.caseStudy}
                    <ArrowUpRight size={15} />
                  </Link>
                  {links?.demo && (
                    <a
                      href={links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent-2"
                    >
                      <ExternalLink size={13} /> {t.cta.demo}
                    </a>
                  )}
                  {links?.repo ? (
                    <a
                      href={links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent-2"
                    >
                      <FaGithub size={13} /> {t.cta.code}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted/55" title={t.caseStudyLabels.mockupNote}>
                      <Lock size={12} /> {t.cta.privateRepo}
                    </span>
                  )}
                </div>
              </MenuFrame>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
