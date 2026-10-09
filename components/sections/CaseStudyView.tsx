"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { StatusPlate } from "@/components/ui/StatusPlate";
import { projectMedia } from "@/lib/projectMedia";
import { projectPath } from "@/lib/site";

const accentDot: Record<string, string> = {
  blue: "bg-accent",
  cyan: "bg-crystal",
  violet: "bg-flame",
  emerald: "bg-moss",
};

const labelClass = "font-pixel text-[0.6rem] uppercase leading-relaxed text-straw";

/** Apartado del expediente: etiqueta pixel a la izquierda y el texto al lado. */
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-x-8 gap-y-3 border-t-2 border-frame py-7 sm:grid-cols-[9.5rem_1fr]">
      <h2 className={`${labelClass} sm:pt-1.5`}>{label}</h2>
      <div className="text-pretty text-lg leading-relaxed text-foreground/85">{children}</div>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 bg-accent" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const L = t.caseStudyLabels;
  const project = t.projects.items.find((p) => p.id === slug);
  const study = t.caseStudies[slug];
  const shots = projectMedia[slug]?.shots;

  if (!project || !study) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4 text-center">
        <div>
          <p className="title-pixel text-5xl">404</p>
          <p className="mt-4 text-lg text-muted">{L.notFound}</p>
          <Link
            href={`/${lang}#proyectos`}
            className="btn-pixel mt-6"
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
      <header className="relative overflow-hidden pt-28 pb-12 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href={`/${lang}#proyectos`}
            className="-my-1.5 inline-flex items-center gap-1.5 py-1.5 text-sm text-muted transition-colors hover:text-accent-2"
          >
            <ArrowLeft size={15} /> {L.back}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted">
              <span className={`h-2 w-2 ${accentDot[project.accent]}`} />
              {project.tagline}
            </span>
            <StatusPlate status={project.status} />
          </div>

          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
            {t.projects.categoryLabels[project.category]}
          </p>

          <h1 className="title-pixel mt-4 text-balance text-lg leading-normal sm:text-2xl">
            {project.title}
          </h1>

          <ul className="tag-line mt-5">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          {study.links && (study.links.demo || study.links.repo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {study.links.demo && (
                <a
                  href={study.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pixel"
                >
                  {L.viewDemo} <ArrowUpRight size={16} />
                </a>
              )}
              {study.links.repo && (
                <a
                  href={study.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pixel btn-pixel-ghost"
                >
                  <FaGithub size={16} /> {L.viewRepo}
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Cuerpo: un expediente continuo, no una pila de tarjetas */}
      <div className="mx-auto max-w-3xl px-4 pb-8">
        <Block label={L.problem}>
          <p>{study.problem}</p>
        </Block>

        <Block label={L.context}>
          <p>{study.context}</p>
        </Block>

        {study.objective ? (
          <Block label={L.objective}>
            <p>{study.objective}</p>
          </Block>
        ) : null}

        <Block label={L.role}>
          <Bullets items={study.role} />
        </Block>

        {study.architecture ? (
          <Block label={L.architecture}>
            <Bullets items={study.architecture} />
          </Block>
        ) : null}

        <ArchitectureFlow slug={slug} lang={lang} />

        <Block label={L.solution}>
          <Bullets items={study.solution} />
        </Block>

        {study.challenges ? (
          <Block label={L.challenges}>
            <Bullets items={study.challenges} />
          </Block>
        ) : null}

        {/* Galería: solo capturas reales. Los proyectos confidenciales o sin
            publicar no tienen galería; no se inventan maquetas. */}
        {shots && (
          <Reveal as="section" className="border-t-2 border-frame py-7">
            <h2 className={labelClass}>{L.gallery}</h2>
            <p className="mt-2 italic text-muted">{L.liveNote}</p>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {study.gallery.map((cap, i) =>
                shots[i] ? (
                  <figure key={cap}>
                    <div className="relative aspect-16/10 overflow-hidden border border-border bg-background">
                      <Image
                        src={shots[i]}
                        alt={`${L.shotOf} ${project.title}: ${cap}`}
                        fill
                        sizes="(min-width: 800px) 360px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-2 font-mono text-xs text-muted">{cap}</figcaption>
                  </figure>
                ) : null,
              )}
            </div>
          </Reveal>
        )}

        <Block label={L.learnings}>
          <Bullets items={study.learnings} />
        </Block>

        {/* Resultado destacado */}
        <Reveal className="mt-6">
          <MenuFrame title={L.result} accent="ember" headingLevel={2} className="px-5 pb-6 pt-8 sm:px-7">
            <p className="text-pretty text-xl leading-relaxed">{study.result}</p>
          </MenuFrame>
        </Reveal>

        {/* Enlaces cruzados al resto de los casos de estudio */}
        <Reveal className="mt-12">
          <nav aria-labelledby="more-projects">
            <h2 id="more-projects" className={labelClass}>
              {L.more}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {t.projects.items
                .filter((p) => p.id !== slug)
                .map((p) => (
                  <li key={p.id}>
                    <Link
                      href={projectPath(lang, p.id)}
                      className="group flex items-center justify-between gap-3 border-2 border-frame bg-background-soft px-4 py-3 transition-colors hover:border-accent"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-bold">{p.title}</span>
                        <span className="block truncate font-mono text-[11px] text-muted">{p.tagline}</span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-muted transition-colors group-hover:text-accent"
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </Reveal>

        {/* Volver */}
        <Reveal className="pt-10 text-center">
          <Link
            href={`/${lang}#proyectos`}
            className="btn-pixel btn-pixel-ghost"
          >
            <ArrowLeft size={16} /> {L.back}
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

function ArchitectureFlow({ slug, lang }: { slug: string; lang: "es" | "en" }) {
  const flows: Record<string, Record<"es" | "en", string[]>> = {
    fcc: {
      es: ["Interfaz + formularios", "Casos de uso + Zod", "Prisma + transacciones", "PostgreSQL"],
      en: ["UI + forms", "Use cases + Zod", "Prisma + transactions", "PostgreSQL"],
    },
    orbix: {
      es: ["WhatsApp", "Webhook: valida y encola", "Flujo guiado o IA + documentos", "Derivación + Odoo"],
      en: ["WhatsApp", "Webhook: validate & enqueue", "Guided flow or AI + documents", "Handoff + Odoo"],
    },
    dixta: {
      es: ["Fuentes", "Python + Scrapling", "Laravel + colas + DeepSeek", "Revisión humana"],
      en: ["Sources", "Python + Scrapling", "Laravel + queues + DeepSeek", "Human review"],
    },
  };
  const steps = flows[slug]?.[lang];
  if (!steps) return null;

  return (
    <Reveal as="section" className="border-t-2 border-frame py-7">
      <h2 className="sr-only">{lang === "es" ? "Flujo de arquitectura" : "Architecture flow"}</h2>
      <ol className="grid gap-2 sm:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step} className="relative border-2 border-frame bg-background-soft px-3 py-4 text-center font-mono text-xs leading-relaxed text-foreground">
            <span className="mb-2 block font-pixel text-[0.5rem] text-accent-2">{String(index + 1).padStart(2, "0")}</span>
            {step}
            {index < steps.length - 1 ? <span aria-hidden className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 bg-background px-1 text-accent sm:block">→</span> : null}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
