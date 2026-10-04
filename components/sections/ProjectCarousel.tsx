"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
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

type Slide = { key: string; project: Project | null };

/**
 * Carrusel de UNA card a la vez: se muestra un elemento y al avanzar hace un
 * swipe (sale por un lado y entra el siguiente por el otro). Auto-avanza en loop
 * infinito (índice módulo N), se pausa al pasar el mouse/enfocar/arrastrar,
 * permite arrastrar para cambiar, flechas y dots. Respeta prefers-reduced-motion.
 *
 * Con `leadingCard` (mobile) esa carta entra como primera slide y rota junto a
 * los proyectos; un "sizer" invisible con la carta fija el alto del viewport para
 * que todas las slides (incluidos los proyectos) midan lo mismo que la carta. Sin
 * `leadingCard` (desktop) muestra solo proyectos con slides absolutas que se
 * estiran a la altura de la columna vecina.
 */
export function ProjectCarousel({ leadingCard }: { leadingCard?: ReactNode }) {
  const { t, lang } = useLang();
  const reduce = usePrefersReducedMotion();
  const unified = Boolean(leadingCard);

  const projects = [...t.projects.items].sort(
    (a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99),
  );
  const projectSlides: Slide[] = projects.map((p) => ({ key: p.id, project: p }));
  const slides: Slide[] = unified
    ? [{ key: "__profile__", project: null }, ...projectSlides]
    : projectSlides;
  const total = slides.length;

  // [índice actual, dirección del último cambio] para animar el swipe.
  const [[index, dir], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (d: number) => setSlide(([i]) => [(i + d + total) % total, d >= 0 ? 1 : -1]),
    [total],
  );

  const goTo = useCallback((target: number) => {
    setSlide(([i]) => [target, target >= i ? 1 : -1]);
  }, []);

  // auto-avance
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setSlide(([i]) => [(i + 1) % total, 1]), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, paused, total]);

  const active = slides[index];

  const renderProject = (project: Project, slideNumber: number) => {
    const accent = accentMap[project.accent];
    const cover = projectMedia[project.id]?.cover;
    const links = t.caseStudies[project.id]?.links;
    return (
      // mt-3 + h-[calc(100%-0.75rem)]: baja el marco para que su etiqueta de
      // título (dibujada con -top, sobresaliendo del borde) no la recorte el
      // overflow-hidden del viewport, sin que el fondo se salga por abajo.
      <MenuFrame
        title={lang === "en" ? "PROJECT" : "PROYECTO"}
        accent={project.accent}
        stamp={`0${slideNumber} / 0${total}`}
        headingLevel="none"
        className="mt-3 flex h-[calc(100%-0.75rem)] w-full flex-col px-5 pb-5 pt-7"
      >
        {/* imagen / placeholder con estado — crece para llenar la card */}
        <div className="relative mb-4 min-h-40 flex-1 overflow-hidden rounded-lg border border-border">
          {cover ? (
            <>
              <Image
                src={cover}
                alt={`${t.caseStudyLabels.shotOf} ${project.title}`}
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
                {project.title}
              </span>
            </div>
          )}
          {project.badge && (
            <span className={`absolute left-2 top-2 rounded-full border px-2 py-0.5 text-[10px] font-medium ${accent.badge}`}>
              {project.badge}
            </span>
          )}
        </div>

        {/* tipo de producto + título */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${accent.dot}`} />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.tagline}</span>
        </div>
        <h3 className="mt-1.5 text-xl font-bold tracking-tight">{project.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>

        <p className="mt-2.5 text-[13px] leading-snug text-foreground/80">
          <span className="font-semibold text-accent-2">{lang === "en" ? "My role: " : "Mi aporte: "}</span>
          {project.contribution}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-border bg-white/3 px-2 py-0.5 font-mono text-[10px] text-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href={`/${lang}/proyectos/${project.id}`}
            draggable={false}
            className="-my-1 inline-flex items-center gap-1 py-1 text-sm font-semibold text-accent-2 transition-colors hover:text-foreground"
          >
            {t.cta.caseStudy}
            <ArrowUpRight size={15} />
          </Link>
          {links?.demo && (
            <a href={links.demo} target="_blank" rel="noreferrer" draggable={false} className="-my-1.5 inline-flex items-center gap-1 py-1.5 text-xs text-muted transition-colors hover:text-accent-2">
              <ExternalLink size={13} /> {t.cta.demo}
            </a>
          )}
          {links?.repo ? (
            <a href={links.repo} target="_blank" rel="noreferrer" draggable={false} className="-my-1.5 inline-flex items-center gap-1 py-1.5 text-xs text-muted transition-colors hover:text-accent-2">
              <FaGithub size={13} /> {t.cta.code}
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-muted/55" title={t.caseStudyLabels.mockupNote}>
              <Lock size={12} /> {t.cta.privateRepo}
            </span>
          )}
        </div>
      </MenuFrame>
    );
  };

  return (
    <div
      className={`relative flex flex-col ${unified ? "" : "h-full"}`}
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
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={s.project ? s.project.title : lang === "en" ? "Profile" : "Perfil"}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-accent-2" : "w-1.5 bg-border hover:bg-muted"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={lang === "en" ? "Previous" : "Anterior"}
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={lang === "en" ? "Next" : "Siguiente"}
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent-2 hover:text-foreground"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Viewport: una card a la vez, swipe entre slides */}
      {unified ? (
        // Mobile: un "sizer" invisible con la carta de perfil (la slide más alta)
        // fija el alto del viewport; las slides van en absolute y se estiran a ese
        // alto, así los proyectos quedan del mismo tamaño que la carta.
        <div className="relative">
          <div aria-hidden className="pointer-events-none invisible">
            {leadingCard}
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence custom={dir} initial={false}>
              <m.div
                key={active.key}
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
                {active.project ? renderProject(active.project, index + 1) : leadingCard}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // Desktop: slides absolutas que llenan la columna (alto = items-stretch).
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence custom={dir} initial={false}>
            <m.div
              key={active.key}
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
              {renderProject(active.project as Project, index + 1)}
            </m.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
