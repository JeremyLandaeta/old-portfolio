import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollSpy } from "@/components/ui/ScrollSpy";
import { Hud } from "@/components/ui/Hud";
import { Achievements } from "@/components/ui/Achievements";
import { KonamiEgg } from "@/components/ui/KonamiEgg";
import { Hero } from "@/components/sections/Hero";
import { Snapshot } from "@/components/sections/Snapshot";
import { Experience } from "@/components/sections/Experience";
import { AboutLore } from "@/components/sections/AboutLore";
import { Stack } from "@/components/sections/Stack";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Lang } from "@/lib/content";
import { HOME_META, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Lang = lang === "en" ? "en" : "es";
  const url = `${SITE_URL}/${locale}`;

  // La home es la página de perfil de la entidad Person definida en el layout.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    name: HOME_META[locale].title,
    description: HOME_META[locale].description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <ScrollSpy />
      <Hud />
      <Achievements />
      <KonamiEgg />
      <main className="flex-1">
        <Hero />
        <Snapshot />
        <Experience />
        <AboutLore />
        <Stack />
        <CurrentlyBuilding />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
