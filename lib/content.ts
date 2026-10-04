/* ============================================================
   Contenido bilingüe del portafolio (ES / EN)
   Fuente: CV de Jeremy Landaeta Lizama
   ============================================================ */

export type Lang = "es" | "en";

export const SOCIALS = {
  email: "jlandaetalizama22@gmail.com",
  phone: "+56 9 9702 3812",
  linkedin: "https://linkedin.com/in/jeremy-landaeta-lizama-04b266223",
  github: "https://github.com/JeremyLandaeta",
} as const;

/**
 * CV según el idioma: ES descarga el español, EN el inglés. `name` es el nombre
 * con el que se guarda el archivo al descargar.
 */
export function cvFile(lang: Lang): { href: string; name: string } {
  return lang === "en"
    ? { href: "/cv-en.pdf", name: "Jeremy-Landaeta-Resume.pdf" }
    : { href: "/cv-es.pdf", name: "Jeremy-Landaeta-CV.pdf" };
}

export type NavItem = { id: string; label: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  /** resumen ≤160 caracteres para <meta description> y tarjetas sociales */
  metaDescription: string;
  description: string;
  /** aporte concreto resumido para la card del carrusel */
  contribution: string;
  tags: string[];
  badge?: string;
  href?: string;
  accent: "blue" | "cyan" | "violet" | "emerald";
};

export type CaseStudy = {
  problem: string;
  context: string;
  role: string[];
  solution: string[];
  learnings: string[];
  result: string;
  /** mockups / capturas (placeholders con caption, sin datos privados) */
  gallery: string[];
  links?: { demo?: string; repo?: string };
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags?: string[];
  current?: boolean;
};

export type CaseStudyLabels = {
  back: string;
  overview: string;
  problem: string;
  context: string;
  role: string;
  solution: string;
  tech: string;
  gallery: string;
  mockupNote: string;
  liveNote: string;
  learnings: string;
  result: string;
  viewDemo: string;
  viewRepo: string;
  notFound: string;
  backHome: string;
  /** título del bloque de enlaces a los otros casos de estudio */
  more: string;
  /** prefijo del texto alternativo de las capturas ("Captura de …") */
  shotOf: string;
};

export type Content = {
  nav: NavItem[];
  cta: { projects: string; cv: string; caseStudy: string; demo: string; code: string; privateRepo: string };
  caseStudyLabels: CaseStudyLabels;
  caseStudies: Record<string, CaseStudy>;
  hero: {
    badge: string;
    name: string;
    title: string;
    stack: string[];
    tagline: string;
    location: string;
  };
  about: {
    heading: string;
    kicker: string;
    loreKicker: string;
    loreHeading: string;
    paragraphs: string[];
    highlights: { value: string; label: string }[];
    facts: { key: string; label: string }[];
  };
  projects: {
    kicker: string;
    items: Project[];
  };
  experience: {
    heading: string;
    kicker: string;
    items: ExperienceItem[];
    education: { title: string; subtitle: string; certs: string[] };
  };
  stack: {
    heading: string;
    kicker: string;
    tools: string[];
  };
  building: {
    heading: string;
    kicker: string;
    items: { title: string; description: string; status: string; tags: string[] }[];
  };
  github: {
    note: string;
    cta: string;
  };
  faq: {
    heading: string;
    kicker: string;
    items: { q: string; a: string }[];
  };
  contact: {
    heading: string;
    kicker: string;
    status: string;
    description: string;
    emailLabel: string;
  };
  footer: {
    built: string;
    rights: string;
    /** etiqueta de los enlaces a casos de estudio del pie */
    projects: string;
  };
};

