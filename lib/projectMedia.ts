import type { SpriteName } from "@/lib/gamer";

/**
 * Medios por proyecto (independiente del idioma).
 * - `cover`: captura real para la tarjeta del home.
 * - `shots`: capturas reales para la galería del caso de estudio, en el mismo
 *   orden que las captions de `gallery` en content.ts. Sin `shots` no hay
 *   galería: no se inventan maquetas.
 * - `emblem`: sprite pixel-art que ocupa la ventana de arte de la tarjeta
 *   cuando el proyecto no puede mostrar capturas (confidencial o sin publicar).
 */
export type ProjectMedia = {
  cover?: string;
  shots?: string[];
  emblem?: SpriteName;
};

export const projectMedia: Record<string, ProjectMedia> = {
  fcc: {
    cover: "/projects/fcc-resumen-claro.jpg",
    shots: [
      "/projects/fcc-resumen-claro.jpg",
      "/projects/fcc-resumen-oscuro.jpg",
      "/projects/fcc-entrar-claro.jpg",
      "/projects/fcc-entrar-oscuro.jpg",
    ],
  },
  greensoft: { emblem: "leaf" },
  orbix: { emblem: "orbit" },
  dixta: { emblem: "scroll" },
  pagos: { emblem: "coin" },
  anrra: { emblem: "wood" },
  lexy: {
    cover: "/projects/lexy-hero.jpg",
    shots: [
      "/projects/lexy-hero.jpg",
      "/projects/lexy-servicios.jpg",
      "/projects/lexy-equipo.jpg",
      "/projects/lexy-contacto.jpg",
    ],
  },
  baoblue: {
    cover: "/projects/baoblue-hero.jpg",
    shots: [
      "/projects/baoblue-hero.jpg",
      "/projects/baoblue-catalogo.jpg",
      "/projects/baoblue-pasos.jpg",
      "/projects/baoblue-testimonios.jpg",
    ],
  },
  portfolio: {
    cover: "/projects/portfolio-hero.jpg",
    shots: [
      "/projects/portfolio-hero.jpg",
      "/projects/portfolio-about.jpg",
      "/projects/portfolio-proyectos.jpg",
      "/projects/portfolio-pixel.jpg",
    ],
  },
};
