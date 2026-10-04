import { SOCIALS, cvFile, dictionaries } from "@/lib/content";
import { HOME_META, SITE_URL, projectPath } from "@/lib/site";

// Se genera en build desde content.ts: nunca queda desfasado del sitio.
export const dynamic = "force-static";

/**
 * /llms.txt — resumen en Markdown para asistentes de IA (formato llmstxt.org):
 * H1, resumen en cita, contexto y listas de enlaces. Va en inglés (el idioma
 * que mejor consumen los modelos) y enlaza también la versión en español.
 */
export function GET() {
  const en = dictionaries.en;
  const es = dictionaries.es;

  const body = [
    `# ${en.hero.name}`,
    "",
    `> ${HOME_META.en.description}`,
    "",
    `${en.hero.title} based in ${en.hero.location}. ${en.hero.tagline}`,
    "",
    "The site is bilingual: every page exists in Spanish (`/es`, the default) and English (`/en`).",
    "",
    ...en.faq.items.map((item) => `- **${item.q}** ${item.a}`),
    "",
    "## Case studies",
    "",
    ...en.projects.items.map(
      (p) => `- [${p.title}](${SITE_URL}${projectPath("en", p.id)}): ${p.metaDescription}`,
    ),
    "",
    "## Profile",
    "",
    `- [Portfolio (English)](${SITE_URL}/en): experience, stack and selected projects`,
    `- [Résumé (PDF)](${SITE_URL}${cvFile("en").href})`,
    `- [GitHub](${SOCIALS.github})`,
    `- [LinkedIn](${SOCIALS.linkedin})`,
    "",
    "## Optional",
    "",
    `- [Portafolio (español)](${SITE_URL}/es): ${HOME_META.es.description}`,
    `- [CV (PDF, español)](${SITE_URL}${cvFile("es").href})`,
    ...es.projects.items.map(
      (p) => `- [${p.title}](${SITE_URL}${projectPath("es", p.id)}): ${p.metaDescription}`,
    ),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
