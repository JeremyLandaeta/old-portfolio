"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lightbulb, Target, Wrench, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

const accentDot: Record<string, string> = {
  blue: "bg-blue-400",
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
};

function Block({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-2xl glass p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent-2">
          {icon}
        </span>
        <h2 className="text-lg font-semibold">{label}</h2>
      </div>
      <div className="mt-4 text-pretty leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** Mockup placeholder estilo ventana de navegador (sin datos reales). */
function Mockup({ caption, title }: { caption: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background-soft">
      <div className="flex items-center gap-1.5 border-b border-border bg-white/[0.03] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted">{caption}</span>
      </div>
      <div className="relative grid h-44 place-items-center bg-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10" />
        <span className="relative px-4 text-center font-mono text-sm text-muted">{caption}</span>
        <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-muted/50">
          {title}
        </span>
      </div>
    </div>
  );
}

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const L = t.caseStudyLabels;
  const project = t.projects.items.find((p) => p.id === slug);
  const study = t.caseStudies[slug];

  if (!project || !study) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4 text-center">
        <div>
          <p className="font-mono text-6xl font-bold text-gradient">404</p>
          <p className="mt-4 text-lg text-muted">{L.notFound}</p>
          <Link
            href={`/${lang}#proyectos`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 font-semibold text-background"
          >
            <ArrowLeft size={16} /> {L.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="relative">
      <ReadingProgress />

      {/* Hero del caso */}
      <header className="relative overflow-hidden px-4 pt-28 pb-12 sm:pt-32">
        <AuroraBackground className="opacity-70" />
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${lang}#proyectos`}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-2"
          >
            <ArrowLeft size={15} /> {L.back}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted">
              <span className={`h-2 w-2 rounded-full ${accentDot[project.accent]}`} />
              {project.tagline}
            </span>
            {project.badge && (
              <span className="rounded-full border border-accent-2/30 bg-accent-2/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-2">
                {project.badge}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {study.links && (study.links.demo || study.links.repo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {study.links.demo && (
                <a
                  href={study.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  {L.viewDemo} <ArrowUpRight size={16} />
                </a>
              )}
              {study.links.repo && (
                <a
                  href={study.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border glass px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent-2"
                >
                  <FaGithub size={16} /> {L.viewRepo}
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Cuerpo */}
      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-8">
        <Block icon={<Target size={18} />} label={L.problem}>
          <p>{study.problem}</p>
        </Block>

        <Block icon={<Lightbulb size={18} />} label={L.context}>
          <p>{study.context}</p>
        </Block>

        <Block icon={<CheckCircle2 size={18} />} label={L.role}>
          <Bullets items={study.role} />
        </Block>

        <Block icon={<Wrench size={18} />} label={L.solution}>
          <Bullets items={study.solution} />
        </Block>

        {/* Galería de mockups */}
        <Reveal className="rounded-2xl glass p-6">
          <h2 className="text-lg font-semibold">{L.gallery}</h2>
          <p className="mt-1 font-mono text-xs text-muted">{L.mockupNote}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {study.gallery.map((cap) => (
              <Mockup key={cap} caption={cap} title={project.title} />
            ))}
          </div>
        </Reveal>

        <Block icon={<Lightbulb size={18} />} label={L.learnings}>
          <Bullets items={study.learnings} />
        </Block>

        {/* Resultado destacado */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent-2/30 bg-gradient-to-br from-accent/10 to-accent-2/10 p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-2/20 text-accent-2">
                <CheckCircle2 size={18} />
              </span>
              <h2 className="text-lg font-semibold">{L.result}</h2>
            </div>
            <p className="mt-4 text-pretty text-lg leading-relaxed">{study.result}</p>
          </div>
        </Reveal>

        {/* Volver */}
        <Reveal className="pt-4 text-center">
          <Link
            href={`/${lang}#proyectos`}
            className="inline-flex items-center gap-2 rounded-full border border-border glass px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent-2"
          >
            <ArrowLeft size={16} /> {L.back}
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
