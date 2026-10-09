"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import type { Project } from "@/lib/content";

/**
 * Color de la placa según el estado del proyecto. Clases literales a propósito:
 * Tailwind solo genera las que ve escritas. El color acompaña; el que informa
 * es el texto.
 */
const STATUS_COLOR: Record<Project["status"], string> = {
  production: "bg-moss",
  internal: "bg-crystal",
  development: "bg-flame",
  paused: "bg-straw",
  completed: "bg-straw",
  prototype: "bg-muted",
  mockup: "bg-muted",
};

export function StatusPlate({ status }: { status: Project["status"] }) {
  const { t } = useLang();
  return <span className={`plate ${STATUS_COLOR[status]}`}>{t.projects.statusLabels[status]}</span>;
}
