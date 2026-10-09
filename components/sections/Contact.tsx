"use client";

import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CampfireScene } from "@/components/ui/CampfireScene";
import { SOCIALS, cvFile } from "@/lib/content";

/**
 * Cierre del sitio: un botón principal (escribir) y uno secundario (CV), la
 * nota de GitHub y de vuelta la fogata donde partió el recorrido. El <Footer>
 * queda solo con créditos y enlaces.
 */
export function Contact() {
  const { t, lang } = useLang();
  const cv = cvFile(lang);

  return (
    <section id="contacto" className="scene-end relative overflow-hidden px-4 pt-14 sm:pt-28">
      <div className="scene-end-content relative z-10 mx-auto max-w-2xl text-center">
        <SectionHeading kicker={t.contact.kicker} title={t.contact.heading} align="center" />

        <Reveal order={1}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted">{t.contact.description}</p>
          <p className="mt-4 flex items-center justify-center gap-2.5 italic text-straw">
            <span aria-hidden className="blink h-2 w-2 shrink-0 bg-accent" />
            {t.contact.status}
          </p>
        </Reveal>

        {/* una acción principal y una secundaria; LinkedIn queda de apoyo */}
        <Reveal order={2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${SOCIALS.email}`} className="btn-pixel">
              <Mail size={16} aria-hidden />
              {t.contact.emailLabel}
            </a>
            <a href={cv.href} download={cv.name} className="btn-pixel btn-pixel-ghost">
              <Download size={16} aria-hidden />
              {t.cta.cv}
            </a>
          </div>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 font-pixel text-[0.55rem] uppercase text-muted transition-colors hover:text-flame"
          >
            <FaLinkedin size={14} aria-hidden />
            LinkedIn
          </a>
        </Reveal>

        {/* GitHub con su contexto: por qué hay repos laborales que no son públicos */}
        <Reveal order={3}>
          <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 border border-border bg-background-soft p-4 sm:flex-row sm:text-left">
            <FaGithub size={22} aria-hidden className="shrink-0 text-accent-2" />
            <p className="flex-1 text-pretty leading-relaxed text-muted">{t.github.note}</p>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="btn-pixel btn-pixel-ghost shrink-0 px-3 py-2.5 text-[0.55rem]"
            >
              <FaGithub size={15} aria-hidden /> {t.github.cta}
            </a>
          </div>
        </Reveal>
      </div>

      <CampfireScene />
    </section>
  );
}
