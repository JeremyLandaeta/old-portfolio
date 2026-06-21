"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { projectMedia } from "@/lib/projectMedia";
import type { Project } from "@/lib/content";

/** Orden pensado para reclutadores: primero el mayor peso profesional. */
const ORDER = ["greensoft", "orbix", "lexy", "pagos", "landings", "portfolio"];
const AUTO_MS = 5200;
const easing = [0.22, 1, 0.36, 1] as const;

const accentMap: Record<Project["accent"], { dot: string; badge: string; glow: string }> = {
  blue: { dot: "bg-blue-400", badge: "text-blue-300 border-blue-400/30 bg-blue-400/10", glow: "from-blue-500/25" },
  cyan: { dot: "bg-cyan-400", badge: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10", glow: "from-cyan-500/25" },
  violet: { dot: "bg-violet-400", badge: "text-violet-300 border-violet-400/30 bg-violet-400/10", glow: "from-violet-500/25" },
  emerald: { dot: "bg-emerald-400", badge: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10", glow: "from-emerald-500/25" },
};

const variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
};

/**
 * Carrusel de UNA card a la vez: se muestra un proyecto y al avanzar hace un
 * swipe (la card sale por un lado y entra la siguiente por el otro). Auto-avanza
 * en loop infinito (índice módulo N), se pausa al pasar el mouse/enfocar/arrastrar,
 * permite arrastrar para cambiar, flechas y dots. Respeta prefers-reduced-motion.
 */
export function ProjectCarousel() {
  const { t, lang } = useLang();
  const reduce = usePrefersReducedMotion();

  const items = [...t.projects.items].sort(
    (a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99),
  );
  const n = items.length;

  // [índice actual, dirección del último cambio] para animar el swipe.
  const [[index, dir], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback((d: number) => {
    setSlide(([i]) => [(i + d + n) % n, d >= 0 ? 1 : -1]);
  }, [n]);

  const goTo = useCallback((target: number) => {
    setSlide(([i]) => [target, target >= i ? 1 : -1]);
  }, []);

  // auto-avance
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setSlide(([i]) => [(i + 1) % n, 1]), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, paused, n]);

  const p = items[index];
  const accent = accentMap[p.accent];
  const cover = projectMedia[p.id]?.cover;
  const links = t.caseStudies[p.id]?.links;

  return (
    <div
      className="relative flex h-full flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      {/* Cabecera: título + dots + flechas */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">{t.projects.kicker}</span>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            {items.map((it, i) => (
              <button
                key={it.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${lang === "en" ? "Go to project" : "Ir al proyecto"} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-accent-2" : "w-1.5 bg-border hover:bg-muted"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={lang === "en" ? "Previous project" : "Proyecto anterior"}
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={lang === "en" ? "Next project" : "Siguiente proyecto"}
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Viewport: una card a la vez, swipe entre proyectos */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence custom={dir} initial={false}>
          <m.div
            key={p.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { duration: reduce ? 0 : 0.5, ease: easing }, opacity: { duration: reduce ? 0 : 0.3 } }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -60) paginate(1);
              else if (info.offset.x > 60) paginate(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <MenuFrame
              title={lang === "en" ? "PROJECT" : "PROYECTO"}
              accent={p.accent}
              stamp={`0${index + 1} / 0${n}`}
              headingLevel="none"
              className="flex h-full w-full flex-col px-5 pb-5 pt-7"
            >
              {/* imagen / placeholder con estado — crece para llenar la card */}
              <div className="relative mb-4 min-h-40 flex-1 overflow-hidden rounded-lg border border-border">
                {cover ? (
                  <>
                    <Image
                      src={cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 90vw"
                      draggable={false}
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="relative grid h-full w-full place-items-center bg-grid px-4">
                    <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} to-transparent`} />
                    <span className="relative text-balance text-center font-pixel text-base uppercase leading-snug text-foreground/85">
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
              <h3 className="mt-1.5 text-xl font-bold tracking-tight">{p.title}</h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>

              <p className="mt-2.5 text-[13px] leading-snug text-foreground/80">
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

              {/* CTAs */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href={`/${lang}/proyectos/${p.id}`}
                  draggable={false}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent-2 transition-colors hover:text-foreground"
                >
                  {t.cta.caseStudy}
                  <ArrowUpRight size={15} />
                </Link>
                {links?.demo && (
                  <a href={links.demo} target="_blank" rel="noreferrer" draggable={false} className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent-2">
                    <ExternalLink size={13} /> {t.cta.demo}
                  </a>
                )}
                {links?.repo ? (
                  <a href={links.repo} target="_blank" rel="noreferrer" draggable={false} className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent-2">
                    <FaGithub size={13} /> {t.cta.code}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted/55" title={t.caseStudyLabels.mockupNote}>
                    <Lock size={12} /> {t.cta.privateRepo}
                  </span>
                )}
              </div>
            </MenuFrame>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
