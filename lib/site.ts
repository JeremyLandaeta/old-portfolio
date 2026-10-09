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
    title: "Jeremy Landaeta — Software Developer",
    description:
      "Portafolio de Jeremy Landaeta Lizama. Productos frontend y full stack, arquitectura de aplicaciones e integraciones con IA usando React, Next.js y TypeScript.",
    ogDesc: "Productos de punta a punta: interfaces, reglas de negocio, integraciones e IA aplicada.",
  },
  en: {
    title: "Jeremy Landaeta — Software Developer",
    description:
      "Portfolio of Jeremy Landaeta Lizama. Frontend and full-stack products, application architecture and AI integrations using React, Next.js and TypeScript.",
    ogDesc: "End-to-end products: interfaces, business rules, integrations and applied AI.",
  },
};
