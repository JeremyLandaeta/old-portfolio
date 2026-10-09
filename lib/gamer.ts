import type { Lang } from "@/lib/content";

/**
 * Capa "gamer" del portafolio: inventario, logros, ficha de personaje y los
 * sprites pixel-art. Aislada de content.ts para mantener esa fuente limpia.
 */

// Inventario: cada tecnología es un objeto y apunta a los ids de proyecto donde
// se aplicó (verificable, sin % subjetivos). Agrupadas por nivel de uso.
export type SkillUse = {
  id: string;
  name: string;
  /** nombre por idioma, para lo que no es un nombre propio */
  names?: Partial<Record<Lang, string>>;
  projects: string[];
};
export type SkillGroup = { key: "core" | "projects" | "exploring"; skills: SkillUse[] };
export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "core",
    skills: [
      { id: "react", name: "React", projects: ["fcc", "greensoft", "pagos", "baoblue", "anrra", "portfolio"] },
      { id: "next", name: "Next.js", projects: ["fcc", "lexy", "greensoft", "pagos", "baoblue", "anrra", "portfolio"] },
      { id: "typescript", name: "TypeScript", projects: ["fcc", "lexy", "greensoft", "portfolio"] },
      { id: "tailwind", name: "Tailwind CSS", projects: ["fcc", "lexy", "baoblue", "anrra", "portfolio"] },
    ],
  },
  {
    key: "projects",
    skills: [
      { id: "framer", name: "Framer Motion", projects: ["baoblue", "portfolio"] },
      { id: "openai", name: "OpenAI", projects: ["lexy"] },
      { id: "laravel", name: "Laravel", projects: ["dixta", "orbix"] },
      { id: "deepseek", name: "DeepSeek", projects: ["dixta", "orbix"] },
      // ya no es exploración: el asistente de Ley REP está en producción
      { id: "agents", name: "Agentes IA", names: { en: "AI agents" }, projects: ["orbix"] },
      { id: "postgres", name: "PostgreSQL", projects: ["fcc", "pagos"] },
      { id: "mysql", name: "MySQL", projects: ["dixta", "orbix"] },
      { id: "prisma", name: "Prisma", projects: ["fcc", "pagos"] },
      { id: "mongo", name: "MongoDB", projects: ["lexy"] },
      { id: "mercadopago", name: "Mercado Pago", projects: ["pagos"] },
      { id: "python", name: "Python", projects: ["dixta"] },
    ],
  },
  {
    key: "exploring",
    skills: [
      { id: "nest", name: "NestJS", projects: [] },
      { id: "n8n", name: "n8n", projects: [] },
    ],
  },
];

// Etiquetas de cada grupo (bilingüe).
export const SKILL_GROUP_LABELS: Record<Lang, Record<SkillGroup["key"], string>> = {
  es: { core: "Especialidad", projects: "En proyectos", exploring: "Explorando" },
  en: { core: "Specialty", projects: "In projects", exploring: "Exploring" },
};

// Etiqueta corta de cada proyecto para los enlaces de evidencia (van al caso).
export const PROJECT_SHORT: Record<Lang, Record<string, string>> = {
  es: { fcc: "Financial Control Center", lexy: "Lexy", greensoft: "GreenSoft", orbix: "Asistente Ley REP", dixta: "Dixta", pagos: "tu-dominio.cl", baoblue: "BaoBlue", anrra: "Anrra", portfolio: "Portafolio" },
  en: { fcc: "Financial Control Center", lexy: "Lexy", greensoft: "GreenSoft", orbix: "Ley REP Assistant", dixta: "Dixta", pagos: "tu-dominio.cl", baoblue: "BaoBlue", anrra: "Anrra", portfolio: "Portfolio" },
};

export type GamerCopy = {
  inventoryTitle: string;
  inventoryHint: string;
  toolsLabel: string;
  usedIn: string;
  projectCount: (n: number) => string;
  exploringNote: string;
  achievementUnlocked: string;
  // por id de sección
  achievements: Record<string, { sprite: SpriteName; title: string; desc: string }>;
};

