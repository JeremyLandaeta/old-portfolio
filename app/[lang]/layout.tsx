import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { GlobalParticles } from "@/components/ui/GlobalParticles";
import { JsonLd } from "@/components/seo/JsonLd";
import { SOCIALS, type Lang } from "@/lib/content";
import { HOME_META, LOCALES, OG_LOCALE, PERSON_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Pixel-font 8-bit (solo para títulos/labels decorativos, no para cuerpo).
const pixel = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Solo se generan /es y /en; cualquier otro idioma devuelve 404.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Lang = lang === "en" ? "en" : "es";
  const m = HOME_META[locale];
  return {
    metadataBase: new URL(SITE_URL),
    // `default` es el título de la home; las páginas hijas solo ponen su parte.
    title: { default: m.title, template: "%s — Jeremy Landaeta" },
    description: m.description,
    keywords: [
      "Jeremy Landaeta",
      "Frontend Developer",
      "Fullstack Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Chile",
      "IA",
    ],
    authors: [{ name: "Jeremy Landaeta Lizama" }],
    creator: "Jeremy Landaeta Lizama",
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    // Indexación explícita: sin noindex y con previews grandes en resultados.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: `/${lang}`,
      title: m.title,
      description: m.ogDesc,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.ogDesc,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (lang !== "es" && lang !== "en") notFound();

  // Datos estructurados (JSON-LD): ayudan a Google/IA a entender a Jeremy como
  // entidad (Person) y al sitio (WebSite). Cada página suma su propio bloque.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Jeremy Landaeta Lizama",
        alternateName: "Jeremy Landaeta",
        url: SITE_URL,
        image: `${SITE_URL}/pixel/jeremy-pixel.png`,
        jobTitle: "Frontend Developer",
        description: HOME_META[lang].description,
        address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Duoc UC" },
        knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "AI integrations"],
        sameAs: [SOCIALS.linkedin, SOCIALS.github],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: LOCALES,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${mono.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="grain scanlines min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={jsonLd} />
        <LanguageProvider lang={lang}>
          <MotionProvider>
            <GlobalParticles />
            <CursorGlow />
            {children}
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