const es: Content = {
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "proyectos", label: "Proyectos" },
    { id: "experiencia", label: "Experiencia" },
    { id: "stack", label: "Stack" },
    { id: "faq", label: "FAQ" },
    { id: "contacto", label: "Contacto" },
  ],
  cta: {
    projects: "Ver proyectos",
    cv: "Descargar CV",
    caseStudy: "Ver caso de estudio",
    demo: "Demo",
    code: "Código",
    privateRepo: "Repo privado",
  },
  caseStudyLabels: {
    back: "Volver",
    overview: "Resumen",
    problem: "Problema",
    context: "Contexto",
    role: "Mi rol",
    solution: "Solución",
    tech: "Tecnologías",
    gallery: "Vistas",
    mockupNote: "Mockups representativos · sin datos reales por confidencialidad",
    liveNote: "Capturas del sitio en vivo",
    learnings: "Aprendizajes",
    result: "Resultado",
    viewDemo: "Ver demo",
    viewRepo: "Ver repositorio",
    notFound: "Proyecto no encontrado",
    backHome: "Volver al inicio",
    more: "Más proyectos",
    shotOf: "Captura de",
  },
  caseStudies: {
    lexy: {
      problem:
        "Los abogados de una firma pierden tiempo respondiendo las mismas consultas básicas una y otra vez, mientras los usuarios no saben a quién preguntar ni cómo empezar.",
      context:
        "Proyecto de título en equipo (Duoc UC, 2024). Una plataforma legal que combina un chatbot con IA para resolver dudas generales y derivar los casos complejos a un abogado, con un backoffice donde el equipo recibe la consulta y le hace seguimiento.",
      role: [
        "Construí el frontend del sitio público: hero, servicios, equipo de abogados y formulario de contacto, con Next.js, Tailwind y shadcn/ui.",
        "Trabajé en equipo dentro de un proyecto end-to-end (chatbot + backoffice), integrando mi parte con el resto de la app.",
        "Colaboré en la puesta a punto de la IA: ajustar el system prompt y el contexto para que respondiera solo dentro del dominio legal.",
      ],
      solution: [
        "Sitio público que presenta a la firma y sus servicios, con el chatbot Lexy como puerta de entrada.",
        "Chatbot con la API de OpenAI para resolver consultas generales; los casos específicos se derivan a un abogado.",
        "Backoffice para recibir la consulta derivada y contactar directamente a la persona.",
        "Autenticación con NextAuth y datos persistidos en MongoDB.",
      ],
      learnings: [
        "Primera vez conectando un producto a una IA: acotar respuestas con system prompt y contexto en un dominio sensible.",
        "Trabajo en equipo real sobre una base de código compartida, integrando mi parte con la del resto.",
      ],
      result:
        "Plataforma desplegada en Vercel y presentada como proyecto de título. El sitio sigue en línea y funcional.",
      gallery: ["Hero — Confía en la justicia", "Servicios legales", "Equipo de abogados", "Contacto"],
      links: {
        demo: "https://lexy-lime.vercel.app",
        repo: "https://github.com/Francolin09/LexyBien",
      },
    },
    greensoft: {
      problem:
        "Cumplir la Ley REP y reportar huella de carbono implica registrar, validar y trazar mucha información (residuos por período, documentos, estados) de forma manual y propensa a error.",
      context:
        "Producto interno de Ambientalia desarrollado en Greensoft (mi trabajo actual). Dos plataformas: EcoREP, para la trazabilidad de residuos y el cumplimiento de la Ley REP, y 0 Carbono, para medir la huella de carbono de eventos.",
      role: [
        "En 0 Carbono tomé las decisiones de diseño y construí el frontend prácticamente solo.",
        "En EcoREP sumé vistas nuevas y mejoré la interfaz para que se entendiera a la primera.",
        "Implementé un gestor de archivos por período: cada Excel cargado queda asignado a su período, así se revisa la trazabilidad de los residuos de cada mes.",
      ],
      solution: [
        "Formularios de varias capas rediseñados para que el usuario los entienda al primer vistazo.",
        "Manejo de estados según lo que carga el usuario: residuos pendientes, listos u homologados.",
        "Gestor de archivos que organiza los Excels por período y mantiene la trazabilidad.",
        "Frontend en React, Next.js y TypeScript, desplegado en Vercel.",
      ],
      learnings: [
        "Traducir requisitos normativos (Ley REP, huella de carbono) en interfaces usables.",
        "Diseñar formularios extensos y máquinas de estado que no confundan al usuario.",
      ],
      result:
        "Dos plataformas en producción usadas internamente por Ambientalia para procesos reales de Ley REP y huella de carbono.",
      gallery: ["EcoREP — trazabilidad de residuos", "Gestor de archivos por período", "Estados de residuos", "0 Carbono — huella de eventos"],
    },
    orbix: {
      problem:
        "Ambientalia tiene varios productos (leyrep.cl, ambientalia.cl) que reciben las mismas consultas por WhatsApp, y además necesita un flujo constante de comunicaciones. Hecho a mano, todo eso consume tiempo del equipo.",
      context:
        "Herramienta interna desarrollada en Greensoft. Orbix es “un agente que orbita” los productos de Ambientalia: por un lado responde WhatsApps con IA, por otro automatiza la generación de noticias. La planeé y construí solo.",
      role: [
        "Planeé la solución completa y desarrollé el backend (sin interfaz gráfica, corre server-side).",
        "Construí los chatbots de WhatsApp con IA (LaravelAI) para leyrep.cl y ambientalia.cl (Greensoft.cl en camino).",
        "Armé el pipeline de noticias: scraping en Python (Scrapling) + un modelo local de Ollama (qwen), conectado a Bitrix24 por webhook.",
      ],
      solution: [
        "Chatbots que responden las consultas por WhatsApp de cada sitio con IA.",
        "Un cron busca noticias de Ley REP en las fuentes configuradas; si no hay, trae medioambientales.",
        "El modelo local resume cada noticia en un borrador con hashtags y CTA, listo para revisar en Bitrix24.",
        "IA local con Ollama para mantener el costo y los datos dentro del servidor.",
      ],
      learnings: [
        "Integrar un scraping confiable fue lo más tedioso del proyecto.",
        "Diseñar un único agente que cubre varios productos y canales (WhatsApp + comunicaciones).",
      ],
      result:
        "En uso interno: responde los WhatsApps de los sitios de Ambientalia y sigue generando borradores de noticias listos para revisar en Bitrix24.",
      gallery: ["Chatbot de WhatsApp", "Pipeline de scraping", "Borrador generado", "Revisión en Bitrix24"],
    },
    pagos: {
      problem:
        "Un cliente quería vender varios dominios online y necesitaba una web con catálogo y pago integrado, en vez de gestionar cada venta a mano.",
      context:
        "Encargo individual: tu-dominio.cl, una web para vender dominios. La construí solo de punta a punta.",
      role: [
        "Desarrollé todo: frontend, backend y base de datos.",
        "Integré Mercado Pago (en modo de prueba) y manejé el estado de cada dominio.",
        "Modelé los datos en Supabase (Postgres).",
      ],
      solution: [
        "Catálogo de dominios con un estado por dominio: al seleccionarlo pasa a “pendiente”.",
        "Si el pago resulta satisfactorio, el dominio cambia a “vendido”.",
        "Tras la venta, el equipo contacta al usuario para transferir el dominio vía nic.cl.",
        "Frontend en React/Next.js y base de datos en Supabase/Postgres.",
      ],
      learnings: [
        "Integrar una pasarela de pago y reaccionar a su resultado para mover el estado de la orden.",
        "Dejar un producto funcional terminado, aunque el despliegue dependa de terceros.",
      ],
      result:
        "Plataforma funcional con pagos en modo de prueba. No llegó a producción porque el cliente no envió los términos y condiciones requeridos.",
      gallery: ["Catálogo de dominios", "Estados pendiente/vendido", "Checkout con Mercado Pago"],
    },
    landings: {
      problem:
        "Dos emprendimientos pequeños (aros de arcilla y productos en madera) necesitaban presencia web para mostrarse y recibir ventas por WhatsApp, sin la complejidad de un e-commerce.",
      context:
        "Dos landing pages freelance hechas en mi tiempo libre para personas cercanas. Diseñé y desarrollé ambas solo, ajustando el tono a cada negocio y personalidad.",
      role: [
        "Diseñé y desarrollé las dos landings de punta a punta.",
        "Adapté el estilo a cada marca: BaoBlue (aros de arcilla) con colores vibrantes; Anrra (productos en madera) más cálida.",
        "Conecté el CTA directo al WhatsApp del encargado de ventas, sin formulario intermedio.",
      ],
      solution: [
        "Sitios responsivos en React/Next.js con animaciones (Framer Motion) y componentes reutilizables.",
        "BaoBlue: catálogo de aros con hover, proceso de compra en 3 pasos, testimonios y FAQ.",
        "Paleta vibrante pero armoniosa, con las animaciones que más me gustan del proyecto.",
        "Despliegue en Vercel con flujo en GitHub.",
      ],
      learnings: [
        "Traducir la personalidad de cada persona y negocio en decisiones visuales.",
        "Mantener animaciones llamativas sin romper la armonía visual.",
      ],
      result:
        "BaoBlue está en vivo y en uso. Anrra quedó terminada a nivel de desarrollo, a la espera de que el cliente enviara las fotos del contenido.",
      gallery: ["BaoBlue — Aros únicos para personas únicas", "Catálogo de aros (hover)", "Cómo comprar en 3 pasos", "Testimonios de clientas"],
      links: {
        demo: "https://baoblue-web.vercel.app/",
      },
    },
    portfolio: {
      problem:
        "Un portafolio genérico no dice nada de cómo trabajo. Quería uno que demostrara criterio de diseño, frontend moderno y personalidad, no una plantilla más.",
      context:
        "Este mismo sitio. Lo diseñé y desarrollé solo, de cero, como carta de presentación técnica.",
      role: [
        "Diseño y desarrollo completos, sin plantillas ni librerías de UI.",
        "Arquitectura en Next.js 16 (App Router) y React 19, con i18n es/en basada en URL para SEO.",
        "Capa de interacción a medida: animaciones con Framer Motion, partículas, cursor glow y tilt 3D en las cards.",
      ],
      solution: [
        "Una capa “gamer” opcional (RPG/MOBA/TCG): stats de personaje, card estilo campeón con kit de habilidades y una “Current Quest”.",
        "Escena pixel-art propia (samurái + fogata) animada.",
        "Contador de edad en tiempo real y secciones de experiencia, stack y FAQ.",
        "Diseño responsivo, cuidando el rendimiento y las animaciones.",
      ],
      learnings: [
        "Aprender Next.js 16 y React 19 desde su documentación, no desde la memoria.",
        "Equilibrar una identidad llamativa con rendimiento y legibilidad.",
      ],
      result:
        "El portafolio que estás viendo: un sitio propio, sin plantillas, que funciona como demo viva de mi frontend.",
      gallery: ["Hero + HUD", "Sobre mí — stats de personaje", "Proyectos", "Escena pixel-art"],
    },
  },
  hero: {
    badge: "Del diseño al deploy",
    name: "Jeremy Landaeta Lizama",
    title: "Frontend Developer",
    stack: ["React", "Next.js", "TypeScript"],
    tagline:
      "Diseño y desarrollo productos web modernos, con interfaces cuidadas, APIs e IA aplicada cuando el producto lo necesita.",
    location: "Santiago, Chile",
  },
  about: {
    kicker: "Quién soy",
    heading: "Perfil y proyectos destacados",
    loreKicker: "Fuera del código",
    loreHeading: "El personaje detrás del teclado",
    paragraphs: [
      "Ingeniero en Informática titulado de Duoc UC, con experiencia desarrollando y desplegando soluciones en producción con React, Next.js, TypeScript y Node.js.",
      "He participado en calculadoras ambientales, chatbots con IA, integraciones CRM y pasarelas de pago. Combino una mirada técnica con orientación a negocio, mejora continua y trabajo colaborativo.",
    ],
    highlights: [
      { value: "6+", label: "iniciativas digitales en el primer año" },
      { value: "2", label: "calculadoras ambientales en producción" },
      { value: "805", label: "puntos TOEIC (inglés)" },
      { value: "2025", label: "titulado en Ingeniería Informática" },
    ],
    facts: [
      { key: "location", label: "Santiago, Chile" },
      { key: "education", label: "Duoc UC · Titulado 2025" },
      { key: "languages", label: "Español · Inglés (TOEIC 805)" },
      { key: "current", label: "Actualmente en Greensoft" },
    ],
  },
  projects: {
    kicker: "Lo que he construido",
    items: [
      {
        id: "lexy",
        title: "LEXY — Soluciones Legales",
        tagline: "Chatbot legal + backoffice",
        metaDescription:
          "Caso de estudio de LEXY: plataforma legal con chatbot de IA y backoffice. Proyecto de título en equipo; mi foco fue el frontend del sitio público.",
        description:
          "Plataforma legal que combina un chatbot con IA y un backoffice: resuelve dudas generales y deriva los casos complejos a un abogado, que les hace seguimiento. Proyecto de título en equipo; mi foco fue el frontend del sitio público.",
        contribution:
          "Proyecto en equipo. Construí el frontend del sitio público y colaboré en la puesta a punto de la IA, integrando mi parte end-to-end.",
        tags: ["Next.js", "TypeScript", "MongoDB", "OpenAI", "Tailwind"],
        badge: "Proyecto de título",
        accent: "blue",
      },
      {
        id: "greensoft",
        title: "Greensoft · EcoREP · 0 Carbono",
        tagline: "Plataformas ambientales en producción",
        metaDescription:
          "Caso de estudio de EcoREP y 0 Carbono: plataformas ambientales en producción. Frontend con React, Next.js, TypeScript, MUI y RTK Query.",
        description:
          "Dos plataformas internas de Ambientalia: EcoREP, para la trazabilidad de residuos y el cumplimiento de la Ley REP, y 0 Carbono, para medir la huella de carbono de eventos. Armé el frontend de 0 Carbono casi solo (decisiones de diseño incluidas) y sumé vistas nuevas y un gestor de archivos por período en EcoREP.",
        contribution:
          "Lideré y desarrollé módulos frontend (Carbono y REP) con React, Next.js, TypeScript, MUI y RTK Query; cuidé formularios, validaciones y despliegue.",
        tags: ["React", "Next.js", "TypeScript", "MUI", "RTK Query", "APIs"],
        badge: "En producción",
        accent: "cyan",
      },
      {
        id: "orbix",
        title: "Orbix",
        tagline: "Un agente que orbita los productos",
        metaDescription:
          "Caso de estudio de Orbix: agente interno que responde WhatsApps con IA y automatiza comunicaciones con Python, Laravel AI, Ollama y Bitrix24.",
        description:
          "Agente interno que “orbita” los productos de Ambientalia (leyrep.cl, ambientalia.cl): responde WhatsApps con IA (LaravelAI) y automatiza comunicaciones — un cron en Python scrapea noticias y un modelo local (Ollama) arma los borradores en Bitrix24. Lo planeé y construí solo.",
        contribution:
          "Diseñé y construí el flujo completo del agente, integrando WhatsApp, Bitrix24, Python, Laravel AI y Ollama.",
        tags: ["Python", "Laravel AI", "Ollama", "Bitrix24"],
        badge: "En uso interno",
        accent: "violet",
      },
      {
        id: "pagos",
        title: "tu-dominio.cl",
        tagline: "E-commerce de dominios + pagos",
        metaDescription:
          "Caso de estudio de tu-dominio.cl: e-commerce de dominios construido solo, de punta a punta, con Next.js, Supabase y Mercado Pago en modo de prueba.",
        description:
          "Web para vender dominios, construida solo de punta a punta: catálogo con estados por dominio (pendiente → vendido), Mercado Pago en modo de prueba y Supabase/Postgres. Funcional, pero sin desplegar por documentos pendientes del cliente.",
        contribution:
          "Lo construí solo de punta a punta: frontend, backend y base de datos. Integré Mercado Pago y modelé los datos en Supabase.",
        tags: ["Next.js", "Supabase", "Mercado Pago"],
        badge: "Prototipo funcional",
        accent: "blue",
      },
      {
        id: "landings",
        title: "BaoBlue · Anrra",
        tagline: "Landing pages a medida",
        metaDescription:
          "Caso de estudio de BaoBlue y Anrra: landing pages freelance diseñadas y desarrolladas solo con React, Next.js, Tailwind y Framer Motion.",
        description:
          "Dos landings freelance diseñadas y desarrolladas solo, ajustando el tono a cada negocio. BaoBlue (aros de arcilla) está en vivo, con animaciones vibrantes pero armoniosas; Anrra (madera) quedó a la espera del contenido del cliente. El CTA lleva directo al WhatsApp de ventas.",
        contribution:
          "Diseñé y desarrollé ambas solo, con animaciones (Framer Motion) y el CTA directo al WhatsApp de ventas.",
        tags: ["React", "Next.js", "Tailwind", "Framer Motion"],
        badge: "En vivo",
        accent: "cyan",
      },
      {
        id: "portfolio",
        title: "Este portafolio",
        tagline: "Next.js 16 + capa gamer",
        metaDescription:
          "Caso de estudio de este portafolio: Next.js 16 y React 19, i18n es/en por URL, animaciones con Framer Motion y una capa gamer. Sin plantillas.",
        description:
          "El sitio que estás viendo. Lo diseñé y construí solo con Next.js 16 y React 19: i18n es/en por URL, animaciones con Framer Motion y una capa “gamer” (RPG/MOBA/TCG) con escena pixel-art, stats de personaje y cards estilo campeón. Sin plantillas.",
        contribution:
          "Diseño y desarrollo completos, sin plantillas, con Next.js 16 y React 19.",
        tags: ["Next.js 16", "React 19", "Framer Motion", "Tailwind"],
        badge: "Hecho a mano",
        accent: "emerald",
      },
    ],
  },
  experience: {
    kicker: "El camino",
    heading: "Experiencia profesional",
    items: [
      {
        role: "Frontend Developer / Software Developer",
        company: "Vínculo Verde / Greensoft",
        period: "Jun 2025 — Actualidad",
        location: "Santiago, Chile",
        current: true,
        bullets: [
          "Participé en más de 6 iniciativas digitales en el primer año: productos en producción, herramientas internas con IA, integraciones CRM y una pasarela de pagos.",
          "Lideré técnicamente el frontend de calculadoras ambientales (Carbono y REP), desplegando dos en producción con React, Next.js y TypeScript.",
          "Diseñé e implementé Orbix, asistente con IA generativa integrado a Bitrix24, e impulsé un chatbot de WhatsApp con IA local (Ollama), coordinando al equipo.",
          "Contribuí a EcoREP con un gestor de archivos y desarrollé una plataforma de venta de dominios con base de datos e integración de Mercado Pago.",
          "Integré servicios externos, gestioné despliegues en Vercel y trabajé con Git y GitHub en un flujo ágil (Scrum).",
        ],
        tags: ["React", "Next.js", "TypeScript", "Node.js", "IA / OpenAI", "Ollama", "Vercel"],
      },
      {
        role: "Desarrollador Frontend — Freelance",
        company: "BaoBlue",
        period: "2025",
        location: "Remoto",
        bullets: [
          "Desarrollé una landing page a medida para la presentación comercial de la marca.",
          "Implementé diseño responsivo, animaciones y componentes reutilizables, con despliegue en Vercel y flujo de trabajo en GitHub.",
        ],
        tags: ["React", "Tailwind", "Framer Motion", "Vercel"],
      },
      {
        role: "Proyecto de Título — Desarrollo end-to-end",
        company: "LEXY · Duoc UC",
        period: "2024 — 2025",
        location: "Santiago, Chile",
        bullets: [
          "Diseñé y desarrollé un chatbot legal con un backoffice administrativo para gestionar preguntas, respuestas y usuarios.",
          "Integré IA para mejorar la interacción y apoyar el flujo de atención, de extremo a extremo.",
        ],
        tags: ["Next.js", "TypeScript", "IA", "Backoffice"],
      },
      {
        role: "Práctica Profesional — Área de Assurance",
        company: "PwC Chile",
        period: "Oct 2024 — Nov 2024",
        location: "Santiago, Chile",
        bullets: [
          "Participé en auditorías de procesos internos en empresas de seguros y banca, verificando trazabilidad y cumplimiento.",
          "Elaboré documentación y reportes de apoyo con foco en control, gestión de riesgos y mejora de procesos.",
        ],
        tags: ["Auditoría", "Control interno", "Gestión de riesgos", "Documentación"],
      },
    ],
    education: {
      title: "Ingeniería en Informática — Duoc UC",
      subtitle: "Titulado 2025",
      certs: ["Scrum Foundation (2024)", "TOEIC 805 pts", "Inglés intermedio-avanzado"],
    },
  },
  stack: {
    kicker: "Caja de herramientas",
    heading: "Stack técnico",
    tools: ["Material UI", "Ant Design", "Prisma", "PHP", "REST APIs", "SQL Server", "Claude", "GitHub", "ApiDOG", "Docker", "Power BI", "Bitrix24", "Mercado Pago"],
  },
  building: {
    kicker: "Ahora mismo",
    heading: "Lo que tengo entre manos",
    items: [
      { title: "Automatizaciones para Greensoft", description: "Herramientas internas para optimizar procesos del equipo, con Bitrix24, APIs y scripts.", status: "Activo", tags: ["Bitrix24", "APIs", "Scripts"] },
      { title: "Exploraciones con IA local", description: "Experimentos con modelos locales (Ollama) y agentes aplicados a flujos reales.", status: "Explorando", tags: ["Ollama", "Agentes", "IA local"] },
      { title: "Newsletter automatizado con IA", description: "Generación y publicación de contenido con IA local y automatización de flujos.", status: "Explorando", tags: ["IA local", "n8n", "RSS"] },
    ],
  },
  github: {
    note: "Trabajo principalmente con TypeScript, React y Next.js. Algunos proyectos laborales no tienen repositorio público por confidencialidad.",
    cta: "Ver GitHub",
  },
  faq: {
    kicker: "Lo que me preguntan",
    heading: "Respuestas rápidas",
    items: [
      {
        q: "¿En qué estás trabajando actualmente?",
        a: "Trabajo como desarrollador de software en Greensoft, construyendo productos ambientales, automatizaciones e integraciones con IA. Además, mantengo proyectos personales donde exploro nuevas ideas y tecnologías.",
      },
      {
        q: "¿Cuál es tu stack principal?",
        a: "React, Next.js, TypeScript y Node.js, con Tailwind para la UI e integraciones con IA (OpenAI, Ollama). Me muevo cómodo de la base de datos al frontend.",
      },
      {
        q: "¿Hablas inglés?",
        a: "Sí, nivel intermedio-avanzado (TOEIC 805). Puedo trabajar sin problema en equipos en inglés.",
      },
      {
        q: "¿Qué tipo de proyectos te emocionan más?",
        a: "Todos: productos con IA, interfaces/frontend y desarrollos fullstack end-to-end. Me gusta variar y seguir aprendiendo.",
      },
      {
        q: "¿Cómo trabajas?",
        a: "Con metodologías ágiles (Scrum), foco en producto real, mejora continua y mucho trabajo en equipo.",
      },
    ],
  },
  contact: {
    kicker: "Hablemos",
    heading: "¿Trabajamos juntos?",
    status: "Siempre abierto a una buena conversación",
    description:
      "Estoy abierto a oportunidades Frontend, proyectos web e iniciativas donde pueda aportar con React, Next.js, TypeScript e IA aplicada.",
    emailLabel: "Escríbeme",
  },
  footer: {
    built: "Stack: Next.js · TypeScript · Tailwind",
    rights: "Forjado en Santiago, Chile",
    projects: "Casos de estudio",
  },
};

