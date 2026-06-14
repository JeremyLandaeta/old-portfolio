"use client";

import { Mail, Download, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Meteors } from "@/components/ui/Meteors";
import { SOCIALS } from "@/lib/content";

// Estatico: solo referencia imports de modulo (SOCIALS e iconos), no usa t/props/estado.
const links = [
  { label: "Email", value: SOCIALS.email, href: `mailto:${SOCIALS.email}`, Icon: Mail },
  { label: "LinkedIn", value: "in/jeremy-landaeta-lizama", href: SOCIALS.linkedin, Icon: FaLinkedin, external: true },
  { label: "GitHub", value: "JeremyLandaeta", href: SOCIALS.github, Icon: FaGithub, external: true },
];

export function Contact() {
  const { t } = useLang();

  return (
    <section id="contacto" className="relative overflow-hidden px-4 py-20 sm:py-28">
      <AuroraBackground className="opacity-50" />
      <Meteors number={16} className="-z-10" />

      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading kicker={t.contact.kicker} title={t.contact.heading} align="center" />

        <Reveal delay={0.1}>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.contact.available}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted">{t.contact.description}</p>
        </Reveal>

        {/* CTA principal */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SOCIALS.email}`}
              className="btn-shine flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
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

        {/* Links */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {links.map((link, i) => (
            <Reveal key={link.label} delay={0.25 + i * 0.06}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="group flex h-full flex-col items-center gap-1 rounded-2xl glass p-5 transition-colors hover:border-accent-2"
              >
                <link.Icon size={22} className="text-accent-2" />
                <span className="mt-1 flex items-center gap-1 text-sm font-medium">
                  {link.label}
                  <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="break-all text-xs text-muted">{link.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
