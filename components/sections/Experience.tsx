"use client";

import { m } from "framer-motion";
import { GraduationCap, Award, Briefcase } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";

export function Experience() {
  const { t } = useLang();

  return (
    <section id="experiencia" className="mx-auto max-w-5xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.experience.kicker} title={t.experience.heading} />

      <div className="relative mt-12 pl-8 sm:pl-10">
        {/* línea vertical con relleno animado */}
        <div className="absolute left-1.75 top-2 bottom-2 w-px bg-border sm:left-2.25" />
        <m.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute left-1.75 top-2 bottom-2 w-px bg-linear-to-b from-accent to-accent-2 sm:left-2.25"
        />

        <div className="space-y-10">
          {t.experience.items.map((item, i) => (
            <Reveal key={item.company} delay={i * 0.05} className="relative">
              {/* nodo */}
              <span
                className={`absolute -left-8 top-1.5 grid h-4 w-4 place-items-center border-2 sm:-left-10 ${
                  item.current ? "border-accent-2 bg-accent-2" : "border-accent bg-background"
                }`}
              >
                {item.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping bg-accent-2 opacity-60" />
                )}
              </span>

              <MenuFrame
                title={item.company}
                icon={Briefcase}
                accent={item.current ? "emerald" : "cyan"}
                headingLevel="none"
                className="px-5 pb-5 pt-7 sm:px-6 sm:pb-6"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  {item.current && (
                    <span className="border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                      ● Now
                    </span>
                  )}
                </div>
                <div className="mt-0.5 font-mono text-sm text-muted">{item.period}</div>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-accent-2" />
                      {b}
                    </li>
                  ))}
                </ul>
                {item.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-white/3 px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </MenuFrame>
            </Reveal>
          ))}

          {/* Educación / certificaciones */}
          <Reveal className="relative">
            <span className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center border-2 border-accent bg-background sm:-left-10">
              <GraduationCap size={9} className="text-accent" />
            </span>
            <MenuFrame title="EDU" icon={GraduationCap} accent="amber" headingLevel="none" className="px-5 pb-5 pt-7 sm:px-6 sm:pb-6">
              <h3 className="text-lg font-semibold">{t.experience.education.title}</h3>
              <p className="mt-0.5 font-mono text-sm text-accent-2">{t.experience.education.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.experience.education.certs.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 border border-border bg-white/3 px-3 py-1 text-xs text-muted"
                  >
                    <Award size={13} className="text-accent-2" />
                    {c}
                  </span>
                ))}
              </div>
            </MenuFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
