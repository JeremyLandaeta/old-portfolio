"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { projectMedia } from "@/lib/projectMedia";
import type { Project } from "@/lib/content";

const ROTATE_MS = 5200;

const accentMap: Record<Project["accent"], { dot: string; badge: string; glow: string }> = {
  blue: { dot: "bg-blue-400", badge: "text-blue-300 border-blue-400/30 bg-blue-400/10", glow: "from-blue-500/20" },
  cyan: { dot: "bg-cyan-400", badge: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10", glow: "from-cyan-500/20" },
  violet: { dot: "bg-violet-400", badge: "text-violet-300 border-violet-400/30 bg-violet-400/10", glow: "from-violet-500/20" },
  emerald: { dot: "bg-emerald-400", badge: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10", glow: "from-emerald-500/20" },
};

export function Projects() {
  const { t, lang } = useLang();
  const items = t.projects.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();

  const featured = items[active];
  const accent = accentMap[featured.accent];
  const cover = projectMedia[featured.id]?.cover;

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <SectionHeading kicker={t.projects.kicker} title={t.projects.heading} />

      <div
        className="mt-10 grid gap-4 lg:grid-cols-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Card destacada (rota) */}
        <Reveal className="lg:col-span-3">
          <MenuFrame
            title={lang === "en" ? "FEATURED" : "DESTACADO"}
            accent={featured.accent}
            stamp="PROJECT"
            headingLevel="none"
            className="h-full min-h-95 px-7 pb-7 pt-8"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={featured.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col"
              >
                {cover && (
                  <div className="relative mb-5 h-40 overflow-hidden rounded-lg border border-border sm:h-48">
                    <Image
                      src={cover}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">{featured.tagline}</span>
                  </div>
                  {featured.badge && (
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${accent.badge}`}>
                      {featured.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 max-w-[68ch] flex-1 text-pretty leading-relaxed text-muted">{featured.description}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-border bg-white/3 px-2 py-1 font-mono text-[11px] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/${lang}/proyectos/${featured.id}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-2 transition-colors hover:text-foreground"
                >
                  {t.cta.caseStudy}
                  <ArrowUpRight size={16} />
                </Link>
              </m.div>
            </AnimatePresence>
          </MenuFrame>
        </Reveal>

        {/* Selector de proyectos */}
        <Reveal direction="left" className="lg:col-span-2">
          <div className="flex h-full flex-col gap-2">
            {items.map((p, i) => {
              const isActive = i === active;
              const a = accentMap[p.accent];
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={p.title}
                  className={`group relative flex-1 overflow-hidden rounded-none border px-4 py-3 text-left transition-all ${
                    isActive
                      ? "border-accent-2/50 glass"
                      : "border-border bg-white/2 opacity-70 hover:opacity-100 hover:border-accent-2/30"
                  }`}
                >
                  <CornerBrackets color="border-accent-2/70" size="h-2 w-2" />
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${a.dot}`} />
                    <span className="text-sm font-semibold">{p.title}</span>
                  </div>
                  <p className="mt-0.5 pl-4 text-xs text-muted">{p.tagline}</p>

                  {/* barra-timer 8-bit por bloques (su avance dispara el cambio) */}
                  {isActive && !reduce && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1.5 bg-white/10"
                      style={{
                        WebkitMaskImage:
                          "repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 14px)",
                        maskImage:
                          "repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 14px)",
                      }}
                    >
                      <span
                        key={active}
                        className="block h-full w-full bg-linear-to-r from-accent to-accent-2"
                        style={{
                          transformOrigin: "left",
                          animation: `progress-grow ${ROTATE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        onAnimationEnd={() => setActive((v) => (v + 1) % items.length)}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
