"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Color de la placa según estado (bilingüe → se normaliza por substring). */
function stateStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("activ")) return "bg-moss";
  if (s.includes("desarrollo") || s.includes("development") || s.includes("iter")) return "bg-flame";
  if (s.includes("paus")) return "bg-straw";
  return "bg-crystal"; // explorando / exploring
}

/** Foco actual: pocas entradas, estado en vez de porcentajes inventados. */
export function CurrentlyBuilding() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.building.kicker} title={t.building.heading} />

      <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
        {t.building.items.map((item, i) => (
          <Reveal key={item.title} order={i} className="border-t-4 border-frame pt-5">
            <span className={`plate ${stateStyle(item.status)}`}>{item.status}</span>
            <h3 className="mt-4 text-xl font-bold leading-tight">{item.title}</h3>
            <p className="mt-2 text-pretty leading-relaxed text-foreground/85">{item.description}</p>
            <ul className="tag-line mt-4">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
