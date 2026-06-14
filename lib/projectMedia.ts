/**
 * Medios reales por proyecto (independiente del idioma).
 * - `cover`: thumbnail para la card destacada del home.
 * - `shots`: capturas reales para la galería del case study, en el mismo
 *   orden que las captions de `gallery` en content.ts. Si un proyecto no
 *   tiene `shots`, la galería usa el mockup estilizado.
 */
export type ProjectMedia = {
  cover?: string;
  shots?: string[];
};

export const projectMedia: Record<string, ProjectMedia> = {
  lexy: {
    cover: "/projects/lexy-hero.jpg",
    shots: [
      "/projects/lexy-hero.jpg",
      "/projects/lexy-servicios.jpg",
      "/projects/lexy-equipo.jpg",
      "/projects/lexy-contacto.jpg",
    ],
  },
  landings: {
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
