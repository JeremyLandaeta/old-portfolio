"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SOCIALS, cvFile } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Magnetic } from "@/components/ui/Magnetic";
import { Typewriter } from "@/components/ui/Typewriter";
import { DecodeText } from "@/components/ui/DecodeText";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

const easing = [0.22, 1, 0.36, 1] as const;

// Líneas de "arranque" (neutras/tech, estilo consola). La última (whoami)
// encadena con el nombre, que aparece como su "respuesta".
const BOOT = ["> booting jeremy.dev ...... OK", "> whoami"] as const;

export function Hero() {
  const { t, lang } = useLang();
  const reduce = usePrefersReducedMotion();
  // step 0-1: tipeando boot · 2: tipeando nombre · 3: contenido revelado.
  const [step, setStep] = useState(reduce ? 3 : 0);
  // palabra más larga del stack → reserva de ancho para evitar layout shift.
  const longestStack = t.hero.stack.reduce((a, b) => (b.length > a.length ? b : a), "");

  // props de revelado. `at` = paso del intro en que aparece (3 = tras el nombre).
  const reveal = (delay: number, at = 3) => ({
    initial: { opacity: 0, y: 14 },
    animate: step >= at ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.5, delay: reduce ? 0 : delay, ease: easing },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center"
    >
      <AuroraBackground />

      {/* Badge de posicionamiento */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        className="flex max-w-[90vw] items-center gap-2 rounded-full glass px-4 py-1.5 text-center font-mono text-xs text-muted sm:text-sm"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {t.hero.badge}
      </m.div>

      {/* Secuencia de boot (terminal) — se limpia tras el whoami */}
      <AnimatePresence>
        {step < 2 && (
          <m.div
            key="boot"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: easing }}
            className="mt-6 min-h-[2.8em] font-mono text-xs leading-relaxed text-accent-2/70 sm:text-sm"
            aria-hidden
          >
            <div>
              <Typewriter text={BOOT[0]} start speed={26} onDone={() => setStep((s) => Math.max(s, 1))} />
            </div>
            <div>
              <Typewriter
                text={BOOT[1]}
                start={step >= 1}
                speed={26}
                onDone={() => setTimeout(() => setStep((s) => Math.max(s, 2)), 550)}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Nombre: 8-bit en pixel-font, revelado con decode tipo Matrix como
          "respuesta" a whoami. El nombre real va en sr-only para SEO/a11y. */}
      <h1 className="text-shimmer font-pixel mt-4 max-w-4xl text-balance wrap-break-word text-lg uppercase leading-[1.45] sm:text-2xl md:text-3xl">
        <span className="sr-only">{t.hero.name}</span>
        <span aria-hidden>
          <DecodeText
            text={t.hero.name}
            start={step >= 2}
            onDone={() => setStep((s) => Math.max(s, 3))}
          />
        </span>
      </h1>

      {/* Rol — título fijo (especialidad) + scramble del stack core */}
      <m.div
        {...reveal(0)}
        className="mt-5 flex min-h-[2.4em] flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-pixel text-xs leading-relaxed sm:text-sm md:text-base"
      >
        <span className="text-gradient-animated font-semibold">{t.hero.title}</span>
        <span className="inline-flex items-center whitespace-nowrap text-accent-2">
          <span className="text-muted">&lt;</span>
          {/* sizer invisible: reserva el ancho de la palabra más larga → sin salto */}
          <span className="mx-1.5 inline-grid font-semibold">
            <ScrambleText
              words={t.hero.stack}
              className="col-start-1 row-start-1 justify-self-center"
            />
            <span aria-hidden className="invisible col-start-1 row-start-1">
              {longestStack}
            </span>
          </span>
          <span className="text-muted">/&gt;</span>
        </span>
      </m.div>

      {/* Tagline — entra junto con el decode del nombre (paso 2), no después:
          es el texto más grande del hero y por tanto el LCP de la home. */}
      <m.p
        {...reveal(0, 2)}
        className="mt-6 max-w-2xl text-pretty font-mono text-sm text-muted sm:text-base"
      >
        {t.hero.tagline}
      </m.p>

      {/* CTAs magnéticos */}
      <m.div {...reveal(0.16)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
            href={cvFile(lang).href}
            download={cvFile(lang).name}
            className="flex items-center gap-2 rounded-full border border-border glass px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent-2"
          >
            <Download size={18} />
            {t.cta.cv}
          </a>
        </Magnetic>
      </m.div>

      {/* Social + ubicación */}
      <m.div
        {...reveal(0.24)}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-muted"
      >
        <a href={SOCIALS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="-m-2 p-2 transition-colors hover:text-accent-2">
          <FaGithub size={20} />
        </a>
        <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="-m-2 p-2 transition-colors hover:text-accent-2">
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
        animate={{ opacity: step >= 3 ? 1 : 0 }}
        transition={{ delay: reduce ? 0 : 0.4 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60">scroll</span>
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
