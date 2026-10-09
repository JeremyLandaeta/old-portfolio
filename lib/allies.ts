import type { FrameAccent } from "@/components/ui/MenuFrame";
import type { StaticImageData } from "next/image";
import type { Lang } from "@/lib/content";
// Import estático: la URL final lleva un hash del contenido del archivo, así que
// al reemplazar una ilustración (aunque conserve el nombre) nunca queda la
// versión anterior en la caché del optimizador ni del navegador.
import brandonArt from "@/public/allies/brandon-hernandez.webp";
import gervasioArt from "@/public/allies/gervasio-herrera.webp";
import johanArt from "@/public/allies/johan-yanten.webp";
import victorArt from "@/public/allies/victor-navarro.webp";

/**
 * Aliados: personas con portafolio propio que aceptaron aparecer aquí.
 * Cada "build" se arma con lo que ellos mismos publican en su sitio (rol, stack
 * y proyectos); la clase y su ilustración son el toque de juego. Va primero el
 * guía, que además lleva su distinción (`bond`). Para sumar a alguien basta con
 * agregar una entrada. Los textos de la sección viven en content.ts.
 */
export type Ally = {
  id: string;
  name: string;
  /** portafolio */
  url: string;
  github?: string;
  linkedin?: string;
  /** color del marco (skins de MenuFrame) */
  accent: FrameAccent;
  /** clase de RPG: etiqueta del marco */
  archetype: Record<Lang, string>;
  /** rol tal como lo declara en su portafolio */
  role: Record<Lang, string>;
  /** distinción especial (solo quien la tenga): hoy, el líder técnico */
  bond?: Record<Lang, string>;
  line: Record<Lang, string>;
  /** ilustración de su clase (public/allies), no un retrato */
  image: StaticImageData;
  imageAlt: Record<Lang, string>;
  /** stack principal */
  build: string[];
  /** proyectos destacados en su portafolio */
  quests: string[];
};

export const ALLIES: Ally[] = [
  {
    id: "brandon-hernandez",
    name: "Brandon Hernández",
    url: "https://brandonhc.cl/",
    linkedin: "https://www.linkedin.com/in/brandonhc/",
    accent: "moss",
    archetype: { es: "Mentor", en: "Mentor" },
    role: { es: "Arquitecto de Sistemas Digitales", en: "Digital Systems Architect" },
    bond: { es: "Mi guía: líder técnico en GreenSoft.", en: "My guide: technical lead at GreenSoft." },
    line: {
      es: "Convierte procesos complejos en sistemas claros y conectados, con automatización e IA aplicada. Es a quien acudo por consejo.",
      en: "Turns complex processes into clear, connected systems, with automation and applied AI. He's the one I go to for advice.",
    },
    image: brandonArt,
    imageAlt: {
      es: "Ilustración pixel-art: un guía encapuchado, pergamino en mano, señala un plano holográfico de sistemas junto a una fogata",
      en: "Pixel-art illustration: a hooded guide, scroll in hand, points at a holographic systems blueprint by a campfire",
    },
    build: ["NestJS", "Laravel", "Next.js", "Flutter", "PostgreSQL", "AWS"],
    quests: ["EcoREP", "Planito", "Dormi"],
  },
  {
    id: "victor-navarro",
    name: "Victor Navarro",
    url: "https://victornavarro.vercel.app/",
    github: "https://github.com/VicxNF",
    linkedin: "https://www.linkedin.com/in/victor-manuel-navarro-fermin/",
    accent: "straw",
    archetype: { es: "Artesano", en: "Artisan" },
    role: { es: "Desarrollador Full-Stack & Web", en: "Full-Stack & Web Developer" },
    line: {
      es: "Diseña la interfaz y construye lo que hay detrás, con el ecosistema React al frente.",
      en: "Designs the interface and builds what's behind it, with the React ecosystem up front.",
    },
    image: victorArt,
    imageAlt: {
      es: "Ilustración pixel-art: un artesano encapuchado forja a martillazos una placa con el símbolo de código sobre un yunque, junto a un estandarte de React",
      en: "Pixel-art illustration: a hooded craftsman hammers a glowing code-symbol plate on an anvil, next to a React banner",
    },
    build: ["React", "Next.js", "TypeScript", "Python", "Django", "PostgreSQL"],
    quests: ["RecipeFinder", "Linkin Park Analyzer"],
  },
  {
    id: "gervasio-herrera",
    name: "Gervasio Herrera",
    url: "https://gervasio-herrera.onrender.com/",
    github: "https://github.com/Hesoyam91",
    accent: "crystal",
    archetype: { es: "Tecnomante", en: "Technomancer" },
    role: { es: "Desarrollador Full-Stack", en: "Full-Stack Developer" },
    line: {
      es: "Va del backend y la IA hasta la interfaz: agentes con LangChain, una radio online sincronizada y extensiones de navegador.",
      en: "Works from backend and AI through to the interface: LangChain agents, a synchronized online radio and browser extensions.",
    },
    image: gervasioArt,
    imageAlt: {
      es: "Ilustración pixel-art: un tecnomante encapuchado conjura pantallas holográficas verdes con una nube y un robot, junto a un computador antiguo",
      en: "Pixel-art illustration: a hooded technomancer conjures green holographic screens showing a cloud and a robot, beside an old computer",
    },
    build: ["Python", "FastAPI", "LangChain", "React", "TypeScript", "Docker"],
    quests: ["ZoneShuffle", "YTAgent", "LinkePost"],
  },
  {
    // Diseñador gráfico, no developer: su build son herramientas de diseño.
    id: "johan-yanten",
    name: "Johan Yantén",
    url: "https://joandesign.framer.ai/",
    accent: "ember",
    archetype: { es: "Cartógrafo", en: "Cartographer" },
    role: { es: "Diseñador Integral · Diseño gráfico", en: "Multidisciplinary Designer · Graphic design" },
    line: {
      es: "Diseño gráfico de punta a punta: marca, diseño de información, editorial y visualización de datos, con motion y video cuando el proyecto lo pide.",
      en: "Graphic design end to end: branding, information design, editorial and data visualization, with motion and video when the project calls for it.",
    },
    image: johanArt,
    imageAlt: {
      es: "Ilustración pixel-art: un cartógrafo de sombrero puntiagudo, con un báculo coronado por una rosa de los vientos, dibuja un plano luminoso junto a una fogata, rodeado de paneles con paletas de color, tipografía y curvas",
      en: "Pixel-art illustration: a cartographer in a pointed hat, holding a staff topped with a compass rose, draws a glowing map by a campfire, surrounded by panels showing color palettes, type and curves",
    },
    build: ["Illustrator", "InDesign", "Photoshop", "After Effects", "Figma", "DaVinci Resolve"],
    quests: ["Nevado de Tres Cruces", "ZOO Nacional", "Mi Mamá Quería Que Estudiara"],
  },
];
