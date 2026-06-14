"use client";

import { m } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuFrame } from "@/components/ui/MenuFrame";

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
            <MenuFrame title={item.title} accent="violet" className="group relative h-full px-5 pb-5 pt-7">
              {/* barra de progreso animada al hover */}
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-start justify-end">
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </MenuFrame>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
