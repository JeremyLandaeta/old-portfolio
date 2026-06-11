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
  cv: "/cv.pdf",
} as const;

/**
 * Fecha de nacimiento (ISO) para el contador de edad en vivo.
 * Ajusta a tu fecha y hora exactas para máxima precisión.
 * Ej: "2000-05-14T08:30:00"
 */
export const BIRTH_DATE = "2002-12-22T00:00:00";

export type NavItem = { id: string; label: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  /** tamaño en el bento grid */
  span: "lg" | "md" | "sm";
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

export type StackCategory = {
  key: string;
  label: string;
  items: string[];
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
  learnings: string;
  result: string;
  viewDemo: string;
  viewRepo: string;
  notFound: string;
  backHome: string;
};

export type Content = {
  nav: NavItem[];
  cta: { projects: string; cv: string; contact: string; viewProject: string; caseStudy: string };
  caseStudyLabels: CaseStudyLabels;
  caseStudies: Record<string, CaseStudy>;
  hero: {
    badge: string;
    name: string;
    roles: string[];
    tagline: string;
    location: string;
  };
  about: {
    heading: string;
    kicker: string;
    paragraphs: string[];
    highlights: { value: string; label: string }[];
    facts: { key: string; label: string }[];
    role: string;
    ageLabel: string;
    ageCaption: string;
  };
  projects: {
    heading: string;
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
    categories: StackCategory[];
  };
  building: {
    heading: string;
    kicker: string;
    items: { title: string; description: string; status: string }[];
  };
  faq: {
    heading: string;
    kicker: string;
    items: { q: string; a: string }[];
  };
  contact: {
    heading: string;
    kicker: string;
    available: string;
    description: string;
    emailLabel: string;
  };
  footer: {
    built: string;
    rights: string;
  };
};

const es: Content = {
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "proyectos", label: "Proyectos" },
    { id: "experiencia", label: "Experiencia" },
    { id: "stack", label: "Stack" },
    { id: "contacto", label: "Contacto" },
  ],
  cta: {
    projects: "Ver proyectos",
    cv: "Descargar CV",
    contact: "Contáctame",
    viewProject: "Ver proyecto",
    caseStudy: "Ver caso de estudio",
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
    learnings: "Aprendizajes",
    result: "Resultado",
    viewDemo: "Ver demo",
    viewRepo: "Ver repositorio",
    notFound: "Proyecto no encontrado",
    backHome: "Volver al inicio",
  },
  caseStudies: {
    lexy: {
      problem:
        "Acceder a información legal clara es lento y costoso: las consultas básicas saturan a los equipos de atención y los usuarios no saben a quién preguntar.",
      context:
        "Proyecto de título: un chatbot orientado a responder preguntas legales, acompañado de un backoffice administrativo para gestionar el conocimiento y los usuarios.",
      role: [
        "Diseñé y desarrollé la solución de extremo a extremo (chatbot + backoffice).",
        "Modelé el flujo de preguntas y respuestas y la administración de usuarios.",
        "Integré IA para mejorar la interacción y apoyar el flujo de atención.",
      ],
      solution: [
        "Chatbot conversacional que responde consultas legales de forma guiada.",
        "Backoffice para crear y mantener preguntas, respuestas y usuarios.",
        "Capa de IA que mejora la comprensión y la calidad de las respuestas.",
      ],
      learnings: [
        "Diseño conversacional y manejo de prompts para un dominio sensible.",
        "Separar el contenido editable del modelo para iterar sin tocar código.",
      ],
      result:
        "Prototipo funcional que responde consultas legales y permite administrar el conocimiento desde el backoffice.",
      gallery: ["Chat de consulta", "Backoffice de preguntas", "Gestión de usuarios"],
    },
    greensoft: {
      problem:
        "Las empresas necesitan medir su huella de carbono y cumplir con la normativa REP, pero los cálculos son complejos, manuales y propensos a error.",
      context:
        "Producto real en Vínculo Verde / Greensoft. Calculadoras ambientales interactivas desplegadas en producción para clientes.",
      role: [
        "Lideré técnicamente el desarrollo frontend de las calculadoras.",
        "Integré la lógica de negocio con React, Next.js y TypeScript.",
        "Aporté nuevas funcionalidades a EcoREP, incluyendo un gestor de archivos.",
      ],
      solution: [
        "Calculadoras de Carbono y REP responsivas y fáciles de usar.",
        "Consumo de APIs y manejo de estados complejos del formulario.",
        "Despliegue continuo en Vercel con flujo de trabajo en GitHub.",
      ],
      learnings: [
        "Traducir requerimientos ambientales en interfaces utilizables.",
        "Cuidar rendimiento y validaciones en formularios extensos.",
      ],
      result:
        "Dos calculadoras ambientales en producción, usadas por clientes reales para sus procesos de carbono y REP.",
      gallery: ["Calculadora de Carbono", "Flujo REP", "Gestor de archivos (EcoREP)"],
    },
    orbix: {
      problem:
        "Crear borradores de noticias para LinkedIn consumía tiempo valioso del equipo y rompía el ritmo de publicación.",
      context:
        "Herramienta interna: un asistente con IA generativa integrado a Bitrix24 como CRM.",
      role: [
        "Diseñé e implementé Orbix de extremo a extremo.",
        "Definí el enfoque de generación de contenido con IA.",
        "Integré el asistente con Bitrix24.",
      ],
      solution: [
        "IA generativa que produce borradores de noticias listos para revisar.",
        "Integración con Bitrix24 para conectar el contenido con el CRM.",
        "Flujo que reduce el trabajo manual de redacción.",
      ],
      learnings: [
        "Prompt engineering aplicado a un caso de negocio concreto.",
        "Integración con un CRM y automatización de contenido.",
      ],
      result:
        "Borradores generados automáticamente, liberando tiempo del equipo y agilizando la creación de contenido.",
      gallery: ["Generación de borrador", "Integración Bitrix24"],
    },
    "chatbot-wsp": {
      problem:
        "Atender consultas por WhatsApp de forma continua sin depender de servicios externos de pago ni exponer datos sensibles.",
      context:
        "Iniciativa interna: un chatbot de WhatsApp con IA local (on-premise) mediante Ollama.",
      role: [
        "Impulsé y coordiné el desarrollo del chatbot.",
        "Investigué alternativas de implementación y definí el enfoque técnico.",
        "Delegué y distribuí tareas dentro del equipo.",
      ],
      solution: [
        "IA local con Ollama para mantener los datos dentro de la organización.",
        "Enfoque on-premise priorizando privacidad y costo.",
        "Definición técnica que guió el desarrollo del equipo.",
      ],
      learnings: [
        "Liderazgo técnico y delegación efectiva.",
        "Evaluar IA local vs. en la nube según privacidad y costo.",
      ],
      result:
        "Enfoque técnico definido y desarrollo coordinado en equipo para una solución de IA local.",
      gallery: ["Conversación WhatsApp", "Arquitectura IA local"],
    },
    pagos: {
      problem:
        "Vender dominios requería un flujo de compra confiable y un manejo correcto de los pagos.",
      context:
        "Plataforma de venta de dominios con base de datos e integración de pasarela de pago.",
      role: [
        "Desarrollé la plataforma y su base de datos.",
        "Integré la pasarela de pago con Mercado Pago.",
      ],
      solution: [
        "Catálogo de dominios con persistencia en base de datos.",
        "Pagos integrados mediante Mercado Pago.",
        "Manejo de los estados del flujo de compra.",
      ],
      learnings: [
        "Integración de pasarelas y manejo de estados de pago.",
        "Diseño de datos para un flujo transaccional.",
      ],
      result: "Plataforma funcional de venta de dominios con pagos integrados.",
      gallery: ["Catálogo de dominios", "Checkout con Mercado Pago"],
    },
    landings: {
      problem:
        "Marcas digitales necesitaban una presencia web atractiva para su presentación comercial.",
      context:
        "Landing pages a medida para BaoBlue y Anrra, con foco en diseño y conversión.",
      role: [
        "Diseñé y desarrollé el frontend de los sitios.",
        "Implementé animaciones y componentes reutilizables.",
        "Gestioné el despliegue en Vercel con flujo en GitHub.",
      ],
      solution: [
        "Sitios responsivos con diseño personalizado por marca.",
        "Animaciones y componentes reutilizables para acelerar el desarrollo.",
        "Despliegue en Vercel con integración continua.",
      ],
      learnings: [
        "Criterio visual y animaciones performantes.",
        "Reutilización de componentes entre proyectos.",
      ],
      result: "Sitios desplegados en producción para presentación comercial de las marcas.",
      gallery: ["BaoBlue — landing", "Anrra — landing"],
    },
  },
  hero: {
    badge: "Disponible para nuevas oportunidades",
    name: "Jeremy Landaeta Lizama",
    roles: ["Frontend Developer", "Fullstack Developer", "IA aplicada"],
    tagline:
      "Desarrollador Frontend / Fullstack enfocado en productos web, interfaces modernas y automatizaciones con IA.",
    location: "Santiago, Chile",
  },
  about: {
    kicker: "Sobre mí",
    heading: "Ingeniero que construye producto real",
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
      { key: "availability", label: "Disponible · modalidad flexible" },
    ],
    role: "Frontend / Fullstack Developer",
    ageLabel: "años de vida",
    ageCaption: "en tiempo real, mientras lees esto",
  },
  projects: {
    kicker: "Proyectos",
    heading: "Cosas que he construido",
    items: [
      {
        id: "lexy",
        title: "LEXY — Soluciones Legales",
        tagline: "Chatbot legal + backoffice",
        description:
          "Chatbot orientado a responder preguntas legales con un backoffice administrativo para gestionar preguntas, respuestas y usuarios. Integración de IA para mejorar la interacción y apoyar el flujo de atención. Proyecto de título.",
        tags: ["Next.js", "TypeScript", "IA", "Backoffice"],
        span: "lg",
        badge: "Proyecto de título",
        accent: "blue",
      },
      {
        id: "greensoft",
        title: "Greensoft · EcoREP · 0 Carbono",
        tagline: "Calculadoras ambientales en producción",
        description:
          "Lideré técnicamente el frontend de calculadoras ambientales interactivas (Carbono y REP), integrando lógica de negocio con React, Next.js y TypeScript. Aporté nuevas funcionalidades en EcoREP, incluyendo un gestor de archivos.",
        tags: ["React", "Next.js", "TypeScript", "APIs", "Vercel"],
        span: "lg",
        badge: "En producción",
        accent: "cyan",
      },
      {
        id: "orbix",
        title: "Orbix",
        tagline: "Asistente interno con IA generativa",
        description:
          "Diseñé e implementé Orbix, un asistente con IA generativa para crear borradores automatizados de noticias para LinkedIn, integrado con Bitrix24 como CRM.",
        tags: ["OpenAI", "Bitrix24", "Automatización"],
        span: "md",
        accent: "violet",
      },
      {
        id: "chatbot-wsp",
        title: "Chatbot WhatsApp · IA local",
        tagline: "Ollama + delegación de equipo",
        description:
          "Impulsé y coordiné un chatbot de WhatsApp con IA local mediante Ollama: investigué alternativas, definí el enfoque técnico y delegué tareas dentro del equipo.",
        tags: ["Ollama", "WhatsApp", "Node.js"],
        span: "md",
        accent: "emerald",
      },
      {
        id: "pagos",
        title: "Venta de dominios + pagos",
        tagline: "Pasarela con Mercado Pago",
        description:
          "Plataforma de venta de dominios con base de datos e integración de pasarela de pago mediante Mercado Pago.",
        tags: ["Next.js", "Mercado Pago", "SQL"],
        span: "sm",
        accent: "blue",
      },
      {
        id: "landings",
        title: "BaoBlue · Anrra",
        tagline: "Landing pages a medida",
        description:
          "Sitios web personalizados para marcas digitales: diseño responsivo, animaciones, componentes reutilizables, despliegue en Vercel y flujo con GitHub.",
        tags: ["React", "Tailwind", "Framer Motion", "Vercel"],
        span: "sm",
        accent: "cyan",
      },
    ],
  },
  experience: {
    kicker: "Trayectoria",
    heading: "Experiencia profesional",
    items: [
      {
        role: "Desarrollador de Software / Front-End Developer",
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
    kicker: "Herramientas",
    heading: "Stack técnico",
    categories: [
      { key: "frontend", label: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI", "Ant Design"] },
      { key: "backend", label: "Backend & APIs", items: ["Node.js", "Express", "NestJS", "Prisma", "PHP", "REST APIs"] },
      { key: "db", label: "Bases de datos", items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"] },
      { key: "ia", label: "IA & Automatización", items: ["OpenAI API", "Ollama", "Claude", "Chatbots", "Automatización"] },
      { key: "tools", label: "Herramientas", items: ["Git", "GitHub", "Vercel", "Docker", "Postman", "Power BI", "Bitrix24"] },
    ],
  },
  building: {
    kicker: "En construcción",
    heading: "Lo que estoy construyendo ahora",
    items: [
      { title: "Newsletter automatizado con IA", description: "Generación y publicación de contenido con IA local y automatización de flujos.", status: "Activo" },
      { title: "Este portafolio", description: "Sitio personal con Next.js, animaciones y diseño propio.", status: "Iterando" },
      { title: "Side projects con IA", description: "Experimentos con OpenAI, Ollama y agentes.", status: "Explorando" },
      { title: "Automatizaciones para Greensoft", description: "Herramientas internas para optimizar procesos del equipo.", status: "Activo" },
    ],
  },
  faq: {
    kicker: "FAQ",
    heading: "Preguntas frecuentes",
    items: [
      {
        q: "¿Estás disponible para nuevas oportunidades?",
        a: "Sí, estoy abierto a roles frontend, fullstack e IA aplicada. Soy flexible con la modalidad: remoto, híbrido o presencial.",
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
      {
        q: "¿Tu combustible para programar? ⚡",
        a: "Una buena bebida energética al lado y modo concentración activado.",
      },
      {
        q: "¿Qué haces fuera de programar?",
        a: "Gaming, gym y series. También soy fan de la lucha libre y de jugar TCG como Mitos y Leyendas. 🃏",
      },
    ],
  },
  contact: {
    kicker: "Contacto",
    heading: "Construyamos algo juntos",
    available: "Disponible para oportunidades frontend / fullstack / IA aplicada",
    description:
      "¿Tienes un proyecto o una oportunidad? Escríbeme y conversemos. Respondo rápido.",
    emailLabel: "Escríbeme",
  },
  footer: {
    built: "Construido con Next.js, TypeScript y Tailwind",
    rights: "Hecho en Santiago, Chile",
  },
};

const en: Content = {
  nav: [
    { id: "inicio", label: "Home" },
    { id: "proyectos", label: "Projects" },
    { id: "experiencia", label: "Experience" },
    { id: "stack", label: "Stack" },
    { id: "contacto", label: "Contact" },
  ],
  cta: {
    projects: "View projects",
    cv: "Download CV",
    contact: "Get in touch",
    viewProject: "View project",
    caseStudy: "View case study",
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
    learnings: "Learnings",
    result: "Result",
    viewDemo: "View demo",
    viewRepo: "View repository",
    notFound: "Project not found",
    backHome: "Back to home",
  },
  caseStudies: {
    lexy: {
      problem:
        "Getting clear legal information is slow and expensive: basic questions overload support teams and users don't know who to ask.",
      context:
        "Capstone project: a chatbot built to answer legal questions, paired with an admin back office to manage the knowledge base and users.",
      role: [
        "Designed and built the solution end to end (chatbot + back office).",
        "Modeled the question/answer flow and user management.",
        "Integrated AI to improve interaction and support the service flow.",
      ],
      solution: [
        "Conversational chatbot that answers legal questions in a guided way.",
        "Back office to create and maintain questions, answers and users.",
        "AI layer that improves understanding and answer quality.",
      ],
      learnings: [
        "Conversational design and prompt handling for a sensitive domain.",
        "Separating editable content from the model to iterate without touching code.",
      ],
      result:
        "A working prototype that answers legal questions and lets admins manage the knowledge base.",
      gallery: ["Query chat", "Questions back office", "User management"],
    },
    greensoft: {
      problem:
        "Companies need to measure their carbon footprint and comply with EPR regulation, but the calculations are complex, manual and error-prone.",
      context:
        "A real product at Vínculo Verde / Greensoft. Interactive environmental calculators deployed to production for clients.",
      role: [
        "Led the frontend development of the calculators.",
        "Wired business logic with React, Next.js and TypeScript.",
        "Added new features to EcoREP, including a file manager.",
      ],
      solution: [
        "Responsive, easy-to-use Carbon and EPR calculators.",
        "API consumption and complex form-state handling.",
        "Continuous deployment on Vercel with a GitHub workflow.",
      ],
      learnings: [
        "Translating environmental requirements into usable interfaces.",
        "Caring about performance and validation in large forms.",
      ],
      result:
        "Two environmental calculators in production, used by real clients for their carbon and EPR processes.",
      gallery: ["Carbon calculator", "EPR flow", "File manager (EcoREP)"],
    },
    orbix: {
      problem:
        "Drafting LinkedIn news posts consumed valuable team time and broke the publishing rhythm.",
      context:
        "An internal tool: a generative-AI assistant integrated with Bitrix24 as the CRM.",
      role: [
        "Designed and built Orbix end to end.",
        "Defined the AI content-generation approach.",
        "Integrated the assistant with Bitrix24.",
      ],
      solution: [
        "Generative AI that produces ready-to-review news drafts.",
        "Bitrix24 integration to connect content with the CRM.",
        "A flow that cuts manual writing work.",
      ],
      learnings: [
        "Prompt engineering applied to a concrete business case.",
        "CRM integration and content automation.",
      ],
      result:
        "Drafts generated automatically, freeing up team time and speeding up content creation.",
      gallery: ["Draft generation", "Bitrix24 integration"],
    },
    "chatbot-wsp": {
      problem:
        "Serve WhatsApp inquiries continuously without relying on paid external services or exposing sensitive data.",
      context:
        "An internal initiative: a WhatsApp chatbot powered by local (on-premise) AI via Ollama.",
      role: [
        "Drove and coordinated the chatbot development.",
        "Researched implementation alternatives and defined the technical approach.",
        "Delegated and distributed tasks across the team.",
      ],
      solution: [
        "Local AI with Ollama to keep data inside the organization.",
        "On-premise approach prioritizing privacy and cost.",
        "Technical definition that guided the team's work.",
      ],
      learnings: [
        "Technical leadership and effective delegation.",
        "Evaluating local vs. cloud AI based on privacy and cost.",
      ],
      result:
        "A defined technical approach and coordinated team development for a local-AI solution.",
      gallery: ["WhatsApp conversation", "Local-AI architecture"],
    },
    pagos: {
      problem:
        "Selling domains required a reliable purchase flow and correct payment handling.",
      context:
        "A domain-selling platform with a database and payment-gateway integration.",
      role: [
        "Built the platform and its database.",
        "Integrated the payment gateway with Mercado Pago.",
      ],
      solution: [
        "Domain catalog with database persistence.",
        "Payments integrated through Mercado Pago.",
        "Handling of the purchase-flow states.",
      ],
      learnings: [
        "Gateway integration and payment-state handling.",
        "Data design for a transactional flow.",
      ],
      result: "A working domain-selling platform with integrated payments.",
      gallery: ["Domain catalog", "Mercado Pago checkout"],
    },
    landings: {
      problem:
        "Digital brands needed an attractive web presence for their commercial pitch.",
      context:
        "Custom landing pages for BaoBlue and Anrra, focused on design and conversion.",
      role: [
        "Designed and built the frontend of the sites.",
        "Implemented animations and reusable components.",
        "Managed deployment on Vercel with a GitHub workflow.",
      ],
      solution: [
        "Responsive sites with per-brand custom design.",
        "Animations and reusable components to speed up development.",
        "Vercel deployment with continuous integration.",
      ],
      learnings: [
        "Visual craft and performant animations.",
        "Component reuse across projects.",
      ],
      result: "Sites deployed to production for the brands' commercial presentation.",
      gallery: ["BaoBlue — landing", "Anrra — landing"],
    },
  },
  hero: {
    badge: "Available for new opportunities",
    name: "Jeremy Landaeta Lizama",
    roles: ["Frontend Developer", "Fullstack Developer", "Applied AI"],
    tagline:
      "Frontend / Fullstack developer focused on web products, modern interfaces and AI-powered automation.",
    location: "Santiago, Chile",
  },
  about: {
    kicker: "About me",
    heading: "An engineer who ships real products",
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
      { key: "availability", label: "Available · flexible setup" },
    ],
    role: "Frontend / Fullstack Developer",
    ageLabel: "years alive",
    ageCaption: "in real time, while you read this",
  },
  projects: {
    kicker: "Projects",
    heading: "Things I've built",
    items: [
      {
        id: "lexy",
        title: "LEXY — Legal Solutions",
        tagline: "Legal chatbot + back office",
        description:
          "A chatbot built to answer legal questions, with an admin back office to manage questions, answers and users. AI integration to improve interaction and support the service flow. Capstone project.",
        tags: ["Next.js", "TypeScript", "AI", "Back office"],
        span: "lg",
        badge: "Capstone project",
        accent: "blue",
      },
      {
        id: "greensoft",
        title: "Greensoft · EcoREP · 0 Carbono",
        tagline: "Environmental calculators in production",
        description:
          "I led the frontend of interactive environmental calculators (Carbon and EPR), wiring business logic with React, Next.js and TypeScript. I added new features to EcoREP, including a file manager.",
        tags: ["React", "Next.js", "TypeScript", "APIs", "Vercel"],
        span: "lg",
        badge: "In production",
        accent: "cyan",
      },
      {
        id: "orbix",
        title: "Orbix",
        tagline: "Internal generative-AI assistant",
        description:
          "I designed and built Orbix, a generative-AI assistant that creates automated LinkedIn news drafts, integrated with Bitrix24 as the CRM.",
        tags: ["OpenAI", "Bitrix24", "Automation"],
        span: "md",
        accent: "violet",
      },
      {
        id: "chatbot-wsp",
        title: "WhatsApp chatbot · local AI",
        tagline: "Ollama + team delegation",
        description:
          "I drove and coordinated a WhatsApp chatbot powered by local AI via Ollama: researched alternatives, defined the technical approach and delegated tasks across the team.",
        tags: ["Ollama", "WhatsApp", "Node.js"],
        span: "md",
        accent: "emerald",
      },
      {
        id: "pagos",
        title: "Domain sales + payments",
        tagline: "Mercado Pago gateway",
        description:
          "A domain-selling platform with a database and payment gateway integration through Mercado Pago.",
        tags: ["Next.js", "Mercado Pago", "SQL"],
        span: "sm",
        accent: "blue",
      },
      {
        id: "landings",
        title: "BaoBlue · Anrra",
        tagline: "Custom landing pages",
        description:
          "Custom websites for digital brands: responsive design, animations, reusable components, deployment on Vercel and a GitHub workflow.",
        tags: ["React", "Tailwind", "Framer Motion", "Vercel"],
        span: "sm",
        accent: "cyan",
      },
    ],
  },
  experience: {
    kicker: "Journey",
    heading: "Professional experience",
    items: [
      {
        role: "Software Developer / Front-End Developer",
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
    kicker: "Tooling",
    heading: "Tech stack",
    categories: [
      { key: "frontend", label: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI", "Ant Design"] },
      { key: "backend", label: "Backend & APIs", items: ["Node.js", "Express", "NestJS", "Prisma", "PHP", "REST APIs"] },
      { key: "db", label: "Databases", items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"] },
      { key: "ia", label: "AI & Automation", items: ["OpenAI API", "Ollama", "Claude", "Chatbots", "Automation"] },
      { key: "tools", label: "Tools", items: ["Git", "GitHub", "Vercel", "Docker", "Postman", "Power BI", "Bitrix24"] },
    ],
  },
  building: {
    kicker: "Currently building",
    heading: "What I'm building right now",
    items: [
      { title: "AI-powered newsletter", description: "Content generation and publishing with local AI and workflow automation.", status: "Active" },
      { title: "This portfolio", description: "Personal site built with Next.js, animations and a custom design.", status: "Iterating" },
      { title: "AI side projects", description: "Experiments with OpenAI, Ollama and agents.", status: "Exploring" },
      { title: "Automation for Greensoft", description: "Internal tools to streamline the team's processes.", status: "Active" },
    ],
  },
  faq: {
    kicker: "FAQ",
    heading: "Frequently asked questions",
    items: [
      {
        q: "Are you available for new opportunities?",
        a: "Yes — I'm open to frontend, fullstack and applied-AI roles. I'm flexible on the setup: remote, hybrid or on-site.",
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
      {
        q: "Your fuel for coding? ⚡",
        a: "A good energy drink by my side and focus mode on.",
      },
      {
        q: "What do you do outside coding?",
        a: "Gaming, the gym and series. I'm also into lucha libre (pro wrestling) and playing TCGs like Mitos y Leyendas. 🃏",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    heading: "Let's build something together",
    available: "Available for frontend / fullstack / applied-AI opportunities",
    description:
      "Got a project or an opportunity? Drop me a line and let's talk. I reply fast.",
    emailLabel: "Email me",
  },
  footer: {
    built: "Built with Next.js, TypeScript and Tailwind",
    rights: "Made in Santiago, Chile",
  },
};

export const dictionaries: Record<Lang, Content> = { es, en };
