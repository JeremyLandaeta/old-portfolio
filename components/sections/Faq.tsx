"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DUR, EASE } from "@/lib/motion";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.faq.kicker} title={t.faq.heading} align="center" />

      <div className="mt-10 border-b-2 border-frame">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} order={i} className="border-t-2 border-frame">
              <button
                type="button"
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                {/* el cursor del menú: apunta a la pregunta y gira al abrirla */}
                <span
                  aria-hidden
                  className={`cursor-mark mt-1.5 text-[0.75rem] transition-[rotate,color] duration-200 ease-out ${
                    isOpen ? "rotate-90 text-accent" : "text-muted group-hover:text-foreground"
                  }`}
                />
                <span className={`text-xl font-bold leading-snug transition-colors ${isOpen ? "text-flame" : ""}`}>
                  {item.q}
                </span>
              </button>

              {/* La respuesta siempre está en el HTML (buscadores e IA la leen
                  sin hacer click); cerrada queda colapsada e inerte. */}
              <m.div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                inert={!isOpen}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pb-6 pl-6.25 text-pretty text-lg leading-relaxed text-foreground/85">{item.a}</p>
              </m.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
