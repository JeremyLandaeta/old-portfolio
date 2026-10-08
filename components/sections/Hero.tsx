"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { DecodeText } from "@/components/ui/DecodeText";
import { SOCIALS, cvFile } from "@/lib/content";

// Brasas que suben desde la fogata. Posiciones en % de la ilustración.
const EMBERS = [
  { left: "44.6%", delay: "0s", duration: "3.4s" },
  { left: "46.3%", delay: "0.9s", duration: "4.1s" },
  { left: "45.4%", delay: "1.7s", duration: "3.7s" },
  { left: "47.1%", delay: "2.6s", duration: "4.4s" },
  { left: "45.9%", delay: "3.3s", duration: "3.9s" },
];

/**
 * Hero como pantalla de título de un juego: la escena pixel-art ocupa todo el
 * ancho, el nombre es el logo y las dos acciones son el menú. La única luz es
 * la del fuego, y de ahí sale la paleta de todo el sitio.
 */
// false en el servidor y durante la hidratación; true una vez montado.
const subscribeNoop = () => () => {};

export function Hero() {
  const { t, lang } = useLang();
  const cv = cvFile(lang);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);

  return (
    <section id="inicio" className="hero relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
        <p className="font-pixel text-[0.55rem] uppercase leading-relaxed tracking-[0.2em] text-straw sm:text-[0.6rem]">
          {t.hero.badge}
        </p>

        {/* El HTML trae el nombre ya escrito (se ve sin JS y cuenta para el LCP).
            Al hidratar, ese texto pasa a ser un "sizer" invisible y encima corre
            el decode, así no hay salto de layout. El nombre real va en sr-only. */}
        <h1 className="title-pixel hero-title mt-5">
          <span className="sr-only">{t.hero.name}</span>
          <span aria-hidden className="inline-grid">
            <span className={`col-start-1 row-start-1 ${hydrated ? "invisible" : ""}`}>{t.hero.name}</span>
            {hydrated && <DecodeText text={t.hero.name} className="col-start-1 row-start-1" />}
          </span>
        </h1>

        <p className="mt-5 font-pixel text-[0.6rem] leading-loose text-accent sm:text-xs">
          {t.hero.title}
          <span className="block text-muted sm:inline">
            <span className="hidden sm:inline"> · </span>
            {t.hero.stack.join(" · ")}
          </span>
        </p>

        <p className="mt-5 max-w-xl text-pretty text-lg italic leading-snug text-foreground/85 sm:text-[1.35rem]">
          {t.hero.tagline}
        </p>

        {/* Menú de la pantalla de título: el cursor ▸ marca la opción activa */}
        <ul className="menu-cursor mt-7 flex flex-col items-start font-pixel text-[0.7rem] uppercase sm:text-sm">
          <li>
            <a href="#proyectos">{t.cta.projects}</a>
          </li>
          <li>
            <a href={cv.href} download={cv.name}>
              {t.cta.cv}
            </a>
          </li>
        </ul>

        {/* móvil: ubicación y redes van bajo el menú (abajo taparían la escena) */}
        <div className="mt-4 flex items-center gap-2 font-pixel text-[0.5rem] uppercase text-muted sm:hidden">
          <span>{t.hero.location}</span>
          <SocialLinks />
        </div>
      </div>

      {/* Escena a todo el ancho, anclada abajo */}
      <div aria-hidden className="hero-scene">
        <div className="hero-scene-art">
          <Image
            src="/pixel/about-scene-base.webp"
            alt=""
            fill
            sizes="100vw"
            preload
            draggable={false}
            className="pixelated select-none object-cover"
          />
          <span className="fire-glow" />
          <span className="fire-floor" />
          {EMBERS.map((e) => (
            <span
              key={e.left}
              className="ember"
              style={{ left: e.left, animationDelay: e.delay, animationDuration: e.duration }}
            />
          ))}
          <span className="term-cursor" />
        </div>
      </div>

      {/* escritorio: ubicación y redes sobre el suelo de la escena, a la derecha
          (la esquina izquierda es del HUD) */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden items-center justify-end gap-3 px-8 pb-5 font-pixel text-[0.55rem] uppercase text-muted sm:flex">
        <span>{t.hero.location}</span>
        <SocialLinks />
      </div>
    </section>
  );
}

function SocialLinks() {
  return (
    <span className="flex items-center gap-1">
      <a
        href={SOCIALS.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="p-2 transition-colors hover:text-accent"
      >
        <FaGithub size={16} />
      </a>
      <a
        href={SOCIALS.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="p-2 transition-colors hover:text-accent"
      >
        <FaLinkedin size={16} />
      </a>
    </span>
  );
}
