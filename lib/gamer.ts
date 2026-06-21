import type { Lang } from "@/lib/content";

/**
 * Capa "gamer" del portafolio: datos de stats, copys bilingües y el sprite
 * pixel-art. Aislada de content.ts para mantener esa fuente principal limpia.
 */

// Habilidades respaldadas por EVIDENCIA: cada tech apunta a los ids de proyecto
// donde se aplicó (verificable, sin % subjetivos). Agrupadas por nivel de uso.
export type SkillUse = { name: string; projects: string[] };
export type SkillGroup = { key: "core" | "projects" | "exploring"; skills: SkillUse[] };
export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "core",
    skills: [
      { name: "React", projects: ["greensoft", "pagos", "landings", "portfolio"] },
      { name: "Next.js", projects: ["lexy", "greensoft", "pagos", "landings", "portfolio"] },
      { name: "TypeScript", projects: ["lexy", "greensoft", "portfolio"] },
      { name: "Tailwind CSS", projects: ["lexy", "landings", "portfolio"] },
    ],
  },
  {
    key: "projects",
    skills: [
      { name: "Framer Motion", projects: ["landings", "portfolio"] },
      { name: "IA · OpenAI / Ollama", projects: ["lexy", "orbix"] },
      { name: "PostgreSQL", projects: ["pagos"] },
      { name: "MongoDB", projects: ["lexy"] },
      { name: "Mercado Pago", projects: ["pagos"] },
      { name: "Python", projects: ["orbix"] },
    ],
  },
  {
    key: "exploring",
    skills: [
      { name: "NestJS", projects: [] },
      { name: "n8n", projects: [] },
      { name: "Agentes IA", projects: [] },
    ],
  },
];

// Etiquetas de cada grupo (bilingüe).
export const SKILL_GROUP_LABELS: Record<Lang, Record<string, string>> = {
  es: { core: "Especialidad", projects: "En proyectos", exploring: "Explorando" },
  en: { core: "Specialty", projects: "In projects", exploring: "Exploring" },
};

// Etiqueta corta de cada proyecto para los chips de evidencia (linkean al caso).
export const PROJECT_SHORT: Record<Lang, Record<string, string>> = {
  es: { lexy: "Lexy", greensoft: "Greensoft", orbix: "Orbix", pagos: "tu-dominio.cl", landings: "BaoBlue", portfolio: "Portafolio" },
  en: { lexy: "Lexy", greensoft: "Greensoft", orbix: "Orbix", pagos: "tu-dominio.cl", landings: "BaoBlue", portfolio: "Portfolio" },
};

// "Nivel" del jugador = edad actual de Jeremy (nacido 2002-12-22).
export const PLAYER_LEVEL = 23;

export type GamerCopy = {
  focusHeading: string;
  focusCaption: string;
  flipHint: string;
  usedIn: string;
  levelLabel: string;
  xpLabel: string;
  zoneLabel: string;
  achievementUnlocked: string;
  // por id de sección
  zones: Record<string, string>;
  achievements: Record<string, { icon: string; title: string; desc: string }>;
};

