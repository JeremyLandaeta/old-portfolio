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

export default function Home() {
  return (
    <>
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
