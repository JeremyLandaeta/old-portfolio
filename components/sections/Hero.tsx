"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Magnetic } from "@/components/ui/Magnetic";
import { AgeCounter } from "@/components/ui/AgeCounter";
import { PixelAvatar } from "@/components/ui/PixelAvatar";
import { BIRTH_DATE } from "@/lib/content";
import { PLAYER_LEVEL } from "@/lib/gamer";

const easing = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center"
    >
      <AuroraBackground />

      {/* Player card pixel-art */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easing }}
        className="relative mb-7"
      >
        <div className="relative rounded-2xl glass p-2.5">
          <PixelAvatar cell={7} className="pixel-idle" />
          {/* indicador online */}
          <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />
          </span>
        </div>
        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent-2/30 bg-background px-2.5 py-0.5 font-mono text-[10px] font-semibold text-accent-2">
          Lv. {PLAYER_LEVEL}
        </span>
      </motion.div>

      {/* Badge disponibilidad */}
      <motion.div
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
      </motion.div>

      {/* Nombre */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easing }}
        className="text-shimmer mt-6 max-w-4xl text-balance break-words text-[2rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
      >
        {t.hero.name}
      </motion.h1>

      {/* Rol con efecto scramble */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: easing }}
        className="mt-4 flex h-10 items-center justify-center font-mono text-xl sm:text-2xl md:text-3xl"
      >
        <span className="text-muted">&lt;</span>
        <ScrambleText words={t.hero.roles} className="text-gradient-animated mx-2 min-w-[1ch] font-semibold" />
        <span className="text-muted">/&gt;</span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: easing }}
        className="mt-6 max-w-2xl text-pretty text-base text-muted sm:text-lg"
      >
        {t.hero.tagline}
      </motion.p>

      {/* CTAs magnéticos */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: easing }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic>
          <a
            href="#proyectos"
            className="btn-glow btn-shine group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-background"
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
      </motion.div>

      {/* Social + ubicación */}
      <motion.div
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
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span
          className="flex items-center gap-1.5 font-mono text-sm tabular-nums"
          title={t.about.ageCaption}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
          <AgeCounter birth={BIRTH_DATE} decimals={9} className="text-foreground" />
          <span>{t.about.ageLabel}</span>
        </span>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
