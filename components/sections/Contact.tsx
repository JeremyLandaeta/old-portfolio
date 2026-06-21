"use client";

import { Mail, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Meteors } from "@/components/ui/Meteors";
import { SOCIALS } from "@/lib/content";

/**
 * Cierre único del sitio: estética terminal (status + links) + CTA.
 * El <Footer> quedó reducido a créditos para no duplicar este bloque.
 */
export function Contact() {
  const { t } = useLang();

  return (
    <section id="contacto" className="relative overflow-hidden px-4 py-14 sm:py-28">
      <AuroraBackground className="opacity-50" />
      <Meteors number={16} className="-z-10" />

      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading kicker={t.contact.kicker} title={t.contact.heading} align="center" />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted">
            {t.contact.description}
          </p>
        </Reveal>

        {/* Terminal: status + links (único lugar de los links sociales abajo) */}
        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-background-soft text-left font-mono text-sm shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 border-b border-border bg-white/3 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-muted">jeremy@portfolio: ~/contacto</span>
            </div>

            <div className="space-y-1.5 p-4 leading-relaxed">
              <p>
                <span className="text-accent-2">$</span>{" "}
                <span className="text-muted">cat status.txt</span>
              </p>
              <p className="flex items-center gap-2 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t.contact.status}
              </p>

              <p className="pt-1">
                <span className="text-accent-2">$</span>{" "}
                <span className="text-muted">contact --links</span>
                <span className="cursor-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent-2" />
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent-2"
                >
                  <Mail size={15} /> email
                </a>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent-2"
                >
                  <FaGithub size={15} /> github
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent-2"
                >
                  <FaLinkedin size={15} /> linkedin
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA principal */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SOCIALS.email}`}
              className="btn-shine flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              <Mail size={18} />
              {t.contact.emailLabel}
            </a>
            <a
              href={SOCIALS.cv}
              download
              className="flex items-center gap-2 rounded-full border border-border glass px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent-2"
            >
              <Download size={18} />
              {t.cta.cv}
            </a>
          </div>
        </Reveal>

        {/* Nota GitHub — confidencialidad de repos laborales */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 rounded-xl border border-border bg-white/2 p-4 text-center sm:flex-row sm:text-left">
            <FaGithub size={22} className="shrink-0 text-accent-2" />
            <p className="flex-1 text-sm leading-relaxed text-muted">{t.github.note}</p>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-2 hover:text-accent-2"
            >
              <FaGithub size={15} /> {t.github.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
