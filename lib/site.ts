import type { Lang } from "@/lib/content";

/**
 * Identidad del sitio para SEO. Única fuente de la URL canónica: de aquí salen
 * canonical, hreflang, sitemap, robots, Open Graph, JSON-LD y llms.txt.
 * Debe coincidir con el dominio primario en Vercel (el que NO redirige).
 */
export const SITE_URL = "https://jlandaeta.dev";
export const SITE_NAME = "Jeremy Landaeta — Portafolio";
export const LOCALES: Lang[] = ["es", "en"];
export const OG_LOCALE: Record<Lang, string> = { es: "es_CL", en: "en_US" };

/** IDs estables para enlazar entidades entre bloques JSON-LD. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const projectPath = (lang: Lang, slug: string) => `/${lang}/proyectos/${slug}`;

/** Title/description de la home por idioma (los casos de estudio usan content.ts). */
export const HOME_META: Record<Lang, { title: string; description: string; ogDesc: string }> = {
  es: {
    title: "Jeremy Landaeta — Frontend Developer",
    description:
      "Portafolio de Jeremy Landaeta Lizama, Ingeniero en Informática. Desarrollo frontend/fullstack con React, Next.js y TypeScript, e integraciones con IA.",
    ogDesc: "Productos web, interfaces modernas y automatizaciones con IA. React · Next.js · TypeScript.",
  },
  en: {
    title: "Jeremy Landaeta — Frontend Developer",
    description:
      "Portfolio of Jeremy Landaeta Lizama, Computer Engineer. Frontend/fullstack development with React, Next.js and TypeScript, plus AI integrations.",
    ogDesc: "Web products, modern interfaces and AI automations. React · Next.js · TypeScript.",
  },
};
