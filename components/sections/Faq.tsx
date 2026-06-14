"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:py-28">
      <SectionHeading kicker={t.faq.kicker} title={t.faq.heading} align="center" />

      <div className="mt-10 space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.04}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-accent-2/40 glass" : "border-border bg-white/[0.02] hover:border-accent-2/30"
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
                      isOpen ? "bg-gradient-to-br from-accent to-accent-2 text-background" : "border border-border text-muted"
                    }`}
                  >
                    <Plus size={16} />
                  </m.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-pretty leading-relaxed text-muted">{item.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
