"use client";

import { m } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuFrame } from "@/components/ui/MenuFrame";

/** Color del badge según estado (bilingüe → se normaliza por substring). */
function stateStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("activ")) return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  if (s.includes("iter")) return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
  if (s.includes("paus")) return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  return "border-violet-400/30 bg-violet-400/10 text-violet-300"; // explorando / exploring
}

/** Foco actual: pocas cards, estado en vez de porcentajes inventados. */
export function CurrentlyBuilding() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.building.kicker} title={t.building.heading} />

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="mt-10 grid gap-4 sm:grid-cols-3"
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
              <span
                className={`inline-flex w-fit items-center gap-1.5 border px-2.5 py-0.5 text-[11px] font-medium ${stateStyle(item.status)}`}
              >
                <span className="h-1.5 w-1.5 bg-current" />
                {item.status}
              </span>

              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-white/3 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-2/50 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
            </MenuFrame>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
