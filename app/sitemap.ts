import type { MetadataRoute } from "next";
import { dictionaries } from "@/lib/content";
import { projectMedia } from "@/lib/projectMedia";
import { LOCALES, SITE_URL, projectPath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // El sitio es 100% estático: el contenido solo cambia con cada build/deploy.
  const lastModified = new Date();

  const home = LOCALES.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: { es: `${SITE_URL}/es`, en: `${SITE_URL}/en`, "x-default": `${SITE_URL}/es` },
    },
  }));

  // Los ids de proyecto son idénticos en ambos idiomas.
  const projects = LOCALES.flatMap((lang) =>
    dictionaries[lang].projects.items.map((p) => ({
      url: `${SITE_URL}${projectPath(lang, p.id)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}${projectPath("es", p.id)}`,
          en: `${SITE_URL}${projectPath("en", p.id)}`,
          "x-default": `${SITE_URL}${projectPath("es", p.id)}`,
        },
      },
      // Capturas reales del caso (si existen) para el sitemap de imágenes.
      images: projectMedia[p.id]?.shots?.map((src) => `${SITE_URL}${src}`),
    })),
  );

  return [...home, ...projects];
}
