"use client";

import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs,
  SiPhp, SiMysql, SiPostgresql, SiMongodb, SiDocker, SiGit, SiGithub, SiVercel,
  SiPostman, SiPrisma, SiNestjs, SiExpress, SiOpenai, SiMui, SiAntdesign, SiOllama,
} from "react-icons/si";
import { Layers, Server, Database, Brain, Wrench } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { TechOrbit } from "@/components/ui/TechOrbit";

const categoryIcon: Record<string, typeof Layers> = {
  frontend: Layers,
  backend: Server,
  db: Database,
  ia: Brain,
  tools: Wrench,
};

/** Logos para el marquee */
const marqueeTech: { name: string; Icon: IconType }[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Material UI", Icon: SiMui },
  { name: "Ant Design", Icon: SiAntdesign },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "NestJS", Icon: SiNestjs },
  { name: "Prisma", Icon: SiPrisma },
  { name: "PHP", Icon: SiPhp },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MySQL", Icon: SiMysql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "Ollama", Icon: SiOllama },
  { name: "Docker", Icon: SiDocker },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Vercel", Icon: SiVercel },
  { name: "Postman", Icon: SiPostman },
];

export function Stack() {
  const { t } = useLang();

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <SectionHeading kicker={t.stack.kicker} title={t.stack.heading} />

      {/* Órbita de tecnologías */}
      <Reveal className="mt-10">
        <TechOrbit />
      </Reveal>

      {/* Categorías */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.stack.categories.map((cat, i) => {
          const Icon = categoryIcon[cat.key] ?? Layers;
          return (
            <Reveal key={cat.key} delay={i * 0.06}>
              <div className="h-full rounded-2xl glass p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent-2">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-semibold">{cat.label}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-white/[0.03] px-2.5 py-1 text-sm text-muted transition-colors hover:border-accent-2 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Marquee de logos */}
      <div className="mt-12 space-y-4">
        <Marquee duration={36}>
          {marqueeTech.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-muted transition-colors hover:text-foreground"
            >
              <Icon size={22} />
              <span className="font-mono text-sm">{name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
