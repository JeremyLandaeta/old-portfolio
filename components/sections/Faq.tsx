"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.faq.kicker} title={t.faq.heading} align="center" />

      <MenuFrame
        title="FAQ"
        icon={HelpCircle}
        accent="blue"
        stamp="FAQ.DB"
        className="mt-10 px-4 pb-4 pt-7 sm:px-5 sm:pb-5"
      >
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.04}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-accent-2/40 glass" : "border-border bg-white/2 hover:border-accent-2/30"
                }`}
              >
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-medium">{item.q}</span>
                  <m.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                      isOpen ? "bg-linear-to-br from-accent to-accent-2 text-background" : "border border-border text-muted"
                    }`}
                  >
                    <Plus size={16} />
                  </m.span>
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
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-pretty leading-relaxed text-muted">{item.a}</p>
                </m.div>
              </div>
            </Reveal>
          );
          })}
        </div>
      </MenuFrame>
    </section>
  );
}