export const GAMER_COPY: Record<Lang, GamerCopy> = {
  es: {
    inventoryTitle: "Inventario",
    inventoryHint: "Elige un objeto para ver en qué proyectos lo usé.",
    toolsLabel: "Herramientas",
    usedIn: "Aplicado en",
    projectCount: (n) => (n === 1 ? "1 proyecto" : `${n} proyectos`),
    exploringNote: "Todavía no está en un proyecto: lo estoy explorando.",
    achievementUnlocked: "Logro desbloqueado",
    achievements: {
      proyectos: { sprite: "map", title: "Explorador", desc: "Encontraste los proyectos" },
      experiencia: { sprite: "katana", title: "Veterano", desc: "Recorriste la trayectoria" },
      stack: { sprite: "chest", title: "Coleccionista", desc: "Abriste el inventario" },
      faq: { sprite: "scroll", title: "Curioso", desc: "Leíste las respuestas" },
      contacto: { sprite: "moon", title: "Fin del camino", desc: "El camino sigue. Hablemos." },
    },
  },
  en: {
    inventoryTitle: "Inventory",
    inventoryHint: "Pick an item to see which projects I used it in.",
    toolsLabel: "Toolbox",
    usedIn: "Used in",
    projectCount: (n) => (n === 1 ? "1 project" : `${n} projects`),
    exploringNote: "Not in a project yet: I'm exploring it.",
    achievementUnlocked: "Achievement unlocked",
    achievements: {
      proyectos: { sprite: "map", title: "Explorer", desc: "You found the projects" },
      experiencia: { sprite: "katana", title: "Veteran", desc: "You walked the journey" },
      stack: { sprite: "chest", title: "Collector", desc: "You opened the inventory" },
      faq: { sprite: "scroll", title: "Curious", desc: "You read the answers" },
      contacto: { sprite: "moon", title: "End of the road", desc: "The road goes on. Let's talk." },
    },
  },
};

// ── Easter egg: código Konami (↑↑↓↓←→←→ B A) ──
export const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
] as const;

export type KonamiCopy = {
  unlocked: string;
  title: string;
  flavor: string;
  /** la secuencia en texto: nombre accesible de las teclas dibujadas */
  hint: string;
  rewardLabel: string;
  reward: string;
  /** botón que cierra la ventana */
  close: string;
};

export const KONAMI_COPY: Record<Lang, KonamiCopy> = {
  es: {
    unlocked: "Logro secreto desbloqueado",
    title: "Maestro del Konami",
    flavor: "Pocos llegan hasta acá. Si conoces este código, hablamos el mismo idioma.",
    hint: "↑ ↑ ↓ ↓ ← → ← → B A",
    rewardLabel: "Recompensa",
    reward: "Un lugar junto al fuego",
    close: "Continuar",
  },
  en: {
    unlocked: "Secret achievement unlocked",
    title: "Konami Master",
    flavor: "Few make it this far. If you know this code, we speak the same language.",
    hint: "↑ ↑ ↓ ↓ ← → ← → B A",
    rewardLabel: "Reward",
    reward: "A seat by the fire",
    close: "Continue",
  },
};

/**
 * Sprites pixel-art de los logros y de los proyectos sin capturas. Cada char es
 * una celda y "." es transparente; todos comparten la paleta de la fogata.
 */
export const SPRITE_PALETTE: Record<string, string> = {
  B: "#f3e7cf", // hueso
  M: "#a89f8c", // ceniza
  S: "#c9a15a", // paja
  F: "#ffd166", // llama
  A: "#ffb454", // llama suave
  O: "#ff7a1a", // brasa
  D: "#8a3a05", // brasa oscura / madera
  C: "#4fd8ff", // cristal
  G: "#6fe8a8", // verde del terminal de la escena
  E: "#2f9e6e", // verde en sombra
};

