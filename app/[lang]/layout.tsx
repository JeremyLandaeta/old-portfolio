import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { GlobalParticles } from "@/components/ui/GlobalParticles";
import { SOCIALS, type Lang } from "@/lib/content";

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

const SITE_URL = "https://jlandaeta.dev";
const LOCALES: Lang[] = ["es", "en"];

// Solo se generan /es y /en; cualquier otro idioma devuelve 404.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

const META: Record<Lang, { title: string; description: string; ogLocale: string; ogDesc: string }> = {
  es: {
    title: "Jeremy Landaeta — Frontend Developer",
    description:
      "Portafolio de Jeremy Landaeta Lizama, Ingeniero en Informática. Desarrollo frontend/fullstack con React, Next.js y TypeScript, e integraciones con IA.",
    ogLocale: "es_CL",
    ogDesc: "Productos web, interfaces modernas y automatizaciones con IA. React · Next.js · TypeScript.",
  },
  en: {
    title: "Jeremy Landaeta — Frontend Developer",
    description:
      "Portfolio of Jeremy Landaeta Lizama, Computer Engineer. Frontend/fullstack development with React, Next.js and TypeScript, plus AI integrations.",
    ogLocale: "en_US",
    ogDesc: "Web products, modern interfaces and AI automations. React · Next.js · TypeScript.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as Lang] ?? META.es;
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
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
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      url: `/${lang}`,
      title: m.title,
      description: m.ogDesc,
      siteName: "Jeremy Landaeta — Portafolio",
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
  // entidad (Person) y al sitio (WebSite). Validar en search.google.com/test/rich-results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Jeremy Landaeta Lizama",
        alternateName: "Jeremy Landaeta",
        url: SITE_URL,
        image: `${SITE_URL}/pixel/jeremy-pixel.png`,
        jobTitle: "Frontend Developer",
        description: META[lang].description,
        address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Duoc UC" },
        knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "AI integrations"],
        sameAs: [SOCIALS.linkedin, SOCIALS.github],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Jeremy Landaeta — Portafolio",
        inLanguage: ["es", "en"],
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
