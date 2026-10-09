"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { cvFile } from "@/lib/content";
import { ABOUT_GAME } from "@/lib/gamer";

function SheetLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="font-pixel text-[0.55rem] uppercase leading-relaxed text-straw">{children}</h4>;
}

/**
 * Ficha de personaje: lo que no cuenta ninguna otra sección. A la izquierda el
 * retrato y los datos de la hoja (clase, gremio, base…); a la derecha de dónde
 * viene y qué hace fuera del código. El stack, los proyectos y la trayectoria
 * ya tienen su propia sección, así que acá no se repiten.
 */
export function CharacterSheet() {
  const { t, lang } = useLang();
  const g = ABOUT_GAME[lang];
  const cv = cvFile(lang);

  return (
    <section id="perfil" className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
      <SectionHeading kicker={t.about.kicker} title={t.about.heading} />

      <Reveal className="mt-12">
        <MenuFrame title={g.sheetTag} headingLevel="none" className="px-5 pb-6 pt-8 sm:px-7 sm:pb-7">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* retrato + hoja de datos */}
            <div className="lg:col-span-4">
              <div className="relative mx-auto aspect-square w-full max-w-64 overflow-hidden border border-border bg-background lg:max-w-none">
                <Image
                  src="/pixel/jeremy-pixel.png"
                  alt={lang === "en" ? "Jeremy Landaeta, pixel-art portrait" : "Jeremy Landaeta, retrato pixel-art"}
                  fill
                  sizes="(min-width: 1024px) 340px, 256px"
                  className="pixelated select-none object-cover object-top"
                />
              </div>

              <h3 className="mt-5 text-2xl font-bold leading-tight">Jeremy Landaeta</h3>

              {/* rótulo ····· valor, como en una hoja de personaje */}
              <dl className="mt-4 space-y-2.5">
                {t.about.facts.map((f) => (
                  <div key={f.key} className="flex items-baseline gap-2">
                    <dt className="shrink-0 font-pixel text-[0.5rem] uppercase text-straw">
                      {g.factLabels[f.key] ?? f.key}
                    </dt>
                    <span aria-hidden className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-frame" />
                    <dd className="text-balance text-right leading-snug">{f.label}</dd>
                  </div>
                ))}
              </dl>

              <a href={cv.href} download={cv.name} className="btn-pixel mt-7">
                <Download size={15} />
                {t.cta.cv}
              </a>
            </div>

            <div className="lg:col-span-8">
              {/* de dónde viene */}
              <SheetLabel>{g.loreLabel}</SheetLabel>
              <div className="mt-3 max-w-[62ch] space-y-3">
                {t.about.paragraphs.map((p, i) => (
                  <p
                    key={p}
                    className={`text-pretty leading-relaxed ${i === 0 ? "text-xl text-foreground" : "text-lg text-foreground/85"}`}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t-2 border-frame pt-5">
                {t.about.highlights.map((h) => (
                  <div key={h.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1 leading-snug text-muted">{h.label}</dt>
                    <dd className="font-pixel text-xl text-flame">{h.value}</dd>
                  </div>
                ))}
              </dl>

              {/* fuera del código: casillas como las del inventario */}
              <div className="mt-7 border-t-2 border-frame pt-6">
                <SheetLabel>{g.offCodeLabel}</SheetLabel>
                <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {g.offCode.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-col items-center gap-2 border-2 border-frame bg-background px-1.5 py-3 text-center"
                    >
                      <PixelSprite name={item.sprite} cell={4} className="max-w-full" />
                      <span className="text-balance leading-tight">{item.name}</span>
                      {item.note && (
                        <span className="-mt-1 font-pixel text-[0.45rem] uppercase text-muted">{item.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </MenuFrame>
      </Reveal>
    </section>
  );
}
