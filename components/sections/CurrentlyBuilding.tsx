"use client";

import { m } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuFrame } from "@/components/ui/MenuFrame";

/** Nº de bloques de la barra de progreso (estilo 8-bit). */
const SEGMENTS = 14;

export function CurrentlyBuilding() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <SectionHeading kicker={t.building.kicker} title={t.building.heading} />

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="mt-10 grid gap-4 sm:grid-cols-2"
      >
        {t.building.items.map((item) => (
          <m.div
            key={item.title}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <MenuFrame
              title={item.title}
              accent="violet"
              className="group relative flex h-full flex-col px-5 pb-5 pt-6"
            >
              {/* descripción (cuerpo) */}
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>

              {/* tags de stack */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-white/3 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* footer anclado abajo: estado + progreso por bloques */}
              <div className="mt-auto pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    {item.status}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-accent-2">{item.progress}%</span>
                </div>
                <div className="mt-2 flex gap-0.75">
                  {Array.from({ length: SEGMENTS }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-[1px] ${
                        i < Math.round((item.progress / 100) * SEGMENTS)
                          ? "bg-linear-to-r from-accent to-accent-2"
                          : "bg-white/6"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* línea inferior sutil (se ilumina al hover) */}
              <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-2/50 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
            </MenuFrame>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
