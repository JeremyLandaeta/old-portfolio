"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPlate } from "@/components/ui/StatusPlate";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import type { Project } from "@/lib/content";
import { projectMedia } from "@/lib/projectMedia";
import { projectPath } from "@/lib/site";

const groupLabel = "font-pixel text-[0.6rem] uppercase leading-relaxed text-straw";
const categoryLabel = "font-pixel text-[0.5rem] uppercase leading-relaxed text-straw";

/**
 * Proyectos en tres niveles: el primero de los principales manda (marco grueso,
 * captura grande), los otros principales lo acompañan con su foto y el resto va
 * en un carrusel de fichas compactas que se mueve con las flechas. Los
 * principales son los que tienen captura para mostrar: se marcan con
 * `featured: true` en lib/content.ts y el orden lo da `priority`.
 */
export function Projects() {
  const { t } = useLang();
  const projects = t.projects.items.toSorted((a, b) => a.priority - b.priority);
  const [lead, ...featured] = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.projects.kicker} title={t.projects.heading} />

      <Reveal className="mt-12">
        <h3 className={groupLabel}>{t.projects.featuredLabel}</h3>
      </Reveal>

      {lead && (
        <Reveal className="mt-7">
          <LeadProject project={lead} />
        </Reveal>
      )}

      <ul className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
        {featured.map((project, index) => (
          <Reveal as="li" key={project.id} order={index}>
            <FeaturedProject project={project} />
          </Reveal>
        ))}
      </ul>

      {others.length > 0 && (
        <Reveal className="mt-16">
          <ProjectCarousel projects={others} />
        </Reveal>
      )}
    </section>
  );
}

/** El principal: la única pieza de la sección con marco grueso y botón lleno. */
function LeadProject({ project }: { project: Project }) {
  const { t, lang } = useLang();
  const cover = projectMedia[project.id]?.cover;

  return (
    <MenuFrame
      title={t.projects.categoryLabels[project.category]}
      headingLevel="none"
      className="px-5 pb-6 pt-8 sm:px-7 sm:pb-7"
    >
      <div className="grid items-center gap-7 lg:grid-cols-[1.3fr_1fr] lg:gap-9">
        {cover && (
          <div className="relative aspect-video overflow-hidden border border-border bg-background">
            <Image
              src={cover}
              alt={`${t.caseStudyLabels.shotOf} ${project.title}`}
              fill
              sizes="(min-width: 1024px) 620px, 92vw"
              className="select-none object-cover object-top"
            />
          </div>
        )}

        <div className="min-w-0">
          <StatusPlate status={project.status} />
          <h4 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{project.title}</h4>
          <p className="mt-2 font-mono text-xs text-accent-2">{project.tagline}</p>
          <p className="mt-4 text-pretty text-lg leading-snug">{project.description}</p>
          <Contribution project={project} className="mt-3" />
          <TagLine tags={project.tags} />

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href={projectPath(lang, project.id)} className="btn-pixel">
              {t.cta.caseStudy}
            </Link>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </MenuFrame>
  );
}

