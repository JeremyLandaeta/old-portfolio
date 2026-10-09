"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Inventory } from "@/components/sections/Inventory";

export function Stack() {
  const { t } = useLang();

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.stack.kicker} title={t.stack.heading} />

      <Reveal className="mt-10">
        <Inventory tools={t.stack.tools} />
      </Reveal>
    </section>
  );
}
