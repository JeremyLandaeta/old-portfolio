import type { Lang } from "@/lib/content";

/**
 * Capa "gamer" del portafolio: datos de stats, copys bilingües y el sprite
 * pixel-art. Aislada de content.ts para mantener esa fuente principal limpia.
 */

// Stats de habilidad (0–100). Subjetivo — ajusta a gusto.
export type Skill = { name: string; level: number };
export const SKILL_STATS: Skill[] = [
  { name: "React", level: 80 },
  { name: "Next.js", level: 75 },
  { name: "TypeScript", level: 76 },
  { name: "Tailwind CSS", level: 82 },
  { name: "Node · NestJS", level: 66 },
  { name: "IA · OpenAI", level: 70 },
  { name: "PostgreSQL", level: 66 },
  { name: "Git · DevOps", level: 72 },
];

// "Nivel" del jugador (flavor). Se puede atar a años de experiencia.
export const PLAYER_LEVEL = 25;

export type GamerCopy = {
  statsKicker: string;
  statsHeading: string;
  levelLabel: string;
  xpLabel: string;
  zoneLabel: string;
  classLabel: string;
  className: string;
  achievementUnlocked: string;
  // por id de sección
  zones: Record<string, string>;
  achievements: Record<string, { icon: string; title: string; desc: string }>;
};

export const GAMER_COPY: Record<Lang, GamerCopy> = {
  es: {
    statsKicker: "Hoja de personaje",
    statsHeading: "Stats de habilidad",
    levelLabel: "Nivel",
    xpLabel: "XP",
    zoneLabel: "Zona",
    classLabel: "Clase",
    className: "Fullstack · IA",
    achievementUnlocked: "¡Logro desbloqueado!",
    zones: {
      inicio: "Inicio",
      proyectos: "Proyectos",
      experiencia: "Experiencia",
      stack: "Stack",
      faq: "FAQ",
      contacto: "Contacto",
    },
    achievements: {
      proyectos: { icon: "🗺️", title: "Explorador", desc: "Desbloqueaste los proyectos" },
      experiencia: { icon: "⚔️", title: "Veterano", desc: "Revisaste la trayectoria" },
      stack: { icon: "🧠", title: "Maestro del stack", desc: "Inspeccionaste las habilidades" },
      faq: { icon: "📜", title: "Curioso", desc: "Leíste el lore (FAQ)" },
      contacto: { icon: "🎉", title: "¡Party up!", desc: "Llegaste al final, hablemos" },
    },
  },
  en: {
    statsKicker: "Character sheet",
    statsHeading: "Skill stats",
    levelLabel: "Level",
    xpLabel: "XP",
    zoneLabel: "Zone",
    classLabel: "Class",
    className: "Fullstack · AI",
    achievementUnlocked: "Achievement unlocked!",
    zones: {
      inicio: "Home",
      proyectos: "Projects",
      experiencia: "Experience",
      stack: "Stack",
      faq: "FAQ",
      contacto: "Contact",
    },
    achievements: {
      proyectos: { icon: "🗺️", title: "Explorer", desc: "Unlocked the projects" },
      experiencia: { icon: "⚔️", title: "Veteran", desc: "Reviewed the journey" },
      stack: { icon: "🧠", title: "Stack Master", desc: "Inspected the skills" },
      faq: { icon: "📜", title: "Curious", desc: "Read the lore (FAQ)" },
      contacto: { icon: "🎉", title: "Party up!", desc: "You reached the end, let's talk" },
    },
  },
};

// Orden de zonas para el HUD (coincide con los ids de sección).
export const ZONE_ORDER = ["inicio", "proyectos", "experiencia", "stack", "faq", "contacto"];

/**
 * Sprite pixel-art: casco de astronauta (explorador) con visor cian.
 * Cada char = una celda; el componente PixelAvatar lo mapea a <rect>.
 */
export const AVATAR_SPRITE = [
  "....KKKKKKKK....",
  "..KKWWWWWWWWKK..",
  ".KWWWWWWWWWWWWK.",
  ".KWWWWWWWWWWWWK.",
  "KWWKKKKKKKKKKWWK",
  "KWKVVVVVVVVVVKWK",
  "KWKVVCCCVVVVVKWK",
  "KWKVCCCBVVVVVKWK",
  "KWKVVVVVVVVVVKWK",
  "KWKVVVVVVVVVVKWK",
  ".KWKKKKKKKKKKWK.",
  ".KWWWWWWWWWWWWK.",
  "..KKWWWWWWWWKK..",
  "....KKKKKKKK....",
];

export const AVATAR_PALETTE: Record<string, string> = {
  K: "#0a0e1a", // contorno
  W: "#cdd9ee", // casco claro
  G: "#8aa0c0", // casco sombra
  V: "#0b3a44", // visor oscuro
  C: "#22d3ee", // visor brillo cian
  B: "#3b82f6", // destello azul
};