const en: Content = {
  nav: [
    { id: "inicio", label: "Home" },
    { id: "proyectos", label: "Projects" },
    { id: "experiencia", label: "Experience" },
    { id: "stack", label: "Stack" },
    { id: "faq", label: "FAQ" },
    { id: "contacto", label: "Contact" },
  ],
  cta: {
    projects: "View projects",
    cv: "Download CV",
    caseStudy: "View case study",
    demo: "Demo",
    code: "Code",
    privateRepo: "Private repo",
  },
  caseStudyLabels: {
    back: "Back",
    overview: "Overview",
    problem: "Problem",
    context: "Context",
    role: "My role",
    solution: "Solution",
    tech: "Tech stack",
    gallery: "Views",
    mockupNote: "Representative mockups · no real data, for confidentiality",
    liveNote: "Screenshots from the live site",
    learnings: "Learnings",
    result: "Result",
    viewDemo: "View demo",
    viewRepo: "View repository",
    notFound: "Project not found",
    backHome: "Back to home",
    more: "More projects",
    shotOf: "Screenshot of",
  },
  caseStudies: {
    lexy: {
      problem:
        "Lawyers at a firm waste time answering the same basic questions over and over, while users don't know who to ask or how to start.",
      context:
        "Team capstone project (Duoc UC, 2024). A legal platform pairing an AI chatbot to handle general questions and route complex cases to a lawyer, with a back office where the team picks up the query and follows up.",
      role: [
        "Built the frontend of the public site: hero, services, lawyer team and contact form, with Next.js, Tailwind and shadcn/ui.",
        "Worked within a team on an end-to-end project (chatbot + back office), integrating my part with the rest of the app.",
        "Helped tune the AI: adjusting the system prompt and context so it answered only within the legal domain.",
      ],
      solution: [
        "Public site that introduces the firm and its services, with the Lexy chatbot as the entry point.",
        "Chatbot powered by the OpenAI API for general questions; specific cases are routed to a lawyer.",
        "Back office to receive the routed query and contact the person directly.",
        "Authentication with NextAuth and data persisted in MongoDB.",
      ],
      learnings: [
        "First time wiring a product to an AI: constraining answers with a system prompt and context in a sensitive domain.",
        "Real teamwork on a shared codebase, integrating my part with everyone else's.",
      ],
      result:
        "Platform deployed on Vercel and presented as a capstone project. The site is still live and working.",
      gallery: ["Hero — Trust in justice", "Legal services", "Lawyer team", "Contact"],
      links: {
        demo: "https://lexy-lime.vercel.app",
        repo: "https://github.com/Francolin09/LexyBien",
      },
    },
    greensoft: {
      problem:
        "Complying with the EPR law and reporting a carbon footprint means recording, validating and tracing a lot of information (waste per period, documents, states) manually and error-prone.",
      context:
        "An internal product for Ambientalia, built at Greensoft (my current job). Two platforms: EcoREP, for waste traceability and EPR-law compliance, and 0 Carbono, to measure the carbon footprint of events.",
      role: [
        "On 0 Carbono I made the design decisions and built the frontend almost solo.",
        "On EcoREP I added new views and improved the UI so users got it at first glance.",
        "Built a per-period file manager: each uploaded Excel is assigned to its period, so you can review each month's waste traceability.",
      ],
      solution: [
        "Multi-layer forms redesigned so users understand them at first glance.",
        "State handling driven by what the user uploads: waste pending, ready or approved.",
        "File manager that organizes Excels by period and keeps traceability.",
        "Frontend in React, Next.js and TypeScript, deployed on Vercel.",
      ],
      learnings: [
        "Translating regulatory requirements (EPR law, carbon footprint) into usable interfaces.",
        "Designing large forms and state machines that don't confuse the user.",
      ],
      result:
        "Two platforms in production, used internally by Ambientalia for real EPR-law and carbon-footprint processes.",
      gallery: ["EcoREP — waste traceability", "Per-period file manager", "Waste states", "0 Carbono — event footprint"],
    },
    orbix: {
      problem:
        "Ambientalia has several products (leyrep.cl, ambientalia.cl) that get the same WhatsApp questions, and it also needs a steady stream of communications. Done by hand, all of that eats team time.",
      context:
        "An internal tool built at Greensoft. Orbix is “an agent that orbits” Ambientalia's products: on one side it answers WhatsApps with AI, on the other it automates news generation. I planned and built it solo.",
      role: [
        "Planned the whole solution and built the backend (no GUI, it runs server-side).",
        "Built the WhatsApp AI chatbots (LaravelAI) for leyrep.cl and ambientalia.cl (Greensoft.cl on the way).",
        "Built the news pipeline: scraping in Python (Scrapling) + a local Ollama model (qwen), wired to Bitrix24 over a webhook.",
      ],
      solution: [
        "Chatbots that answer each site's WhatsApp questions with AI.",
        "A cron looks for EPR-law news in the configured sources; if there's none, it pulls environmental news.",
        "The local model summarizes each item into a draft with hashtags and CTA, ready to review in Bitrix24.",
        "Local AI with Ollama to keep cost and data inside the server.",
      ],
      learnings: [
        "Building reliable scraping was the most tedious part of the project.",
        "Designing a single agent that covers several products and channels (WhatsApp + communications).",
      ],
      result:
        "In internal use: it answers WhatsApps for Ambientalia's sites and keeps generating news drafts, ready to review in Bitrix24.",
      gallery: ["WhatsApp chatbot", "Scraping pipeline", "Generated draft", "Review in Bitrix24"],
    },
    pagos: {
      problem:
        "A client wanted to sell several domains online and needed a site with a catalog and integrated payment, instead of handling each sale by hand.",
      context:
        "A solo commission: tu-dominio.cl, a site to sell domains. I built it solo, end to end.",
      role: [
        "Built everything: frontend, backend and database.",
        "Integrated Mercado Pago (in test mode) and handled each domain's state.",
        "Modeled the data in Supabase (Postgres).",
      ],
      solution: [
        "Domain catalog with a state per domain: selecting one moves it to “pending”.",
        "If the payment succeeds, the domain changes to “sold”.",
        "After the sale, the team contacts the user to transfer the domain via nic.cl.",
        "Frontend in React/Next.js and database in Supabase/Postgres.",
      ],
      learnings: [
        "Integrating a payment gateway and reacting to its result to move the order state.",
        "Leaving a finished, functional product even when deployment depends on third parties.",
      ],
      result:
        "A functional platform with payments in test mode. It never reached production because the client didn't send the required terms and conditions.",
      gallery: ["Domain catalog", "Pending/sold states", "Mercado Pago checkout"],
    },
    landings: {
      problem:
        "Two small businesses (clay earrings and woodwork) needed a web presence to show themselves off and take sales over WhatsApp, without the complexity of an e-commerce.",
      context:
        "Two freelance landing pages built in my free time for people close to me. I designed and built both solo, tuning the tone to each business and personality.",
      role: [
        "Designed and built both landings end to end.",
        "Tailored the style to each brand: BaoBlue (clay earrings) with vibrant colors; Anrra (woodwork) warmer.",
        "Wired the CTA straight to the salesperson's WhatsApp, with no intermediate form.",
      ],
      solution: [
        "Responsive sites in React/Next.js with animations (Framer Motion) and reusable components.",
        "BaoBlue: earring catalog with hover, a 3-step buying process, testimonials and FAQ.",
        "A vibrant yet harmonious palette, with the animations I like most in the project.",
        "Deployment on Vercel with a GitHub workflow.",
      ],
      learnings: [
        "Translating each person's and business's personality into visual decisions.",
        "Keeping eye-catching animations without breaking visual harmony.",
      ],
      result:
        "BaoBlue is live and in use. Anrra is finished on the development side, waiting for the client to send the content photos.",
      gallery: ["BaoBlue — Unique earrings for unique people", "Earring catalog (hover)", "How to buy in 3 steps", "Customer testimonials"],
      links: {
        demo: "https://baoblue-web.vercel.app/",
      },
    },
    portfolio: {
      problem:
        "A generic portfolio says nothing about how I work. I wanted one that showed design judgment, modern frontend and personality, not yet another template.",
      context:
        "This very site. I designed and built it solo, from scratch, as a technical calling card.",
      role: [
        "Full design and development, with no templates or UI libraries.",
        "Architecture on Next.js 16 (App Router) and React 19, with URL-based es/en i18n for SEO.",
        "A custom interaction layer: Framer Motion animations, particles, cursor glow and 3D tilt on the cards.",
      ],
      solution: [
        "An optional “gamer” layer (RPG/MOBA/TCG): character stats, a champion-style card with an ability kit and a “Current Quest”.",
        "A custom animated pixel-art scene (samurai + campfire).",
        "A real-time age counter and experience, stack and FAQ sections.",
        "Responsive design, mindful of performance and animations.",
      ],
      learnings: [
        "Learning Next.js 16 and React 19 from their docs, not from memory.",
        "Balancing a bold identity with performance and readability.",
      ],
      result:
        "The portfolio you're looking at: a site of my own, no templates, that works as a live demo of my frontend.",
      gallery: ["Hero + HUD", "About — character stats", "Projects", "Pixel-art scene"],
    },
  },
  hero: {
    badge: "From design to deploy",
    name: "Jeremy Landaeta Lizama",
    title: "Frontend Developer",
    stack: ["React", "Next.js", "TypeScript"],
    tagline:
      "I design and build modern web products with polished interfaces, APIs and applied AI when the product needs it.",
    location: "Santiago, Chile",
  },
  about: {
    kicker: "Who I am",
    heading: "Profile & featured projects",
    loreKicker: "Outside the code",
    loreHeading: "The character behind the keyboard",
    paragraphs: [
      "Computer Engineer graduated from Duoc UC, with experience building and deploying production solutions with React, Next.js, TypeScript and Node.js.",
      "I've worked on environmental calculators, AI chatbots, CRM integrations and payment gateways. I pair a technical mindset with business focus, continuous improvement and teamwork.",
    ],
    highlights: [
      { value: "6+", label: "digital initiatives in my first year" },
      { value: "2", label: "environmental calculators in production" },
      { value: "805", label: "TOEIC score (English)" },
      { value: "2025", label: "Computer Engineering graduate" },
    ],
    facts: [
      { key: "location", label: "Santiago, Chile" },
      { key: "education", label: "Duoc UC · Graduated 2025" },
      { key: "languages", label: "Spanish · English (TOEIC 805)" },
      { key: "current", label: "Currently at Greensoft" },
    ],
  },
  projects: {
    kicker: "What I've built",
    items: [
      {
        id: "lexy",
        title: "LEXY — Legal Solutions",
        tagline: "Legal chatbot + back office",
        metaDescription:
          "LEXY case study: a legal platform pairing an AI chatbot with a back office. Team capstone project; my focus was the frontend of the public site.",
        description:
          "A legal platform pairing an AI chatbot with a back office: it answers general questions and routes complex cases to a lawyer who follows up. Team capstone project; my focus was the frontend of the public site.",
        contribution:
          "Team project. Built the frontend of the public site and helped tune the AI, integrating my part end-to-end.",
        tags: ["Next.js", "TypeScript", "MongoDB", "OpenAI", "Tailwind"],
        badge: "Capstone project",
        accent: "blue",
      },
      {
        id: "greensoft",
        title: "Greensoft · EcoREP · 0 Carbono",
        tagline: "Environmental platforms in production",
        metaDescription:
          "EcoREP and 0 Carbono case study: environmental platforms in production. Frontend built with React, Next.js, TypeScript, MUI and RTK Query.",
        description:
          "Two internal platforms for Ambientalia: EcoREP, for waste traceability and EPR-law compliance, and 0 Carbono, to measure the carbon footprint of events. I built the 0 Carbono frontend almost solo (design decisions included) and added new views plus a per-period file manager to EcoREP.",
        contribution:
          "Led and built frontend modules (Carbon and EPR) with React, Next.js, TypeScript, MUI and RTK Query; handled forms, validation and deployment.",
        tags: ["React", "Next.js", "TypeScript", "MUI", "RTK Query", "APIs"],
        badge: "In production",
        accent: "cyan",
      },
      {
        id: "orbix",
        title: "Orbix",
        tagline: "An agent that orbits the products",
        metaDescription:
          "Orbix case study: an internal agent that answers WhatsApps with AI and automates communications with Python, Laravel AI, Ollama and Bitrix24.",
        description:
          "An internal agent that “orbits” Ambientalia's products (leyrep.cl, ambientalia.cl): it answers WhatsApps with AI (LaravelAI) and automates communications — a Python cron scrapes news and a local model (Ollama) builds the drafts in Bitrix24. I planned and built it solo.",
        contribution:
          "Designed and built the whole agent flow, integrating WhatsApp, Bitrix24, Python, Laravel AI and Ollama.",
        tags: ["Python", "Laravel AI", "Ollama", "Bitrix24"],
        badge: "Internal use",
        accent: "violet",
      },
      {
        id: "pagos",
        title: "tu-dominio.cl",
        tagline: "Domain e-commerce + payments",
        metaDescription:
          "tu-dominio.cl case study: a domain e-commerce built solo, end to end, with Next.js, Supabase and Mercado Pago in test mode.",
        description:
          "A site to sell domains, built solo end to end: a catalog with per-domain states (pending → sold), Mercado Pago in test mode and Supabase/Postgres. Functional, but never deployed because the client's documents never arrived.",
        contribution:
          "Built it solo end to end: frontend, backend and database. Integrated Mercado Pago and modeled the data in Supabase.",
        tags: ["Next.js", "Supabase", "Mercado Pago"],
        badge: "Functional prototype",
        accent: "blue",
      },
      {
        id: "landings",
        title: "BaoBlue · Anrra",
        tagline: "Custom landing pages",
        metaDescription:
          "BaoBlue and Anrra case study: freelance landing pages designed and built solo with React, Next.js, Tailwind and Framer Motion.",
        description:
          "Two freelance landings designed and built solo, tuning the tone to each business. BaoBlue (clay earrings) is live, with vibrant yet harmonious animations; Anrra (woodwork) is waiting on the client's content. The CTA goes straight to the sales WhatsApp.",
        contribution:
          "Designed and built both solo, with animations (Framer Motion) and the CTA straight to the sales WhatsApp.",
        tags: ["React", "Next.js", "Tailwind", "Framer Motion"],
        badge: "Live",
        accent: "cyan",
      },
      {
        id: "portfolio",
        title: "This portfolio",
        tagline: "Next.js 16 + a gamer layer",
        metaDescription:
          "Case study of this portfolio: Next.js 16 and React 19, URL-based es/en i18n, Framer Motion animations and a gamer layer. No templates.",
        description:
          "The site you're looking at. I designed and built it solo with Next.js 16 and React 19: URL-based es/en i18n, Framer Motion animations and a “gamer” layer (RPG/MOBA/TCG) with a pixel-art scene, character stats and champion-style cards. No templates.",
        contribution:
          "Full design and development, no templates, with Next.js 16 and React 19.",
        tags: ["Next.js 16", "React 19", "Framer Motion", "Tailwind"],
        badge: "Handcrafted",
        accent: "emerald",
      },
    ],
  },
  experience: {
    kicker: "The path",
    heading: "Professional experience",
    items: [
      {
        role: "Frontend Developer / Software Developer",
        company: "Vínculo Verde / Greensoft",
        period: "Jun 2025 — Present",
        location: "Santiago, Chile",
        current: true,
        bullets: [
          "Took part in 6+ digital initiatives in my first year: production products, internal AI tools, CRM integrations and a payment gateway.",
          "Led the frontend of environmental calculators (Carbon and EPR), shipping two to production with React, Next.js and TypeScript.",
          "Designed and built Orbix, a generative-AI assistant integrated with Bitrix24, and drove a WhatsApp chatbot with local AI (Ollama), coordinating the team.",
          "Contributed a file manager to EcoREP and built a domain-selling platform with a database and Mercado Pago integration.",
          "Integrated external services, managed Vercel deployments and worked with Git and GitHub in an agile (Scrum) flow.",
        ],
        tags: ["React", "Next.js", "TypeScript", "Node.js", "AI / OpenAI", "Ollama", "Vercel"],
      },
      {
        role: "Frontend Developer — Freelance",
        company: "BaoBlue",
        period: "2025",
        location: "Remote",
        bullets: [
          "Built a custom landing page for the brand's commercial presentation.",
          "Implemented responsive design, animations and reusable components, deployed on Vercel with a GitHub workflow.",
        ],
        tags: ["React", "Tailwind", "Framer Motion", "Vercel"],
      },
      {
        role: "Capstone Project — End-to-end development",
        company: "LEXY · Duoc UC",
        period: "2024 — 2025",
        location: "Santiago, Chile",
        bullets: [
          "Designed and built a legal chatbot with an admin back office to manage questions, answers and users.",
          "Integrated AI to improve interaction and support the service flow, end to end.",
        ],
        tags: ["Next.js", "TypeScript", "AI", "Back office"],
      },
      {
        role: "Internship — Assurance",
        company: "PwC Chile",
        period: "Oct 2024 — Nov 2024",
        location: "Santiago, Chile",
        bullets: [
          "Took part in internal-process audits at insurance and banking firms, checking traceability and compliance.",
          "Produced supporting documentation and reports focused on control, risk management and process improvement.",
        ],
        tags: ["Audit", "Internal control", "Risk management", "Documentation"],
      },
    ],
    education: {
      title: "Computer Engineering — Duoc UC",
      subtitle: "Graduated 2025",
      certs: ["Scrum Foundation (2024)", "TOEIC 805 pts", "Upper-intermediate English"],
    },
  },
  stack: {
    kicker: "My toolbox",
    heading: "Tech stack",
    tools: ["Material UI", "Ant Design", "Prisma", "PHP", "REST APIs", "SQL Server", "Claude", "GitHub", "ApiDOG", "Docker", "Power BI", "Bitrix24", "Mercado Pago"],
  },
  building: {
    kicker: "Right now",
    heading: "What I've got in the works",
    items: [
      { title: "Automation for Greensoft", description: "Internal tools to streamline the team's processes, with Bitrix24, APIs and scripts.", status: "Active", tags: ["Bitrix24", "APIs", "Scripts"] },
      { title: "Local-AI explorations", description: "Experiments with local models (Ollama) and agents applied to real flows.", status: "Exploring", tags: ["Ollama", "Agents", "Local AI"] },
      { title: "AI-powered newsletter", description: "Content generation and publishing with local AI and workflow automation.", status: "Exploring", tags: ["Local AI", "n8n", "RSS"] },
    ],
  },
  github: {
    note: "I work mainly with TypeScript, React and Next.js. Some work projects don't have a public repository for confidentiality.",
    cta: "View GitHub",
  },
  faq: {
    kicker: "What people ask me",
    heading: "Quick answers",
    items: [
      {
        q: "What are you working on right now?",
        a: "I work as a software developer at Greensoft, building environmental products, automation and AI integrations. I also maintain personal projects where I explore new ideas and technologies.",
      },
      {
        q: "What's your main stack?",
        a: "React, Next.js, TypeScript and Node.js, with Tailwind for the UI and AI integrations (OpenAI, Ollama). I'm comfortable from the database to the frontend.",
      },
      {
        q: "Do you speak English?",
        a: "Yes, upper-intermediate level (TOEIC 805). I'm comfortable working in English-speaking teams.",
      },
      {
        q: "What kind of projects excite you the most?",
        a: "All of them: AI products, frontend/UI and end-to-end fullstack. I like variety and to keep learning.",
      },
      {
        q: "How do you work?",
        a: "Agile methodologies (Scrum), focus on real products, continuous improvement and lots of teamwork.",
      },
    ],
  },
  contact: {
    kicker: "Let's talk",
    heading: "Let's work together?",
    status: "Always open to a good conversation",
    description:
      "I'm open to frontend opportunities, web projects and initiatives where I can contribute with React, Next.js, TypeScript and applied AI.",
    emailLabel: "Email me",
  },
  footer: {
    built: "Stack: Next.js · TypeScript · Tailwind",
    rights: "Forged in Santiago, Chile",
    projects: "Case studies",
  },
};

export const dictionaries: Record<Lang, Content> = { es, en };
