"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiOpenai, SiLaravel,
  SiPostgresql, SiMysql, SiPrisma, SiMongodb, SiMercadopago, SiPython, SiNestjs, SiN8N,
} from "react-icons/si";
import { useLang } from "@/components/providers/LanguageProvider";
import { MenuFrame } from "@/components/ui/MenuFrame";
import { projectPath } from "@/lib/site";
import { GAMER_COPY, PROJECT_SHORT, SKILL_GROUPS, SKILL_GROUP_LABELS } from "@/lib/gamer";

type IconType = ComponentType<{ size?: number; className?: string }>;

// Logos en un solo color (el del texto): los colores de marca rompían la paleta.
const ICONS: Record<string, IconType> = {
  react: SiReact,
  next: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  openai: SiOpenai,
  laravel: SiLaravel,
  deepseek: Sparkles, // sin logo en react-icons
  postgres: SiPostgresql,
  mysql: SiMysql,
  prisma: SiPrisma,
  mongo: SiMongodb,
  mercadopago: SiMercadopago,
  python: SiPython,
  nest: SiNestjs,
  n8n: SiN8N,
  agents: Bot,
};

const ITEMS = SKILL_GROUPS.flatMap((group) => group.skills.map((skill) => ({ ...skill, group: group.key })));

/**
 * Inventario: cada tecnología es una casilla y el número es en cuántos
 * proyectos se usó. Al elegir una, el panel muestra esos proyectos con enlace
 * a su caso de estudio (evidencia, sin porcentajes autoasignados).
 */
export function Inventory({ tools }: { tools: string[] }) {
  const { lang } = useLang();
  const g = GAMER_COPY[lang];
  const groupLabels = SKILL_GROUP_LABELS[lang];
  const [selectedId, setSelectedId] = useState(ITEMS[0].id);
  const selected = ITEMS.find((item) => item.id === selectedId) ?? ITEMS[0];
  const SelectedIcon = ICONS[selected.id];

  // lo que ya es una casilla no se repite en la lista de herramientas
  const slotNames = new Set(ITEMS.map((item) => item.name));
  const extraTools = tools.filter((tool) => !slotNames.has(tool));

  return (
    <MenuFrame title={g.inventoryTitle} headingLevel="none" className="px-5 pb-6 pt-8 sm:px-7 sm:pb-7">
      {/* flex en móvil (y no grid) para que el panel pegajoso pueda recorrer todo el marco */}
      <div className="flex flex-col gap-7 lg:grid lg:grid-cols-12 lg:gap-10">
        {/* objeto seleccionado: en móvil queda fijo arriba para verlo al tocar una casilla */}
        <div
          aria-live="polite"
          className="sticky top-18 z-10 border-2 border-frame bg-background p-4 lg:static lg:order-2 lg:col-span-4 lg:self-start"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center bg-background-soft text-flame">
              <SelectedIcon size={24} />
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-bold leading-tight">{selected.names?.[lang] ?? selected.name}</h3>
              <p className="mt-1 font-pixel text-[0.5rem] uppercase text-straw">{groupLabels[selected.group]}</p>
            </div>
          </div>

          {selected.projects.length > 0 ? (
            <>
              <p className="mt-3 text-muted lg:mt-4">
                {g.usedIn} {g.projectCount(selected.projects.length)}:
              </p>
              <ul className="mt-1 flex flex-wrap gap-x-5 lg:mt-1.5 lg:flex-col lg:gap-y-0.5">
                {selected.projects.map((id) => (
                  <li key={id}>
                    <Link
                      href={projectPath(lang, id)}
                      className="group/item inline-flex items-center gap-2.5 py-1 transition-colors hover:text-flame"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-accent" />
                      <span className="underline decoration-border underline-offset-4 group-hover/item:decoration-accent">
                        {PROJECT_SHORT[lang][id] ?? id}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-3 text-muted lg:mt-4">{g.exploringNote}</p>
          )}
        </div>

        {/* casillas por nivel de uso */}
        <div className="lg:order-1 lg:col-span-8">
          <p className="italic text-muted">{g.inventoryHint}</p>

          <div className="mt-5 space-y-6">
            {SKILL_GROUPS.map((group) => (
              <div key={group.key}>
                <h3 className="font-pixel text-[0.55rem] uppercase leading-relaxed text-straw">{groupLabels[group.key]}</h3>
                <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
                  {group.skills.map((skill) => {
                    const Icon = ICONS[skill.id];
                    const isSelected = skill.id === selected.id;
                    return (
                      <li key={skill.id}>
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedId(skill.id)}
                          className={`relative flex aspect-square w-full flex-col items-center justify-center gap-2 border-2 bg-background p-1.5 transition-colors ${
                            isSelected
                              ? "border-accent text-flame"
                              : `border-frame text-muted hover:border-straw hover:text-foreground ${
                                  group.key === "exploring" ? "border-dashed" : ""
                                }`
                          }`}
                        >
                          {skill.projects.length > 0 && (
                            <span aria-hidden className="absolute right-1.5 top-1.5 font-pixel text-[0.5rem] text-accent-2">
                              ×{skill.projects.length}
                            </span>
                          )}
                          <Icon size={26} />
                          <span className="text-balance text-center font-mono text-[10px] leading-tight">
                            {skill.names?.[lang] ?? skill.name}
                          </span>
                          <span className="sr-only">
                            {skill.projects.length > 0 ? `, ${g.projectCount(skill.projects.length)}` : ""}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* el resto de la caja de herramientas, sin evidencia por proyecto */}
            <div>
              <h3 className="font-pixel text-[0.55rem] uppercase leading-relaxed text-straw">{g.toolsLabel}</h3>
              <ul className="tag-line mt-3">
                {extraTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MenuFrame>
  );
}