// Mini-sprites decorativos (estrellas, gemas) para rellenar espacios.
export const SPRITES: Record<string, { grid: string[]; palette: Record<string, string> }> = {
  spark: {
    grid: ["..C..", "..B..", "CBWBC", "..B..", "..C.."],
    palette: { C: "#0e7490", B: "#22d3ee", W: "#e6f7ff" },
  },
  star: {
    grid: [".B.", "BWB", ".B."],
    palette: { B: "#22d3ee", W: "#e6f7ff" },
  },
  diamond: {
    grid: ["..B..", ".BWB.", "BWCWB", ".BWB.", "..B.."],
    palette: { B: "#3b82f6", W: "#93c5fd", C: "#22d3ee" },
  },
};

// ── Sección "Sobre mí" estilo Champion Profile (TCG + MOBA + RPG) ──

// Atributos del radar (valores neutrales 0–100; las etiquetas van por idioma).
export const RADAR: { key: string; value: number }[] = [
  { key: "frontend", value: 80 },
  { key: "backend", value: 64 },
  { key: "ia", value: 70 },
  { key: "uiux", value: 74 },
  { key: "problem", value: 76 },
  { key: "teamwork", value: 78 },
];

export type Ability = { slot: string; icon: string; name: string; desc: string };

export type AboutGame = {
  cardRole: string;
  rarity: string;
  cardFlavor: string;
  traits: string[];
  attrsLabel: string;
  abilitiesLabel: string;
  loreLabel: string;
  attrLabels: Record<string, string>;
  abilities: Ability[];
  currentQuest: { title: string; text: string; badge: string };
};

export const ABOUT_GAME: Record<Lang, AboutGame> = {
  es: {
    cardRole: "Roamer · Fullstack · IA",
    rarity: "Legendaria",
    cardFlavor: "Se mueve por todo el mapa: del frontend al backend, donde haga falta.",
    traits: ["Builder", "Bilingüe", "Curioso", "Adaptable"],
    attrsLabel: "Atributos",
    abilitiesLabel: "Habilidades",
    loreLabel: "Lore",
    attrLabels: {
      frontend: "Frontend",
      backend: "Backend",
      ia: "IA",
      uiux: "UI/UX",
      problem: "Resolución",
      teamwork: "Equipo",
    },
    abilities: [
      { slot: "P", icon: "compass", name: "Aprendiz eterno", desc: "Cada proyecto sube de nivel: aprende rápido y se adapta al stack." },
      { slot: "Q", icon: "layout", name: "Frontend Craft", desc: "Interfaces modernas y pulidas con React, Next.js y Tailwind." },
      { slot: "W", icon: "server", name: "API Builder", desc: "Backends y APIs con Node, NestJS y bases SQL/NoSQL." },
      { slot: "E", icon: "brain", name: "IA Integrada", desc: "Chatbots y automatizaciones con OpenAI y Ollama." },
      { slot: "R", icon: "rocket", name: "Ship It", desc: "Ultimate: lleva ideas a producción, de punta a punta." },
    ],
    currentQuest: {
      title: "Current Quest",
      text: "Buscar nuevo equipo · Mejorar producto · Shippear proyectos",
      badge: "XP +100",
    },
  },
  en: {
    cardRole: "Roamer · Fullstack · AI",
    rarity: "Legendary",
    cardFlavor: "Roams the whole map: from frontend to backend, wherever needed.",
    traits: ["Builder", "Bilingual", "Curious", "Adaptable"],
    attrsLabel: "Attributes",
    abilitiesLabel: "Abilities",
    loreLabel: "Lore",
    attrLabels: {
      frontend: "Frontend",
      backend: "Backend",
      ia: "AI",
      uiux: "UI/UX",
      problem: "Problem-solving",
      teamwork: "Teamwork",
    },
    abilities: [
      { slot: "P", icon: "compass", name: "Eternal Learner", desc: "Every project levels up: learns fast and adapts to the stack." },
      { slot: "Q", icon: "layout", name: "Frontend Craft", desc: "Modern, polished interfaces with React, Next.js and Tailwind." },
      { slot: "W", icon: "server", name: "API Builder", desc: "Backends and APIs with Node, NestJS and SQL/NoSQL databases." },
      { slot: "E", icon: "brain", name: "AI Integration", desc: "Chatbots and automations with OpenAI and Ollama." },
      { slot: "R", icon: "rocket", name: "Ship It", desc: "Ultimate: takes ideas to production, end to end." },
    ],
    currentQuest: {
      title: "Current Quest",
      text: "Find a new team · Improve product · Ship projects",
      badge: "XP +100",
    },
  },
};
