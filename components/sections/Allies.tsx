"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { ALLIES } from "@/lib/allies";

/**
 * Aliados: la "party". Una ficha por persona con la ilustración de su clase, su
 * build (stack) y sus misiones (proyectos), más el enlace a su portafolio. Quien
 * tiene una distinción especial (el guía) la lleva bajo el rol. Los enlaces salen sin
 * `noreferrer` a propósito: así su sitio puede ver que la visita viene de aquí.
 */
export function Allies() {
  const { t, lang } = useLang();
  const a = t.allies;

  return (
    <section id="aliados" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={a.kicker} title={a.heading} />
      <Reveal order={1}>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">{a.intro}</p>
      </Reveal>

      <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {ALLIES.map((ally, i) => (
          <Reveal as="li" key={ally.id} order={i}>
            <MenuFrame
              title={ally.archetype[lang]}
              accent={ally.accent}
              headingLevel="none"
              weight="thin"
              className="flex h-full flex-col px-5 pb-5 pt-7 xl:px-4"
            >
              {/* Ilustraciones de ~750x537 px (proporción 7:5): se muestran reducidas,
                  por eso van con el suavizado normal y no con `pixelated`. */}
              <div className="relative mb-4 aspect-7/5 overflow-hidden border border-border bg-background">
                <Image
                  src={ally.image}
                  alt={ally.imageAlt[lang]}
                  fill
                  sizes="(min-width: 1280px) 240px, (min-width: 768px) 46vw, 90vw"
                  draggable={false}
                  className="select-none object-cover"
                />
              </div>

              <h3 className="text-xl font-bold leading-tight">{ally.name}</h3>
              <p className="mt-1 font-mono text-xs text-accent-2">{ally.role[lang]}</p>
              {ally.bond && <p className="mt-2 italic text-straw">{ally.bond[lang]}</p>}
              <p className="mt-2 text-pretty leading-relaxed text-foreground/85">{ally.line[lang]}</p>

              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="font-pixel text-[0.5rem] uppercase text-straw">{a.buildLabel}</dt>
                  <dd className="mt-2.5">
                    <ul className="tag-line">
                      {ally.build.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-pixel text-[0.5rem] uppercase text-straw">{a.questsLabel}</dt>
                  <dd className="mt-1.5 text-sm text-foreground/85">{ally.quests.join(" · ")}</dd>
                </div>
              </dl>

              <div className="mt-auto flex items-center justify-between gap-2 pt-6">
                <a
                  href={ally.url}
                  target="_blank"
                  rel="noopener"
                  className="btn-pixel btn-pixel-ghost whitespace-nowrap px-3 py-2.5 text-[0.55rem] xl:px-2.5"
                >
                  {a.visit}
                  <ArrowUpRight size={14} aria-hidden className="xl:hidden" />
                </a>
                <span className="flex items-center text-muted">
                  {ally.github && (
                    <a
                      href={ally.github}
                      target="_blank"
                      rel="noopener"
                      aria-label={`GitHub — ${ally.name}`}
                      className="p-2 transition-colors hover:text-accent-2 xl:p-1.5"
                    >
                      <FaGithub size={16} />
                    </a>
                  )}
                  {ally.linkedin && (
                    <a
                      href={ally.linkedin}
                      target="_blank"
                      rel="noopener"
                      aria-label={`LinkedIn — ${ally.name}`}
                      className="p-2 transition-colors hover:text-accent-2 xl:p-1.5"
                    >
                      <FaLinkedin size={16} />
                    </a>
                  )}
                </span>
              </div>
            </MenuFrame>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