/** Los otros principales: mismo contenido, marco liviano. */
function FeaturedProject({ project }: { project: Project }) {
  const { t, lang } = useLang();
  const media = projectMedia[project.id];

  return (
    <MenuFrame
      title={t.projects.categoryLabels[project.category]}
      headingLevel="none"
      weight="thin"
      className="flex h-full flex-col px-5 pb-5 pt-7"
    >
      {media?.cover && (
        <div className="relative mb-5 aspect-16/10 overflow-hidden border border-border bg-background">
          <Image
            src={media.cover}
            alt={`${t.caseStudyLabels.shotOf} ${project.title}`}
            fill
            sizes="(min-width: 768px) 45vw, 92vw"
            className="select-none object-cover object-top"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* sin capturas públicas: el emblema va chico junto al título, no en una ventana vacía */}
        {!media?.cover && media?.emblem && (
          <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center border border-border bg-background">
            <PixelSprite name={media.emblem} cell={4} />
          </span>
        )}
        <div className="min-w-0">
          <StatusPlate status={project.status} />
          <h4 className="mt-3 text-2xl font-bold leading-tight">{project.title}</h4>
          <p className="mt-1 font-mono text-xs text-accent-2">{project.tagline}</p>
        </div>
      </div>

      <Contribution project={project} className="mt-4" />
      <TagLine tags={project.tags} />

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-5 gap-y-1 pt-5">
        <Link
          href={projectPath(lang, project.id)}
          aria-label={`${t.cta.caseStudy}: ${project.title}`}
          className="btn-pixel btn-pixel-ghost px-3 py-3 text-[0.55rem]"
        >
          {t.cta.caseStudy}
        </Link>
        <ProjectLinks project={project} />
      </div>
    </MenuFrame>
  );
}

/**
 * El resto de los proyectos. Avanza solo con las flechas (o arrastrando en
 * táctil): de a tantas fichas como entran completas en pantalla.
 */
function ProjectCarousel({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const reduce = usePrefersReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ prev: track.scrollLeft > 4, next: track.scrollLeft < max - 4 });
    };
    track.addEventListener("scroll", update, { passive: true });
    // el observer dispara al empezar a observar: deja el estado inicial al día
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first.offsetWidth + gap;
    const perPage = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    track.scrollBy({ left: direction * step * perPage, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-labelledby="more-projects-label">
      <div className="flex items-center justify-between gap-4 border-t-2 border-frame pt-6">
        <h3 id="more-projects-label" className={groupLabel}>
          {t.projects.moreLabel} <span className="text-muted">· {projects.length}</span>
        </h3>
        <div className="flex gap-2">
          <ArrowButton label={t.projects.prev} enabled={edges.prev} onClick={() => move(-1)} flip />
          <ArrowButton label={t.projects.next} enabled={edges.next} onClick={() => move(1)} />
        </div>
      </div>

      <ul
        ref={trackRef}
        className="carousel-track -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {projects.map((project) => (
          <li
            key={project.id}
            className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <CarouselCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Flecha del carrusel. En un extremo queda apagada pero no pierde el foco. */
function ArrowButton({
  label,
  enabled,
  onClick,
  flip = false,
}: {
  label: string;
  enabled: boolean;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={!enabled}
      onClick={enabled ? onClick : undefined}
      className={`grid h-11 w-11 place-items-center border-2 transition-colors ${
        enabled
          ? "border-frame text-accent hover:border-accent hover:text-flame"
          : "cursor-default border-border text-muted/40"
      }`}
    >
      <span aria-hidden className={`cursor-mark ${flip ? "-scale-x-100" : ""}`} />
    </button>
  );
}

/**
 * Ficha del carrusel: compacta y pareja. Las fotos grandes son de los
 * principales; acá va una miniatura (o el emblema) junto al título.
 */
function CarouselCard({ project }: { project: Project }) {
  const { t, lang } = useLang();
  const media = projectMedia[project.id];

  return (
    <article className="flex h-full flex-col border border-border bg-background-soft p-4">
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden
          className="emblem-stage relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden border border-border"
        >
          {media?.cover ? (
            <Image src={media.cover} alt="" fill sizes="56px" className="select-none object-cover object-top" />
          ) : (
            media?.emblem && <PixelSprite name={media.emblem} cell={3} />
          )}
        </span>
        <div className="min-w-0">
          <span className={categoryLabel}>{t.projects.categoryLabels[project.category]}</span>
          <h4 className="mt-1.5 text-xl font-bold leading-tight">{project.title}</h4>
        </div>
      </div>

      <div className="mt-4">
        <StatusPlate status={project.status} />
      </div>
      <p className="mt-2 font-mono text-xs text-accent-2">{project.tagline}</p>
      <Contribution project={project} className="mt-3" />
      <TagLine tags={project.tags} />

      <div className="mt-auto pt-3">
        <ProjectLinks project={project} />
        <Link
          href={projectPath(lang, project.id)}
          aria-label={`${t.cta.caseStudy}: ${project.title}`}
          className="inline-flex min-h-11 items-center gap-2.5 font-pixel text-[0.55rem] uppercase text-muted transition-colors hover:text-flame"
        >
          <span aria-hidden className="cursor-mark text-accent" />
          {t.cta.caseStudy}
        </Link>
      </div>
    </article>
  );
}

/** "Qué soluciona" en los proyectos propios; "Mi aporte" en los compartidos. */
function Contribution({ project, className = "" }: { project: Project; className?: string }) {
  const { t } = useLang();
  return (
    <p className={`text-pretty leading-snug text-foreground/85 ${className}`}>
      <span className="italic text-straw">{project.own ? t.projects.solvesLabel : t.projects.contribution}: </span>
      {project.contribution}
    </p>
  );
}

function TagLine({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-line mt-4">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLang();
  const links = t.caseStudies[project.id]?.links;
  const linkClass = "inline-flex min-h-11 items-center gap-1.5 text-foreground transition-colors hover:text-accent";

  return (
    <p className="flex flex-wrap items-center gap-x-4 font-mono text-xs text-muted">
      {links?.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${t.cta.demo}: ${project.title}`}
          className={linkClass}
        >
          <ExternalLink size={13} aria-hidden /> {t.cta.demo}
        </a>
      )}
      {links?.repo ? (
        <a
          href={links.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${t.cta.code}: ${project.title}`}
          className={linkClass}
        >
          <FaGithub size={13} aria-hidden /> {t.cta.code}
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center gap-1.5">
          <Lock size={12} aria-hidden /> {t.cta.privateRepo}
        </span>
      )}
    </p>
  );
}
