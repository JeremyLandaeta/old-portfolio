import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyView } from "@/components/sections/CaseStudyView";
import { dictionaries, type Lang } from "@/lib/content";

export const dynamicParams = false;

const LOCALES: Lang[] = ["es", "en"];

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
  const dict = dictionaries[lang as Lang] ?? dictionaries.es;
  const project = dict.projects.items.find((p) => p.id === slug);
  if (!project) return { title: "Proyecto — Jeremy Landaeta" };
  return {
    title: `${project.title} — Jeremy Landaeta`,
    description: project.description,
    alternates: {
      canonical: `/${lang}/proyectos/${slug}`,
      languages: {
        es: `/es/proyectos/${slug}`,
        en: `/en/proyectos/${slug}`,
        "x-default": `/es/proyectos/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — Jeremy Landaeta`,
      description: project.description,
      url: `/${lang}/proyectos/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = dictionaries[lang as Lang] ?? dictionaries.es;
  // Slug desconocido → 404 real (HTTP 404), no una página 200 con UI de error.
  if (!dict.projects.items.some((p) => p.id === slug)) notFound();
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CaseStudyView slug={slug} />
      </main>
      <Footer />
    </>
  );
}
