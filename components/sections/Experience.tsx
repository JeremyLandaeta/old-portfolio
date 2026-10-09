"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const labelClass = "font-pixel text-[0.6rem] uppercase leading-relaxed text-straw";

export function Experience() {
  const { t } = useLang();

  return (
    <section id="experiencia" className="mx-auto max-w-5xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.experience.kicker} title={t.experience.heading} />

      <div className="relative mt-12 pl-8 sm:pl-10">
        {/* línea vertical con relleno animado */}
        <div className="absolute left-1.75 top-2 bottom-2 w-px bg-border sm:left-2.25" />
        <Reveal
          kind="grow"
          className="absolute left-1.75 top-2 bottom-2 w-px origin-top bg-linear-to-b from-accent to-accent-2 sm:left-2.25"
        />

        <div className="space-y-12">
          {t.experience.items.map((item, i) => (
            <Reveal key={item.company} order={i} className="relative">
              {/* nodo */}
              <span
                className={`absolute -left-8 top-0.5 grid h-4 w-4 place-items-center border-2 sm:-left-10 ${
                  item.current ? "border-accent-2 bg-accent-2" : "border-accent bg-background"
                }`}
              >
                {item.current && <span className="blink h-1.5 w-1.5 bg-background" />}
              </span>

              <p className={labelClass}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 underline decoration-frame underline-offset-4 transition-colors hover:text-flame hover:decoration-accent"
                  >
                    {item.company}
                    <ArrowUpRight size={11} aria-hidden />
                  </a>
                ) : (
                  item.company
                )}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h3 className="text-2xl font-bold leading-tight">{item.role}</h3>
                {item.current && <span className="plate bg-moss">Now</span>}
              </div>
              <p className="mt-1 font-mono text-sm text-muted">{item.period}</p>

              <ul className="mt-4 max-w-[72ch] space-y-2">
                {item.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-pretty leading-relaxed text-foreground/85">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              {item.tags && (
                <ul className="tag-line mt-4">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          {/* Educación / certificaciones */}
          <Reveal className="relative">
            <span className="absolute -left-8 top-0.5 h-4 w-4 border-2 border-straw bg-background sm:-left-10" />
            <p className={labelClass}>Edu</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight">{t.experience.education.title}</h3>
            <p className="mt-1 font-mono text-sm text-accent-2">{t.experience.education.subtitle}</p>
            <ul className="tag-line mt-4">
              {t.experience.education.certs.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
