"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { ALLIES } from "@/lib/allies";

const ANCHOR = "#aliados";

// Store externo para el ancla: sin render extra al montar y SSR-safe (el
// snapshot del servidor es siempre false, igual que el HTML).
function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getHashSnapshot() {
  return window.location.hash.endsWith(ANCHOR);
}

function getHashServerSnapshot() {
  return false;
}

/**
 * Aliados: la "party". Una ficha por persona con la ilustración de su clase, su
 * build (stack) y sus misiones (proyectos), más el enlace a su portafolio. Quien
 * tiene una distinción especial (el guía) la lleva bajo el rol. Los enlaces salen sin
 * `noreferrer` a propósito: así su sitio puede ver que la visita viene de aquí.
 *
 * Empieza plegada para que el samurái de Contacto sea lo último que se ve: bajo
 * la escena queda una flecha que invita a conocerlos y, al activarla, se
 * despliegan. El mismo botón los vuelve a plegar. El contenido sigue en el HTML
 * (solo oculto) y se abre también al llegar por el ancla #aliados.
 */
export function Allies() {
  const { t, lang } = useLang();
  const a = t.allies;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openedByButton = useRef(false);
  const [open, setOpen] = useState(false);
  const [hashSeen, setHashSeen] = useState(false);

  // Llegar a #aliados (cargar la URL o volver a ella) la abre. Solo reacciona al
  // cambio del ancla: si luego se pliega con la URL aún en #aliados, no se
  // reabre sola. (Ajuste de estado durante el render, no un efecto.)
  const hashTargetsAllies = useSyncExternalStore(subscribeHash, getHashSnapshot, getHashServerSnapshot);
  if (hashTargetsAllies !== hashSeen) {
    setHashSeen(hashTargetsAllies);
    if (hashTargetsAllies) setOpen(true);
  }

  // El router de Next cambia el ancla con pushState, que no emite `hashchange`:
  // los enlaces "#aliados" se atienden al hacer click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a") : null;
      if (link?.hash === ANCHOR) setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Al abrir con el botón, la vista acompaña el despliegue: en cada cuadro
  // alinea el inicio de la sección bajo el navbar. Si la persona mueve la
  // página, deja de seguirla.
  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!open || !openedByButton.current || !section || !panel) return;
    openedByButton.current = false;

    // con movimiento reducido no hay transición y basta un solo ajuste
    const ms = parseFloat(getComputedStyle(panel).transitionDuration) * 1000 || 0;
    const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
    const end = performance.now() + ms;
    let stopped = false;
    let frame = 0;

    const follow = () => {
      if (stopped) return;
      const top = section.getBoundingClientRect().top + window.scrollY - margin;
      window.scrollTo({ top, behavior: "instant" });
      if (performance.now() < end) frame = requestAnimationFrame(follow);
    };
    const stop = () => {
      stopped = true;
    };

    const inputs = ["wheel", "touchstart", "keydown"] as const;
    inputs.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    follow();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      inputs.forEach((type) => window.removeEventListener(type, stop));
    };
  }, [open]);

  const Arrow = open ? ChevronUp : ChevronDown;

  return (
    <section ref={sectionRef} id="aliados" className="mx-auto max-w-6xl px-4">
      <div className="flex justify-center pb-6 pt-4 sm:pb-8">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="aliados-panel"
          onClick={() => {
            openedByButton.current = !open;
            setOpen(!open);
          }}
          className="group flex min-h-11 flex-col items-center gap-1.5 px-4 font-pixel text-[0.6rem] uppercase text-foreground transition-colors hover:text-flame"
        >
          {open ? a.hide : a.reveal}
          {/* la flecha solo se mueve mientras invita; abierta, queda quieta */}
          <Arrow size={30} strokeWidth={3} aria-hidden className={`text-accent-2 ${open ? "" : "nudge-down"}`} />
        </button>
      </div>

      <div
        ref={panelRef}
        id="aliados-panel"
        role="region"
        aria-label={a.heading}
        data-open={open ? "" : undefined}
        className="fold"
      >
        <div className="fold-inner">
          <div className="pb-14 sm:pb-28">
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
          </div>
        </div>
      </div>
    </section>
  );
}
