"use client";

import { m } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Magnetic } from "@/components/ui/Magnetic";

const easing = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center"
    >
      <AuroraBackground />

      {/* Badge disponibilidad */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        className="flex max-w-[90vw] items-center gap-2 rounded-full glass px-4 py-1.5 text-center text-xs text-muted sm:text-sm"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {t.hero.badge}
      </m.div>

      {/* Nombre */}
      <m.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easing }}
        className="text-shimmer mt-6 max-w-4xl text-balance break-words text-[2rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
      >
        {t.hero.name}
      </m.h1>

      {/* Rol con efecto scramble */}
      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: easing }}
        className="mt-4 flex h-10 items-center justify-center font-mono text-xl sm:text-2xl md:text-3xl"
      >
        <span className="text-muted">&lt;</span>
        <ScrambleText words={t.hero.roles} className="text-gradient-animated mx-2 min-w-[1ch] font-semibold" />
        <span className="text-muted">/&gt;</span>
      </m.div>

      {/* Tagline */}
      <m.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: easing }}
        className="mt-6 max-w-2xl text-pretty text-base text-muted sm:text-lg"
      >
        {t.hero.tagline}
      </m.p>

      {/* CTAs magnéticos */}
      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: easing }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic>
          <a
            href="#proyectos"
            className="btn-glow btn-shine group flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background"
          >
            {t.cta.projects}
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={SOCIALS.cv}
            download
            className="flex items-center gap-2 rounded-full border border-border glass px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent-2"
          >
            <Download size={18} />
            {t.cta.cv}
          </a>
        </Magnetic>
      </m.div>

      {/* Social + ubicación */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-muted"
      >
        <a href={SOCIALS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent-2">
          <FaGithub size={20} />
        </a>
        <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent-2">
          <FaLinkedin size={20} />
        </a>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span className="flex items-center gap-1.5 text-sm">
          <MapPin size={15} /> {t.hero.location}
        </span>
      </m.div>

      {/* Scroll hint */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted"
        >
          <ArrowDown size={20} />
        </m.div>
      </m.div>
    </section>
  );
}