export const GAMER_COPY: Record<Lang, GamerCopy> = {
  es: {
    focusHeading: "Mapa de foco",
    focusCaption: "Áreas de trabajo · el número son proyectos reales",
    flipHint: "Voltea cada tecnología para ver dónde la apliqué",
    usedIn: "Aplicado en",
    levelLabel: "Nivel",
    xpLabel: "XP",
    zoneLabel: "Zona",
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
    focusHeading: "Focus map",
    focusCaption: "Areas of work · the number is real projects",
    flipHint: "Flip each tech to see where I applied it",
    usedIn: "Used in",
    levelLabel: "Level",
    xpLabel: "XP",
    zoneLabel: "Zone",
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

// ── Easter egg: código Konami (↑↑↓↓←→←→ B A) ──
export const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
] as const;

export type KonamiCopy = {
  unlocked: string;
  rarity: string;
  title: string;
  flavor: string;
  hint: string;
  reward: string;
  close: string;
};

export const KONAMI_COPY: Record<Lang, KonamiCopy> = {
  es: {
    unlocked: "Logro secreto desbloqueado",
    rarity: "Mítica",
    title: "Maestro del Konami",
    flavor: "Pocos llegan hasta acá. Si conoces este código, hablamos el mismo idioma.",
    hint: "↑ ↑ ↓ ↓ ← → ← → B A",
    reward: "+1000 XP · party invitation",
    close: "Cerrar",
  },
  en: {
    unlocked: "Secret achievement unlocked",
    rarity: "Mythic",
    title: "Konami Master",
    flavor: "Few make it this far. If you know this code, we speak the same language.",
    hint: "↑ ↑ ↓ ↓ ← → ← → B A",
    reward: "+1000 XP · party invitation",
    close: "Close",
  },
};

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

// "Mapa de foco": el radar se dibuja desde EVIDENCIA, no autoevaluación.
// Cada eje es un área de trabajo; su valor = nº de proyectos que la tocan.
export const TOTAL_PROJECTS = 6;
export const FOCUS_AREAS: { key: string; projects: string[] }[] = [
  { key: "frontend", projects: ["lexy", "greensoft", "pagos", "landings", "portfolio"] },
  { key: "backend", projects: ["greensoft", "orbix", "pagos"] },
  { key: "ia", projects: ["lexy", "orbix"] },
  { key: "data", projects: ["lexy", "pagos"] },
  { key: "integrations", projects: ["lexy", "orbix", "pagos"] },
  { key: "deploy", projects: ["lexy", "greensoft", "pagos", "landings", "portfolio"] },
];
export const FOCUS_LABELS: Record<Lang, Record<string, string>> = {
  es: { frontend: "Frontend", backend: "Backend", ia: "IA", data: "Bases de datos", integrations: "Integraciones", deploy: "Deploy" },
  en: { frontend: "Frontend", backend: "Backend", ia: "AI", data: "Databases", integrations: "Integrations", deploy: "Deploy" },
};

export type Ability = { slot: string; icon: string; name: string; desc: string };

export type AboutGame = {
  cardRole: string;
  cardSub: string;
  rarity: string;
  cardFlavor: string;
  traits: string[];
  abilitiesLabel: string;
  loreLabel: string;
  abilities: Ability[];
  currentQuest: {
    title: string;
    badge: string;
    objectives: { label: string; state: "done" | "active" | "todo" }[];
  };
};

export const ABOUT_GAME: Record<Lang, AboutGame> = {
  es: {
    cardRole: "Frontend Developer · React · Next.js · TypeScript",
    cardSub: "Me muevo entre frontend, backend e integraciones cuando el producto lo requiere.",
    rarity: "Legendaria",
    cardFlavor: "Del diseño al deploy: convierte ideas en interfaces que funcionan.",
    traits: ["Builder", "Bilingüe", "Curioso", "Adaptable"],
    abilitiesLabel: "Habilidades",
    loreLabel: "Lore",
    abilities: [
      { slot: "P", icon: "compass", name: "Aprendiz eterno", desc: "Cada proyecto sube de nivel: aprende rápido y se adapta al stack." },
      { slot: "Q", icon: "layout", name: "Frontend Craft", desc: "Interfaces modernas y pulidas con React, Next.js y Tailwind." },
      { slot: "W", icon: "server", name: "API Builder", desc: "Backends y APIs con Node, NestJS y bases SQL/NoSQL." },
      { slot: "E", icon: "brain", name: "IA Integrada", desc: "Chatbots y automatizaciones con OpenAI y Ollama." },
      { slot: "R", icon: "rocket", name: "Ship It", desc: "Ultimate: lleva ideas a producción, de punta a punta." },
    ],
    currentQuest: {
      title: "Current Quest",
      badge: "XP +100",
      objectives: [
        { label: "Integrar IA útil en flujos reales", state: "done" },
        { label: "Mejorar arquitectura frontend", state: "active" },
        { label: "Profundizar buenas prácticas de producto", state: "active" },
        { label: "Shippear proyectos con mejor criterio técnico", state: "todo" },
      ],
    },
  },
  en: {
    cardRole: "Frontend Developer · React · Next.js · TypeScript",
    cardSub: "I move between frontend, backend and integrations when the product needs it.",
    rarity: "Legendary",
    cardFlavor: "From design to deploy: turning ideas into interfaces that work.",
    traits: ["Builder", "Bilingual", "Curious", "Adaptable"],
    abilitiesLabel: "Abilities",
    loreLabel: "Lore",
    abilities: [
      { slot: "P", icon: "compass", name: "Eternal Learner", desc: "Every project levels up: learns fast and adapts to the stack." },
      { slot: "Q", icon: "layout", name: "Frontend Craft", desc: "Modern, polished interfaces with React, Next.js and Tailwind." },
      { slot: "W", icon: "server", name: "API Builder", desc: "Backends and APIs with Node, NestJS and SQL/NoSQL databases." },
      { slot: "E", icon: "brain", name: "AI Integration", desc: "Chatbots and automations with OpenAI and Ollama." },
      { slot: "R", icon: "rocket", name: "Ship It", desc: "Ultimate: takes ideas to production, end to end." },
    ],
    currentQuest: {
      title: "Current Quest",
      badge: "XP +100",
      objectives: [
        { label: "Integrate useful AI into real flows", state: "done" },
        { label: "Improve frontend architecture", state: "active" },
        { label: "Go deeper on product best practices", state: "active" },
        { label: "Ship projects with better technical judgment", state: "todo" },
      ],
    },
  },
};
