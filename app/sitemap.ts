import type { MetadataRoute } from "next";
import { dictionaries, type Lang } from "@/lib/content";

const SITE_URL = "https://jeremylandaeta.dev";
const LOCALES: Lang[] = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const home = LOCALES.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: { es: `${SITE_URL}/es`, en: `${SITE_URL}/en` },
    },
  }));

  // Los ids de proyecto son idénticos en ambos idiomas.
  const projects = LOCALES.flatMap((lang) =>
    dictionaries[lang].projects.items.map((p) => ({
      url: `${SITE_URL}/${lang}/proyectos/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/es/proyectos/${p.id}`,
          en: `${SITE_URL}/en/proyectos/${p.id}`,
        },
      },
    })),
  );

  return [...home, ...projects];
}