export const SPRITES = {
  // mapa con la ruta marcada (logro: proyectos)
  map: [
    "............",
    ".SSSSSSSSSS.",
    ".SBBBBBBBBS.",
    ".SBBBBBOBOS.",
    ".SBBBBBBOBS.",
    ".SBBBBBOBOS.",
    ".SBBBBDBBBS.",
    ".SBBBDBBBBS.",
    ".SBBBBBBBBS.",
    ".SBDBBBBBBS.",
    ".SSSSSSSSSS.",
    "............",
  ],
  // katana (logro: experiencia)
  katana: [
    "..........BB",
    ".........BBM",
    "........BBM.",
    ".......BBM..",
    "......BBM...",
    ".....BBM....",
    "....BBM.....",
    ".S.BBM......",
    "..SBM.......",
    "..DS........",
    ".DO.S.......",
    "DO..........",
  ],
  // cofre (logro: inventario)
  chest: [
    "............",
    "..DDDDDDDD..",
    ".DSSSSSSSSD.",
    ".DSSSSSSSSD.",
    ".DSSSSSSSSD.",
    ".DDDDFFDDDD.",
    ".DSSSFFSSSD.",
    ".DSSSSSSSSD.",
    ".DSSSSSSSSD.",
    ".DSSSSSSSSD.",
    ".DDDDDDDDDD.",
    "............",
  ],
  // pergamino (logro: FAQ)
  scroll: [
    "............",
    ".SSSSSSSSSS.",
    ".SBBBBBBBBS.",
    "..SSSSSSSS..",
    "..BBBBBBBB..",
    "..BMMMMMBB..",
    "..BBBBBBBB..",
    "..BMMMMBBB..",
    "..BBBBBBBB..",
    "..SSSSSSSS..",
    ".SBBBBBBBBS.",
    ".SSSSSSSSSS.",
  ],
  // luna llena (logro: contacto)
  moon: [
    "....BBBB....",
    "..BBBBBBBB..",
    ".BBBMBBBBBB.",
    ".BBMMBBBBBB.",
    "BBBBBBBBMBBB",
    "BBBBBBBMMBBB",
    "BBBBBBBBBBBB",
    "BBBMBBBBBBBB",
    ".BBBBBBBMBB.",
    ".BBBBBBBBBB.",
    "..BBBBBBBB..",
    "....BBBB....",
  ],
  // fogata (recompensa del código Konami)
  fire: [
    "......O.....",
    ".....OO.....",
    ".....OAO....",
    "....OAAO....",
    "...OAFAAO...",
    "...OAFFAO...",
    "..OAFFFFAO..",
    "..OAFFFFAO..",
    "...OAFFAO...",
    ".DD.OOOO.DD.",
    "..DDDDDDDD..",
    ".DD......DD.",
  ],
  // cruceta (logro secreto: código Konami)
  dpad: [
    "....BBB....",
    "....BFB....",
    "....BBB....",
    "....BBB....",
    "BBBBBBBBBBB",
    "BFBBBMBBBFB",
    "BBBBBBBBBBB",
    "....BBB....",
    "....BBB....",
    "....BFB....",
    "....BBB....",
  ],
  // hoja (plataformas ambientales)
  leaf: [
    "............",
    ".......GGG..",
    ".....GGGGGG.",
    "....GGGGEGG.",
    "...GGGGEGGG.",
    "..GGGGEGGGG.",
    "..GGGEGGGG..",
    "..GGEGGGG...",
    "..GEGGGG....",
    "..EGGG......",
    ".E..........",
    "E...........",
  ],
  // planeta con su luna en órbita (Orbix)
  orbit: [
    "....MMMM....",
    "..MM....MM..",
    ".M........M.",
    ".M..CCCC..M.",
    "M..CCCCCC..M",
    "M..CCBCCC..M",
    "M..CCCCCC..M",
    "M..CCCCCC..M",
    ".M..CCCC.FF.",
    ".M.......FF.",
    "..MM....MM..",
    "....MMMM....",
  ],
  // moneda (pagos)
  coin: [
    "....DDDD....",
    "..DDFFFFDD..",
    ".DFFFFFFFFD.",
    ".DFFFDDDFAD.",
    "DFFFDFFFFFAD",
    "DFFFFDDFFFAD",
    "DFFFFFFDFFAD",
    "DFFFDDDFFFAD",
    ".DFFFFFFFAD.",
    ".DFAAAAAAAD.",
    "..DDAAAADD..",
    "....DDDD....",
  ],
  // tablones apilados (taller de madera)
  wood: [
    "............",
    "............",
    "..DDDDDDDD..",
    ".DSSSSSSSSD.",
    ".DSDDSSDDSD.",
    ".DSSSSSSSSD.",
    "..DDDDDDDD..",
    ".DSSSSSSSSD.",
    ".DSSDDSSDSD.",
    ".DSSSSSSSSD.",
    "..DDDDDDDD..",
    "............",
  ],
  // máscara de luchador (lucha libre)
  mask: [
    "...OOOOOO...",
    "..OOOOOOOO..",
    ".OOOOOOOOOO.",
    ".OFFFOOFFFO.",
    ".OF..OO..FO.",
    ".OF..OO..FO.",
    ".OOFFOOFFOO.",
    ".OOOOFFOOOO.",
    "..OOF..FOO..",
    "..OOFFFFOO..",
    "...OOOOOO...",
    "....OOOO....",
  ],
  // cartas (TCG Mitos y Leyendas)
  cards: [
    "............",
    "....SSSSSSS.",
    "....SDDDDDS.",
    ".BBBBBBBDDS.",
    ".BOOOOOBDDS.",
    ".BOFFFOBDDS.",
    ".BOFFFOBDDS.",
    ".BOOOOOBDDS.",
    ".BBBBBBBDDS.",
    ".BMMMMMBSSS.",
    ".BBBBBBB....",
    "............",
  ],
  // mancuerna (gym)
  dumbbell: [
    "............",
    "............",
    ".MM......MM.",
    "MMMM....MMMM",
    "MMMM....MMMM",
    "MMMMSSSSMMMM",
    "MMMMSSSSMMMM",
    "MMMM....MMMM",
    "MMMM....MMMM",
    ".MM......MM.",
    "............",
    "............",
  ],
  // control (gaming)
  gamepad: [
    "............",
    "............",
    "..MMMMMMMM..",
    ".MMMMMMMMMM.",
    ".MMBMMMMOMM.",
    ".MBBBMMOMOM.",
    ".MMBMMMMOMM.",
    ".MMMMMMMMMM.",
    ".MMM....MMM.",
    ".MM......MM.",
    "............",
    "............",
  ],
  // pantalla (series)
  screen: [
    "............",
    ".MMMMMMMMMM.",
    ".MCCCCCCCCM.",
    ".MCCCCCCCCM.",
    ".MCCBCCCCCM.",
    ".MCCBBCCCCM.",
    ".MCCBCCCCCM.",
    ".MCCCCCCCCM.",
    ".MMMMMMMMMM.",
    ".....MM.....",
    "...MMMMMM...",
    "............",
  ],
  // lata (bebida energética)
  can: [
    "....MMMM....",
    "...MBBBBM...",
    "...GGGGGG...",
    "...GGGGGG...",
    "...GGFGGG...",
    "...GFFGGG...",
    "...GGFFGG...",
    "...GGGFGG...",
    "...GGFGGG...",
    "...GGGGGG...",
    "...GGGGGG...",
    "....MMMM....",
  ],
} satisfies Record<string, string[]>;

