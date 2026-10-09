import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyView } from "@/components/sections/CaseStudyView";
import { JsonLd } from "@/components/seo/JsonLd";
import { dictionaries, type Lang } from "@/lib/content";
import { projectMedia } from "@/lib/projectMedia";
import { LOCALES, OG_LOCALE, PERSON_ID, SITE_NAME, SITE_URL, WEBSITE_ID, projectPath } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    dictionaries[lang].projects.items.map((p) => ({ lang, slug: p.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Lang = lang === "en" ? "en" : "es";
  const dict = dictionaries[locale];
  const project = dict.projects.items.find((p) => p.id === slug);
  if (!project) return { title: locale === "en" ? "Project" : "Proyecto" };

  const path = projectPath(locale, slug);
  const fullTitle = `${project.title} — Jeremy Landaeta`;
  // Tarjeta social: captura real del proyecto si existe; si no, la del sitio.
  const cover = projectMedia[slug]?.cover;
  const image = cover
    ? { url: cover, width: 1400, height: 875, alt: `${dict.caseStudyLabels.shotOf} ${project.title}` }
    : { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: fullTitle };

  return {
    title: project.title,
    description: project.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        es: projectPath("es", slug),
        en: projectPath("en", slug),
        "x-default": projectPath("es", slug),
      },
    },
    // openGraph/twitter NO se heredan por campo: al definirlos aquí reemplazan
    // los del layout, así que van completos (tipo, locale, sitio e imagen).
    openGraph: {
      type: "article",
      locale: OG_LOCALE[locale],
      url: path,
      title: fullTitle,
      description: project.metaDescription,
      siteName: SITE_NAME,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: project.metaDescription,
      images: [image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Lang = lang === "en" ? "en" : "es";
  const dict = dictionaries[locale];
  const project = dict.projects.items.find((p) => p.id === slug);
  // Slug desconocido → 404 real (HTTP 404), no una página 200 con UI de error.
  if (!project) notFound();

  const url = `${SITE_URL}${projectPath(locale, slug)}`;
  const cover = projectMedia[slug]?.cover;
  // La página (escrita por Jeremy) trata sobre el proyecto; no se declara
  // autoría del proyecto en sí porque varios fueron en equipo o para terceros.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${project.title} — Jeremy Landaeta`,
        description: project.metaDescription,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        about: { "@type": "CreativeWork", name: project.title, keywords: project.tags.join(", ") },
        ...(cover ? { primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${cover}` } } : {}),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.nav[0].label, item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main id="main-content" className="flex-1">
        <CaseStudyView slug={slug} />
      </main>
      <Footer />
    </>
  );
}
