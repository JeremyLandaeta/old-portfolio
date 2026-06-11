import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollSpy } from "@/components/ui/ScrollSpy";
import { Hud } from "@/components/ui/Hud";
import { Achievements } from "@/components/ui/Achievements";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
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
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Stack />
        <CurrentlyBuilding />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