export type SpriteName = keyof typeof SPRITES;

// ── Ficha de personaje ──
// Lo que no está en ninguna otra sección: quién es, de dónde viene y qué hace
// fuera del código. Los datos (clase, gremio, historia) viven en content.ts.

export type AboutGame = {
  /** placa del marco de la ficha */
  sheetTag: string;
  loreLabel: string;
  /** rótulo de cada dato de la ficha, por `key` de about.facts */
  factLabels: Record<string, string>;
  offCodeLabel: string;
  offCode: { sprite: SpriteName; name: string; note?: string }[];
};

export const ABOUT_GAME: Record<Lang, AboutGame> = {
  es: {
    sheetTag: "Jugador 1",
    loreLabel: "Lore",
    factLabels: { class: "Clase", current: "Gremio", location: "Base", education: "Formación", languages: "Idiomas" },
    offCodeLabel: "Fuera del código",
    offCode: [
      { sprite: "mask", name: "Lucha libre", note: "fan" },
      { sprite: "cards", name: "Mitos y Leyendas", note: "TCG" },
      { sprite: "gamepad", name: "Gaming" },
      { sprite: "dumbbell", name: "Gym" },
      { sprite: "screen", name: "Series" },
      { sprite: "can", name: "Bebida energética", note: "combustible" },
    ],
  },
  en: {
    sheetTag: "Player 1",
    loreLabel: "Lore",
    factLabels: { class: "Class", current: "Guild", location: "Base", education: "Education", languages: "Languages" },
    offCodeLabel: "Outside the code",
    offCode: [
      { sprite: "mask", name: "Lucha libre", note: "fan" },
      { sprite: "cards", name: "Mitos y Leyendas", note: "TCG" },
      { sprite: "gamepad", name: "Gaming" },
      { sprite: "dumbbell", name: "Gym" },
      { sprite: "screen", name: "TV series" },
      { sprite: "can", name: "Energy drinks", note: "fuel" },
    ],
  },
};
