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
  /** aporte concreto resumido para la tarjeta del proyecto */
  contribution: string;
  /**
   * Proyecto propio (lo construí yo, aunque sea para un cliente o para la
   * empresa): la tarjeta dice "Qué soluciona" en vez de "Mi aporte", que se
   * reserva para productos compartidos donde hice una parte.
   */
  own?: boolean;
  tags: string[];
  href?: string;
  accent: "blue" | "cyan" | "violet" | "emerald";
  category: "professional" | "freelance" | "personal" | "academic";
  status: "production" | "internal" | "paused" | "completed" | "development" | "prototype" | "mockup";
  /** Principal: va arriba en la sección; el resto pasa al carrusel. */
  featured?: boolean;
  /** Orden editorial: una prioridad menor aparece antes. */
  priority: number;
};

export type CaseStudy = {
  problem: string;
  context: string;
  objective?: string;
  role: string[];
  architecture?: string[];
  solution: string[];
  challenges?: string[];
  learnings: string[];
  result: string;
  /** pies de foto de las capturas, en el orden de `shots` de projectMedia */
  gallery: string[];
  links?: { demo?: string; repo?: string };
};

export type ExperienceItem = {
  role: string;
  company: string;
  /** sitio de la empresa: el nombre se muestra como enlace */
  url?: string;
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
  objective: string;
  role: string;
  architecture: string;
  solution: string;
  challenges: string;
  tech: string;
  gallery: string;
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
    paragraphs: string[];
    highlights: { value: string; label: string }[];
    facts: { key: string; label: string }[];
  };
  projects: {
    heading: string;
    kicker: string;
    /** texto de la ventana de arte cuando el proyecto no tiene capturas */
    noShots: string;
    /** etiqueta del aporte propio en cada tarjeta (productos compartidos) */
    contribution: string;
    /** etiqueta de los proyectos propios: el problema que resuelve y qué construí */
    solvesLabel: string;
    /** rótulo del grupo de proyectos principales */
    featuredLabel: string;
    /** rótulo del carrusel con el resto */
    moreLabel: string;
    /** nombres accesibles de las flechas del carrusel */
    prev: string;
    next: string;
    statusLabels: Record<Project["status"], string>;
    categoryLabels: Record<Project["category"], string>;
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
  allies: {
    heading: string;
    kicker: string;
    intro: string;
    buildLabel: string;
    questsLabel: string;
    visit: string;
  };
  github: {
    note: string;
    /** botón de la nota de GitHub en Contacto */
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
    objective: "Objetivo",
    role: "Mi rol",
    architecture: "Arquitectura y decisiones",
    solution: "Solución",
    challenges: "Desafíos y trade-offs",
    tech: "Tecnologías",
    gallery: "Vistas",
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
    fcc: {
      problem:
        "Un saldo bancario no responde cuánto dinero se puede gastar: ignora compromisos, deuda, ahorro reservado y movimientos planificados. El producto nace para convertir esas reglas en una lectura financiera honesta.",
      context:
        "Proyecto personal: nació para resolver un problema mío y lo diseñé y construí desde cero. Sigue en desarrollo. El repositorio incluye una aplicación funcional con datos de demostración, documentación de arquitectura y pruebas de invariantes financieros sobre PostgreSQL real.",
      objective:
        "Construir un centro de control que permita entender el disponible real, registrar operaciones sin romper el historial y evolucionar el dominio de forma incremental.",
      role: [
        "Definí el producto, el lenguaje del dominio, la experiencia visual y la arquitectura full stack.",
        "Modelé el dominio en Prisma (23 modelos y 17 enums), con restricciones documentadas entre base de datos y capa de negocio.",
        "Implementé autenticación, persistencia, casos de uso, interfaz responsive, datos demo y pruebas automatizadas.",
      ],
      architecture: [
        "Next.js 16 con Server Components y Server Actions; PostgreSQL es la fuente de verdad y Prisma la capa de persistencia.",
        "Better Auth usa el mismo User del dominio y renombra su Account para no colisionar con la cuenta financiera.",
        "Las escrituras que afectan varias entidades usan transacciones; Zod valida las reglas que PostgreSQL no puede expresar.",
        "23 ADRs registran decisiones sobre dominio, seguridad, autenticación, estado, tema y pruebas.",
      ],
      solution: [
        "Implementado: cuentas, movimientos, crédito y cuotas, planificación, presupuestos, ahorro, préstamos, conciliación, reglas, resumen y análisis.",
        "Implementado: registro rápido, temas claro/oscuro/sistema, dataset demo determinístico y aislamiento de datos por usuario.",
        "En desarrollo: despliegue público y refinamiento de los flujos completos con datos reales.",
        "Planificado: ingreso de transacciones mediante lenguaje natural como una capa sobre casos de uso validados, no como escritura directa en la base.",
      ],
      challenges: [
        "Distinguir saldo, disponible, deuda, gasto, ahorro y reembolso sin duplicar fuentes de verdad.",
        "Mantener historial auditable: los movimientos se anulan en vez de borrarse y los valores sensibles se derivan al leer.",
        "Priorizar exactitud del dominio sobre abstracciones prematuras; no se añadió un repositorio genérico ni estado global en V1.",
      ],
      learnings: [
        "El modelamiento del dominio y las invariantes cambian más el producto que una pantalla aislada.",
        "Probar reglas financieras contra PostgreSQL real descubre errores que un mock no representa.",
        "Los ADRs hacen visible el proceso de ingeniería y permiten revisar decisiones cuando el producto evoluciona.",
      ],
      result:
        "Aplicación funcional en desarrollo con autenticación, dominio financiero completo, interfaz responsive y suite de pruebas. La infraestructura de producción está documentada, pero el despliegue público sigue pendiente.",
      gallery: ["Resumen financiero — tema claro", "Resumen financiero — tema oscuro", "Acceso — tema claro", "Acceso — tema oscuro"],
    },
    lexy: {
      problem:
        "Los abogados de una firma pierden tiempo respondiendo las mismas consultas básicas una y otra vez, mientras los usuarios no saben a quién preguntar ni cómo empezar.",
      context:
        "Proyecto de título en equipo (Duoc UC, 2024). Una plataforma legal que combina un chatbot con IA para resolver dudas generales y derivar los casos complejos a un abogado, con un backoffice donde el equipo recibe la consulta y le hace seguimiento.",
      objective:
        "Crear una puerta de entrada clara para consultas legales generales y conectar los casos que requieren atención con el equipo de abogados.",
      role: [
        "Construí el frontend del sitio público: hero, servicios, equipo de abogados y formulario de contacto, con Next.js, Tailwind y shadcn/ui.",
        "Trabajé en equipo dentro de un proyecto end-to-end (chatbot + backoffice), integrando mi parte con el resto de la app.",
        "Colaboré en la puesta a punto de la IA: ajustar el system prompt y el contexto para que respondiera solo dentro del dominio legal.",
      ],
      architecture: [
        "Next.js y TypeScript para la aplicación, MongoDB para persistencia, NextAuth para autenticación y OpenAI para el chatbot.",
        "El sitio público, el chatbot y el backoffice se integraron dentro de una base de código compartida por el equipo.",
      ],
      solution: [
        "Sitio público que presenta a la firma y sus servicios, con el chatbot Lexy como puerta de entrada.",
        "Chatbot con la API de OpenAI para resolver consultas generales; los casos específicos se derivan a un abogado.",
        "Backoffice para recibir la consulta derivada y contactar directamente a la persona.",
        "Autenticación con NextAuth y datos persistidos en MongoDB.",
      ],
      challenges: [
        "Acotar el contexto del chatbot en un dominio sensible y derivar lo que no debía resolver automáticamente.",
        "Integrar aportes de varios integrantes sin confundir responsabilidades personales con el alcance total del producto.",
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
        "Producto interno de Ambientalia desarrollado en GreenSoft (mi trabajo actual). Dos plataformas: EcoREP, para la trazabilidad de residuos y el cumplimiento de la Ley REP, y 0 Carbono, para medir la huella de carbono de eventos.",
      objective:
        "Traducir procesos ambientales y normativos en módulos claros para registrar, revisar y procesar información operativa.",
      role: [
        "En 0 Carbono implementé todo el frontend. Tomé como referencia el frontend de HuellaChile para la estructura y la experiencia.",
        "En EcoREP participé en implementaciones de frontend sobre módulos específicos de una plataforma compartida.",
        "Implementé tablas con filtros para revisar y encontrar la información operativa.",
        "Implementé un gestor de archivos por período: cada Excel cargado queda asignado a su período, así se revisa la trazabilidad de los residuos de cada mes.",
      ],
      architecture: [
        "Frontend modular con React, Next.js y TypeScript, componentes Material UI y estado de servidor con Redux Toolkit/RTK Query.",
        "Los módulos consumen APIs REST y separan formularios, filtros, visualización y gestión de archivos.",
      ],
      solution: [
        "Formularios de varias capas rediseñados para que el usuario los entienda al primer vistazo.",
        "Manejo de estados según lo que carga el usuario: residuos pendientes, listos u homologados.",
        "Gestor de archivos que organiza los Excels por período y mantiene la trazabilidad.",
        "Módulos frontend en React, Next.js y TypeScript integrados a APIs y al flujo de despliegue del equipo.",
      ],
      challenges: [
        "Representar estados y requisitos normativos sin trasladar la complejidad del proceso directamente al usuario.",
        "Evolucionar módulos dentro de plataformas compartidas y mantener consistencia con el trabajo del equipo.",
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
        "Las consultas sobre la Ley REP llegan por WhatsApp y se repiten: qué productos son prioritarios, quién debe declarar, cómo cumplir. Responderlas una a una consume tiempo del equipo, y los casos que sí necesitan a una persona se pierden entre las demás.",
      context:
        "Proyecto profesional en GreenSoft, en producción en leyrep.cl. Es el asistente virtual de Ley REP; Orbix fue su nombre anterior. Es backend puro: no tiene interfaz propia, todo lo que ve el usuario ocurre en WhatsApp. Es independiente de Dixta.",
      objective:
        "Orientar sobre la Ley REP con respuestas apoyadas en documentos, y derivar los casos concretos al equipo comercial con los datos necesarios para continuar la conversación.",
      role: [
        "Planifiqué la solución, definí el diseño técnico y construí el backend.",
        "Implementé el webhook de WhatsApp Cloud API con validación de firma de Meta, y los flujos guiados con botones, listas y opciones numeradas.",
        "Construí las respuestas con IA para preguntas abiertas: búsqueda sobre los documentos indexados y generación con DeepSeek a través de Vercel AI Gateway.",
        "Integré el registro de leads en el CRM (Odoo) cuando una conversación se deriva a un ejecutivo.",
      ],
      architecture: [
        "Laravel 13 sobre PHP 8 y MySQL; es backend puro, sin frontend. La suite tiene cerca de 1.280 pruebas en Pest y corre contra MySQL.",
        "El webhook solo valida y encola: firma de Meta, límite por teléfono y extracción del mensaje. La respuesta se arma en un job, porque Meta reintenta si el webhook tarda.",
        "Cada mensaje pasa por una cascada de decisión: primero los flujos guiados y un árbol de intenciones; el modelo solo responde las preguntas abiertas.",
        "La búsqueda documental es léxica, sin embeddings ni base vectorial: un índice local en SQLite (FTS5) sobre 116 documentos normativos.",
        "El modelo es DeepSeek a través de Vercel AI Gateway, por una API compatible con OpenAI. Antes corría en un servidor propio con llama.cpp.",
        "Los leads se envían a Odoo y un job reintenta los envíos fallidos. Bitrix24 se dio de baja.",
      ],
      solution: [
        "Menú principal interactivo y submenú de productos prioritarios, con respuestas guiadas para las preguntas frecuentes.",
        "Respuesta con IA para preguntas abiertas, apoyada en los fragmentos de los documentos normativos que recupera la búsqueda.",
        "Formularios de captura dentro del chat y derivación a un ejecutivo, con registro del lead en Odoo.",
        "Eliminación de datos a pedido desde el propio chat: la conversación se anonimiza en vez de borrar las filas.",
        "Conjuntos de casos de referencia y comandos para evaluar recuperación, ruteo y respuestas antes de cambiar un parámetro o un modelo.",
      ],
      challenges: [
        "En un tema normativo, el riesgo no es que el modelo redacte mal sino que responda bien a quien no preguntó; por eso las respuestas se apoyan en documentos y no en lo que el modelo recuerda.",
        "Evitar mensajes duplicados cuando el modelo responde lento: el webhook encola, un candado por teléfono ordena los turnos y una tabla de mensajes entrantes da la idempotencia.",
        "Elegir búsqueda léxica en vez de vectorial y ajustar sus parámetros midiendo contra casos de referencia, no a ojo.",
        "Cambiar de proveedor de modelo sin reescribir el sistema, manteniendo una interfaz compatible con OpenAI.",
      ],
      learnings: [
        "Medir antes de cambiar: con un conjunto de casos de referencia, una mejora deja de ser una impresión.",
        "La IA aporta en la interpretación de preguntas abiertas; los flujos que capturan datos o derivan a una persona necesitan pasos explícitos.",
        "Diseñar una conversación exige el mismo cuidado por jerarquía y recuperación de errores que una interfaz visual.",
      ],
      result:
        "En producción en leyrep.cl: responde consultas sobre la Ley REP por WhatsApp y deriva los casos comerciales al CRM. Se omiten documentos internos, credenciales y detalles operativos.",
      gallery: [],
      links: {
        demo: "https://leyrep.cl",
      },
    },
    dixta: {
      problem:
        "El seguimiento manual de fuentes ambientales y regulatorias dispersa el trabajo editorial entre búsqueda, selección, redacción y distribución.",
      context:
        "Plataforma profesional desarrollada en GreenSoft junto a otro desarrollador, independiente del asistente de WhatsApp. Un núcleo en Laravel orquesta el pipeline y un microservicio en Python se encarga de la extracción con Scrapling.",
      objective:
        "Convertir fuentes configuradas en borradores revisables, conservando control editorial humano y trazabilidad del pipeline.",
      role: [
        "Construí la primera versión de la plataforma y buena parte de su evolución: scraping, selección de candidatos, generación de borradores y publicación.",
        "Endurecí el microservicio de extracción en Python: validación de artículos, deduplicación por URL y render con navegador cuando el sitio lo exige.",
        "Implementé las validaciones del borrador y el flujo de revisión: nada se publica sin que una persona lo apruebe.",
        "Migré el modelo generador de borradores a DeepSeek.",
      ],
      architecture: [
        "Laravel controla base de datos, colas, selección de candidatos, borradores y publicación; el scraper en FastAPI + Scrapling no guarda estado.",
        "La URL normalizada y su hash son el contrato de deduplicación entre ambos servicios.",
        "El modelo generador pasó por varias etapas: partió con modelos locales y hoy es DeepSeek. La integración con Bitrix24 y el servidor llama.cpp se eliminaron.",
        "El modelo debe devolver un JSON con campos fijos; si el resultado no pasa las validaciones, el borrador cae a una plantilla determinística.",
        "Publicar es una acción aparte de aprobar: un borrador pasa por revisión humana antes de salir.",
      ],
      solution: [
        "Extracción diaria desde fuentes configuradas, con filtros de pertinencia y antigüedad.",
        "Persistencia y deduplicación de artículos antes de gastar inferencia.",
        "Generación de borradores con DeepSeek, validados y normalizados antes de mostrarse.",
        "Panel para editar, regenerar, aprobar o rechazar cada borrador, y publicación en LinkedIn solo después de la aprobación.",
      ],
      challenges: [
        "Mantener confiable la extracción frente a fuentes heterogéneas sin acoplarla a la base de datos.",
        "Evitar duplicados y contenido no pertinente antes de gastar inferencia o tiempo editorial.",
        "Separar automatización de publicación: el modelo propone y una persona conserva la decisión final.",
      ],
      learnings: [
        "Los límites claros entre orquestador y scraper facilitan probar, reemplazar y desplegar cada parte.",
        "La calidad del borrador depende tanto de selección y contexto como del modelo utilizado.",
      ],
      result:
        "Estuvo en producción y hoy está en pausa. Se omiten fuentes, credenciales y detalles internos sensibles.",
      gallery: [],
    },
    pagos: {
      problem:
        "Un cliente quería vender varios dominios online y necesitaba una web con catálogo y pago integrado, en vez de gestionar cada venta a mano.",
      context:
        "Encargo individual: tu-dominio.cl, una web para vender dominios. La construí solo de punta a punta.",
      objective:
        "Resolver el flujo comercial completo desde la selección de un dominio hasta el resultado del pago y su cambio de estado.",
      role: [
        "Desarrollé todo: frontend, backend y base de datos.",
        "Integré Mercado Pago con Checkout Pro y un webhook que confirma el pago.",
        "Modelé los datos con Prisma sobre PostgreSQL alojado en Supabase.",
      ],
      architecture: [
        "Next.js concentra frontend y backend; Prisma accede a PostgreSQL en Supabase; Mercado Pago procesa el checkout.",
        "El webhook no confía en la notificación: vuelve a consultar el pago en Mercado Pago antes de registrar la orden.",
        "Un pago aprobado crea la orden y marca el dominio como vendido; la orden queda pendiente de datos hasta que el comprador completa la información para la transferencia.",
      ],
      solution: [
        "Catálogo de dominios con búsqueda, filtros por categoría y disponibilidad.",
        "Checkout con Mercado Pago y páginas de resultado para pago aprobado, pendiente o fallido.",
        "Al aprobarse el pago, el dominio pasa de disponible a vendido y se crea la orden.",
        "Formulario posterior al pago para los datos del titular, necesarios para transferir el dominio vía NIC Chile.",
      ],
      challenges: [
        "Mantener coherentes el pago externo y el estado local ante resultados aprobados, fallidos o incompletos.",
        "Evitar órdenes duplicadas cuando Mercado Pago repite una notificación: el identificador del pago es único en la base.",
        "Cerrar el producto técnico aunque su salida dependiera de información de terceros.",
      ],
      learnings: [
        "Integrar una pasarela de pago y reaccionar a su resultado para mover el estado de la orden.",
        "Dejar un producto funcional terminado, aunque el cierre dependa de terceros.",
      ],
      result:
        "Desarrollo finalizado, con pagos probados en modo de prueba. El cierre quedó pendiente por información que debía proporcionar el encargado.",
      gallery: ["Catálogo de dominios", "Estados de la orden", "Checkout con Mercado Pago"],
    },
    baoblue: {
      problem:
        "Una marca de aros de arcilla necesitaba una presencia web reconocible para mostrar su catálogo y llevar consultas a WhatsApp sin la complejidad de un e-commerce.",
      context:
        "Proyecto freelance para un cliente real. Diseñé y desarrollé la landing adaptando la identidad visual a una marca artesanal y expresiva.",
      objective:
        "Presentar el catálogo y el proceso de compra con una experiencia visual propia, rápida y clara en móvil.",
      role: [
        "Diseñé y desarrollé la landing de punta a punta.",
        "Construí una dirección visual vibrante, animaciones y componentes reutilizables.",
        "Conecté el CTA directo al WhatsApp del encargado de ventas, sin formulario intermedio.",
      ],
      architecture: [
        "Landing por componentes en React/Next.js, estilos con Tailwind y animaciones con Framer Motion.",
        "El CTA deriva directamente a WhatsApp; no se añadió un backend que el negocio no necesitaba.",
      ],
      solution: [
        "Sitio responsivo en React/Next.js con Tailwind, Framer Motion y componentes reutilizables.",
        "BaoBlue: catálogo de aros con hover, proceso de compra en 3 pasos, testimonios y FAQ.",
        "Paleta vibrante pero armoniosa, con las animaciones que más me gustan del proyecto.",
        "Despliegue en Vercel con flujo en GitHub.",
      ],
      challenges: [
        "Mantener personalidad y movimiento sin perjudicar legibilidad, responsive ni velocidad de exploración.",
      ],
      learnings: [
        "Traducir la personalidad del negocio en decisiones visuales concretas.",
        "Mantener animaciones llamativas sin romper la armonía visual.",
      ],
      result:
        "BaoBlue está en producción, desplegado en Vercel, y su repositorio es público.",
      gallery: ["BaoBlue — Aros únicos para personas únicas", "Catálogo de aros (hover)", "Cómo comprar en 3 pasos", "Testimonios de clientas"],
      links: {
        demo: "https://baoblue-web.vercel.app/",
        repo: "https://github.com/JeremyLandaeta/baoblue-web",
      },
    },
    anrra: {
      problem:
        "Un taller de productos en madera necesitaba una vitrina digital cálida y simple para presentar su trabajo y recibir consultas.",
      context:
        "Proyecto freelance independiente de BaoBlue. Quedó como mockup: la estructura y el diseño están hechos, pero nunca llegaron las imágenes reales de los productos.",
      objective: "Construir una landing responsive que respetara el carácter artesanal de la marca y fuera fácil de completar con contenido real.",
      role: [
        "Diseñé y desarrollé la interfaz frontend.",
        "Adapté paleta, composición y animaciones a un taller de madera.",
      ],
      solution: [
        "Landing responsive con Next.js, Tailwind CSS y Framer Motion.",
        "Secciones para las líneas de producto, una galería de trabajos y el contacto.",
        "Estructura lista para reemplazar las imágenes de relleno por fotografías reales.",
      ],
      challenges: ["Avanzar la experiencia y el layout sin presentar material temporal como contenido final de la marca."],
      learnings: ["Separar estructura, dirección visual y contenido permite avanzar sin bloquear todo el desarrollo por activos pendientes."],
      result: "Mockup terminado a nivel de interfaz. No se publicó: faltaron las imágenes reales de los productos.",
      gallery: [],
    },
    portfolio: {
      problem:
        "Un portafolio genérico no dice nada de cómo trabajo. Quería uno que demostrara criterio de diseño, frontend moderno y personalidad, no una plantilla más.",
      context:
        "Este mismo sitio. Lo diseñé y desarrollé solo, de cero, como carta de presentación técnica.",
      objective:
        "Explicar rápidamente qué construyo y cómo trabajo, usando una identidad propia sin sacrificar claridad para reclutadores.",
      role: [
        "Diseño y desarrollo completos, sin plantillas ni librerías de UI.",
        "Arquitectura en Next.js 16 (App Router) y React 19, con i18n es/en basada en URL para SEO.",
        "Capa de interacción a medida: animaciones con Framer Motion, partículas, cursor glow y tilt 3D en las cards.",
      ],
      architecture: [
        "Next.js App Router con rutas estáticas ES/EN, contenido tipado y metadata generada desde una fuente común.",
        "Server Components por defecto y componentes cliente acotados a navegación, carrusel y animaciones.",
      ],
      solution: [
        "Una capa “gamer” opcional (RPG/MOBA/TCG): stats de personaje, card estilo campeón con kit de habilidades y una “Current Quest”.",
        "Escena pixel-art propia (samurái + fogata) animada.",
        "Contador de edad en tiempo real y secciones de experiencia, stack y FAQ.",
        "Diseño responsivo, cuidando el rendimiento y las animaciones.",
      ],
      challenges: [
        "Equilibrar la narrativa RPG con jerarquía profesional, accesibilidad y rendimiento.",
        "Evolucionar contenido, casos, sitemap, JSON-LD y traducciones sin que diverjan.",
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
    badge: "Interfaces · sistemas · IA aplicada",
    name: "Jeremy Landaeta Lizama",
    title: "Software Developer",
    stack: ["React", "Next.js", "TypeScript"],
    tagline:
      "Construyo productos digitales de principio a fin: interfaces modernas, reglas de negocio, integraciones e IA cuando resuelve un problema real.",
    location: "Santiago, Chile",
  },
  about: {
    kicker: "El personaje detrás del teclado",
    heading: "Ficha de personaje",
    paragraphs: [
      "Soy Ingeniero en Informática y desarrollador de software en GreenSoft. Construyo interfaces para productos ambientales, automatizaciones e integraciones con IA; antes trabajé en auditoría de procesos en PwC y desarrollé LEXY como proyecto de título en equipo.",
      "Mi base está en React, Next.js y TypeScript. Desde ahí avanzo hacia backend, datos, reglas de negocio y despliegue cuando el producto necesita una solución completa.",
    ],
    highlights: [
      { value: "6+", label: "iniciativas digitales en el primer año" },
      { value: "2", label: "calculadoras ambientales en producción" },
    ],
    facts: [
      { key: "class", label: "Software Developer · Frontend / Full Stack / AI" },
      { key: "current", label: "GreenSoft · desde 2025" },
      { key: "location", label: "Santiago, Chile" },
      { key: "education", label: "Duoc UC · Titulado 2025" },
      { key: "languages", label: "Español · Inglés (TOEIC 805)" },
    ],
  },
  projects: {
    kicker: "Lo que he construido",
    heading: "Proyectos",
    featuredLabel: "Principales",
    moreLabel: "Más proyectos",
    prev: "Proyectos anteriores",
    next: "Proyectos siguientes",
    noShots: "Sin capturas públicas",
    contribution: "Mi aporte",
    solvesLabel: "Qué soluciona",
    statusLabels: {
      production: "Producción",
      internal: "Uso interno",
      paused: "En pausa",
      completed: "Completado",
      development: "En desarrollo",
      prototype: "Prototipo / exploración",
      mockup: "Mockup",
    },
    categoryLabels: {
      professional: "Proyecto profesional",
      freelance: "Proyecto freelance",
      personal: "Proyecto personal",
      academic: "Proyecto académico",
    },
    items: [
      {
        id: "fcc", title: "Financial Control Center", tagline: "Dominio financiero, arquitectura y producto",
        metaDescription: "Caso de estudio de Financial Control Center: producto full stack en desarrollo con Next.js, PostgreSQL, Prisma, Better Auth y pruebas de invariantes.",
        description: "Centro de control financiero personal que modela disponible real, deuda, compromisos, ahorro y proyecciones sin confundir saldo con dinero libre.",
        own: true,
        contribution: "Es un proyecto mío y resuelve un problema mío: saber cuánto puedo gastar de verdad cada mes sin descuidar cuotas, ahorro y compromisos. Lo definí y lo construí completo; el esquema tiene 23 modelos y 17 enums.",
        tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Vitest"], accent: "emerald",
        category: "personal", status: "development", featured: true, priority: 1,
      },
      {
        id: "greensoft", title: "GreenSoft · EcoREP · 0 Carbono", tagline: "Interfaces para operaciones ambientales",
        metaDescription: "Caso de estudio de EcoREP y 0 Carbono: módulos frontend para plataformas ambientales con React, Next.js, TypeScript, MUI y RTK Query.",
        description: "Plataformas para trazabilidad de residuos, cumplimiento REP y huella de carbono. El trabajo mostrado se limita a los módulos e interfaces en los que participé.",
        contribution: "En 0 Carbono implementé todo el frontend, tomando como referencia el de HuellaChile. En EcoREP participé en implementaciones de frontend: un gestor de archivos y tablas con filtros.",
        tags: ["React", "Next.js", "TypeScript", "MUI", "RTK Query", "REST APIs"], accent: "cyan",
        category: "professional", status: "production", priority: 2,
      },
      {
        id: "orbix", title: "Asistente de Ley REP (ex Orbix)", tagline: "Atención por WhatsApp con IA",
        metaDescription: "Caso de estudio del asistente de WhatsApp de leyrep.cl, antes Orbix: Laravel 13, MySQL, DeepSeek vía Vercel AI Gateway, búsqueda léxica y CRM Odoo.",
        description: "Asistente de WhatsApp de leyrep.cl: responde consultas sobre la Ley REP apoyándose en documentos normativos y deriva los casos concretos al equipo comercial. Orbix era su nombre anterior.",
        own: true,
        contribution: "Las mismas consultas sobre la Ley REP llegaban una y otra vez por WhatsApp. Planifiqué y construí el asistente que las responde apoyándose en documentos normativos y deriva los casos comerciales al equipo.",
        tags: ["Laravel", "MySQL", "WhatsApp Cloud API", "DeepSeek", "Vercel AI Gateway", "Odoo"], accent: "violet",
        category: "professional", status: "production", priority: 4,
      },
      {
        id: "dixta", title: "Dixta — AI Content Automation", tagline: "Pipeline editorial con revisión humana",
        metaDescription: "Caso de estudio de Dixta: extracción de noticias con Scrapling, orquestación en Laravel y borradores generados con DeepSeek para revisión humana.",
        description: "Plataforma que descubre, extrae, clasifica y prepara borradores ambientales y regulatorios, manteniendo aprobación editorial antes de publicar.",
        own: true,
        contribution: "Seguir a mano las noticias ambientales y regulatorias consumía horas de trabajo editorial. Levanté la plataforma desde su primera versión: extrae las noticias, elige las que sirven y genera borradores con IA que una persona aprueba antes de publicar.",
        tags: ["Laravel", "Python", "Scrapling", "FastAPI", "DeepSeek"], accent: "violet",
        category: "professional", status: "paused", priority: 3,
      },
      {
        id: "pagos", title: "tu-dominio.cl", tagline: "Flujo comercial full stack",
        metaDescription: "Caso de estudio de tu-dominio.cl: plataforma full stack de venta de dominios con Next.js, Prisma, PostgreSQL en Supabase y Mercado Pago.",
        description: "Catálogo de dominios con persistencia, pago y estados de negocio desde la selección hasta la venta.",
        own: true,
        contribution: "Un cliente quería vender dominios online sin gestionar cada venta a mano. Construí la plataforma completa: catálogo, pago con Mercado Pago y base de datos.",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Supabase", "Mercado Pago"], accent: "blue",
        category: "professional", status: "completed", priority: 5,
      },
      {
        id: "baoblue", title: "BaoBlue", tagline: "Landing de marca y catálogo artesanal",
        metaDescription: "Caso de estudio de BaoBlue: landing freelance responsive con React/Next.js, Tailwind, animaciones y despliegue en Vercel.",
        description: "Vitrina digital para una marca de aros de arcilla, con catálogo, narrativa de compra y contacto directo por WhatsApp.",
        own: true,
        contribution: "Una marca de aros de arcilla necesitaba mostrar su catálogo y recibir pedidos por WhatsApp, sin montar un e-commerce. Diseñé y desarrollé la landing completa, y hoy está en producción.",
        tags: ["React", "Next.js", "Tailwind", "Framer Motion", "Vercel"], accent: "cyan",
        category: "freelance", status: "production", featured: true, priority: 6,
      },
      {
        id: "anrra", title: "Anrra", tagline: "Mockup de landing para productos en madera",
        metaDescription: "Caso de estudio de Anrra: mockup de landing freelance con Next.js y Tailwind; quedó a la espera de las imágenes reales de los productos.",
        description: "Mockup de landing para un taller de productos en madera: líneas de producto, galería y contacto.",
        own: true,
        contribution: "Un taller de productos en madera necesitaba una vitrina en la web. Diseñé y desarrollé la landing completa; quedó como mockup porque nunca llegaron las imágenes reales de los productos.",
        tags: ["Next.js", "React", "Tailwind", "Framer Motion"], accent: "cyan",
        category: "freelance", status: "mockup", priority: 7,
      },
      {
        id: "lexy", title: "LEXY — Soluciones Legales", tagline: "Chatbot legal + backoffice",
        metaDescription: "Caso de estudio de LEXY: plataforma legal con chatbot de IA y backoffice. Proyecto de título en equipo; mi foco fue el frontend público.",
        description: "Proyecto de título en equipo que combina sitio público, chatbot con IA y backoffice para derivar consultas a abogados.",
        contribution: "Construí el frontend público, integré componentes y colaboré en la configuración contextual del chatbot.",
        tags: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "OpenAI", "Tailwind"], accent: "blue",
        category: "academic", status: "completed", featured: true, priority: 8,
      },
      {
        id: "portfolio", title: "jlandaeta.dev", tagline: "Producto editorial con identidad RPG",
        metaDescription: "Caso de estudio de jlandaeta.dev: Next.js 16, React 19, i18n por URL, accesibilidad y una identidad visual RPG/pixel-art propia.",
        description: "Este portafolio: arquitectura frontend, sistema visual pixel-art, casos de estudio bilingües, animaciones y evolución continua.",
        own: true,
        contribution: "Un portafolio de plantilla no dice nada de cómo trabajo. Lo diseñé y desarrollé completo, sin plantilla, con Next.js 16, React 19 e internacionalización indexable.",
        tags: ["Next.js 16", "React 19", "TypeScript", "Framer Motion", "i18n"], accent: "emerald",
        category: "personal", status: "development", priority: 9,
      },
    ],
  },
  experience: {
    kicker: "El camino",
    heading: "Experiencia profesional",
    items: [
      {
        role: "Frontend Developer / Software Developer",
        company: "GreenSoft",
        url: "https://greensoft.cl",
        period: "Jun 2025 — Actualidad",
        location: "Santiago, Chile",
        current: true,
        bullets: [
          "Implementé completo el frontend de 0 Carbono y participé en el de EcoREP, productos ambientales en producción, con React, Next.js, TypeScript, Material UI, Redux Toolkit y RTK Query.",
          "Implemento formularios, validaciones, filtros complejos, dashboards, gestión de archivos, exportaciones e integraciones con APIs REST.",
          "Desarrollé el backend del asistente de WhatsApp de leyrep.cl (antes Orbix), hoy en producción: flujos guiados, respuestas con DeepSeek vía Vercel AI Gateway y derivación de leads al CRM.",
          "Levanté Dixta desde su primera versión: una plataforma que extrae noticias, elige las que sirven y genera borradores con IA para revisión editorial.",
          "Construí tu-dominio.cl de punta a punta con persistencia y Mercado Pago, y gestiono despliegues y repositorios del equipo.",
          "Integré servicios externos, gestioné despliegues en Vercel y trabajé con Git y GitHub en un flujo ágil (Scrum).",
        ],
        tags: ["React", "Next.js", "TypeScript", "Node.js", "Laravel", "DeepSeek", "Vercel"],
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
          "Construí el frontend público e integré componentes dentro de una plataforma legal desarrollada en equipo.",
          "Colaboré en la configuración contextual del chatbot y en la integración de mi trabajo con el backoffice.",
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
      { title: "Financial Control Center", description: "Producto personal full stack en desarrollo: dominio financiero, autenticación, reglas de negocio, pruebas y evolución documentada.", status: "En desarrollo", tags: ["Next.js", "PostgreSQL", "Prisma", "Better Auth"] },
      { title: "Productos profesionales", description: "Evolución de plataformas ambientales, automatizaciones e integraciones para flujos reales de trabajo.", status: "Activo", tags: ["React", "APIs", "Bitrix24"] },
      { title: "IA local y herramientas con agentes", description: "Experimentos con modelos locales y con agentes para automatizar mi propio trabajo de desarrollo. Los agentes que ya están en producción, como el asistente de Ley REP, están en Proyectos.", status: "Explorando", tags: ["Ollama", "Agentes", "Automatización"] },
    ],
  },
  allies: {
    kicker: "Junto al fuego",
    heading: "Aliados",
    intro: "Quien me guía y quienes han hecho camino conmigo. Cada quien con su propio build: pasa a ver sus portafolios.",
    buildLabel: "Build",
    questsLabel: "Misiones",
    visit: "Ver portafolio",
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
        a: "Trabajo como desarrollador de software en GreenSoft, construyendo productos ambientales, automatizaciones e integraciones con IA. Además, mantengo proyectos personales donde exploro nuevas ideas y tecnologías.",
      },
      {
        q: "¿Cuál es tu stack principal?",
        a: "Mi especialidad es React, Next.js y TypeScript. Según el producto trabajo también con Node.js o Laravel, PostgreSQL/Prisma, APIs, autenticación e integraciones con modelos locales o servicios de IA.",
      },
      {
        q: "¿Hablas inglés?",
        a: "Sí, nivel intermedio-avanzado (TOEIC 805). Puedo trabajar sin problema en equipos en inglés.",
      },
      {
        q: "¿Qué tipo de proyectos te emocionan más?",
        a: "Productos donde la interfaz, las reglas de negocio y las integraciones forman una solución coherente. La IA me interesa cuando reduce trabajo manual o mejora una decisión, no como adorno.",
      },
      {
        q: "¿Cómo trabajas?",
        a: "Parto por entender el problema y modelar sus reglas. Trabajo de forma incremental, documento decisiones importantes, valido con pruebas y colaboro con producto y otras áreas para llevar la solución a producción.",
      },
    ],
  },
  contact: {
    kicker: "Hablemos",
    heading: "¿Trabajamos juntos?",
    status: "Siempre abierto a una buena conversación",
    description:
      "Estoy abierto a roles Frontend, Full Stack e IA aplicada donde pueda aportar criterio de producto, React, Next.js, TypeScript e integraciones de punta a punta.",
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
    objective: "Objective",
    role: "My role",
    architecture: "Architecture & decisions",
    solution: "Solution",
    challenges: "Challenges & trade-offs",
    tech: "Tech stack",
    gallery: "Views",
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
    fcc: {
      problem:
        "A bank balance does not tell you what you can spend: it ignores commitments, debt, reserved savings and planned transactions. The product turns those rules into an honest financial picture.",
      context:
        "A personal project: it started as a way to solve a problem of my own, and I designed and built it from scratch. It is still in development. The repository contains a working application, demo data, architecture documentation and financial-invariant tests against real PostgreSQL.",
      objective:
        "Build a control center that explains real available money, records operations without rewriting history and lets the domain evolve incrementally.",
      role: [
        "Defined the product, domain language, visual experience and full-stack architecture.",
        "Modeled the domain in Prisma (23 models and 17 enums), documenting which constraints belong in the database and which belong in business logic.",
        "Implemented authentication, persistence, use cases, responsive UI, demo data and automated tests.",
      ],
      architecture: [
        "Next.js 16 with Server Components and Server Actions; PostgreSQL is the source of truth and Prisma is the persistence layer.",
        "Better Auth shares the domain User and renames its Account model to avoid colliding with a financial account.",
        "Multi-entity writes run in transactions; Zod validates rules PostgreSQL cannot express.",
        "23 ADRs record decisions around domain, security, authentication, state, theming and testing.",
      ],
      solution: [
        "Implemented: accounts, transactions, credit and installments, planning, budgets, savings, loans, reconciliation, rules, overview and analysis.",
        "Implemented: quick entry, light/dark/system themes, deterministic demo data and per-user data isolation.",
        "In development: public deployment and refinement of complete flows with real-world data.",
        "Planned: natural-language transaction entry as a layer over validated use cases, never as direct database writes.",
      ],
      challenges: [
        "Distinguishing balance, available money, debt, spending, savings and reimbursements without duplicating sources of truth.",
        "Keeping an auditable history: transactions are voided instead of deleted and time-sensitive values are derived on read.",
        "Prioritizing domain correctness over premature abstractions; V1 adds neither a generic repository layer nor global state.",
      ],
      learnings: [
        "Domain modeling and invariants shape the product more than any isolated screen.",
        "Testing financial rules against real PostgreSQL catches failures a mock cannot represent.",
        "ADRs make the engineering process visible and let decisions be revisited as the product grows.",
      ],
      result:
        "A working application in development with authentication, a complete financial domain, responsive UI and a test suite. Production infrastructure is documented; public deployment is still pending.",
      gallery: ["Financial overview — light", "Financial overview — dark", "Sign in — light", "Sign in — dark"],
    },
    lexy: {
      problem:
        "Lawyers at a firm waste time answering the same basic questions over and over, while users don't know who to ask or how to start.",
      context:
        "Team capstone project (Duoc UC, 2024). A legal platform pairing an AI chatbot to handle general questions and route complex cases to a lawyer, with a back office where the team picks up the query and follows up.",
      objective:
        "Create a clear entry point for general legal questions and connect cases that need attention with the lawyer team.",
      role: [
        "Built the frontend of the public site: hero, services, lawyer team and contact form, with Next.js, Tailwind and shadcn/ui.",
        "Worked within a team on an end-to-end project (chatbot + back office), integrating my part with the rest of the app.",
        "Helped tune the AI: adjusting the system prompt and context so it answered only within the legal domain.",
      ],
      architecture: [
        "Next.js and TypeScript for the application, MongoDB for persistence, NextAuth for authentication and OpenAI for the chatbot.",
        "The public site, chatbot and back office were integrated into a codebase shared by the team.",
      ],
      solution: [
        "Public site that introduces the firm and its services, with the Lexy chatbot as the entry point.",
        "Chatbot powered by the OpenAI API for general questions; specific cases are routed to a lawyer.",
        "Back office to receive the routed query and contact the person directly.",
        "Authentication with NextAuth and data persisted in MongoDB.",
      ],
      challenges: [
        "Scoping chatbot context in a sensitive domain and routing what it should not resolve automatically.",
        "Integrating several contributors without confusing personal responsibility with the product's total scope.",
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
        "An internal product for Ambientalia, built at GreenSoft (my current job). Two platforms: EcoREP, for waste traceability and EPR-law compliance, and 0 Carbono, to measure the carbon footprint of events.",
      objective:
        "Turn environmental and regulatory processes into clear modules for recording, reviewing and processing operational information.",
      role: [
        "On 0 Carbono I implemented the whole frontend. I used HuellaChile's frontend as a reference for structure and experience.",
        "On EcoREP I took part in frontend work on specific modules of a shared platform.",
        "Implemented filterable tables to review and find operational information.",
        "Built a per-period file manager: each uploaded Excel is assigned to its period, so you can review each month's waste traceability.",
      ],
      architecture: [
        "A modular frontend with React, Next.js and TypeScript, Material UI components and server state through Redux Toolkit/RTK Query.",
        "Modules consume REST APIs and separate forms, filters, visualization and file management.",
      ],
      solution: [
        "Multi-layer forms redesigned so users understand them at first glance.",
        "State handling driven by what the user uploads: waste pending, ready or approved.",
        "File manager that organizes Excels by period and keeps traceability.",
        "Frontend modules in React, Next.js and TypeScript integrated with APIs and the team's deployment flow.",
      ],
      challenges: [
        "Representing states and regulatory requirements without passing process complexity straight to the user.",
        "Evolving modules inside shared platforms while staying consistent with the team's work.",
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
        "Questions about Chile's EPR law (Ley REP) arrive over WhatsApp and repeat themselves: which products are priority products, who must report, how to comply. Answering them one by one eats team time, and the cases that do need a person get lost among the rest.",
      context:
        "A professional project at GreenSoft, in production at leyrep.cl. It is the Ley REP virtual assistant; Orbix was its former name. It is backend only: there is no UI of its own, everything the user sees happens in WhatsApp. It is independent from Dixta.",
      objective:
        "Give guidance on Ley REP with answers grounded in documents, and hand concrete cases to the sales team with the data needed to continue the conversation.",
      role: [
        "Planned the solution, defined the technical design and built the backend.",
        "Implemented the WhatsApp Cloud API webhook with Meta signature validation, plus the guided flows with buttons, lists and numbered options.",
        "Built the AI answers for open questions: search over the indexed documents and generation with DeepSeek through Vercel AI Gateway.",
        "Integrated lead registration in the CRM (Odoo) when a conversation is handed to an agent.",
      ],
      architecture: [
        "Laravel 13 on PHP 8 and MySQL; it is backend only, with no frontend. The suite has close to 1,280 Pest tests and runs against MySQL.",
        "The webhook only validates and enqueues: Meta signature, per-phone rate limit and message extraction. The answer is built in a job, because Meta retries when the webhook is slow.",
        "Every message goes through a decision cascade: guided flows and an intent tree first; the model only answers open questions.",
        "Document search is lexical, with no embeddings or vector database: a local SQLite (FTS5) index over 116 regulatory documents.",
        "The model is DeepSeek through Vercel AI Gateway, via an OpenAI-compatible API. It previously ran on a self-hosted llama.cpp server.",
        "Leads are sent to Odoo and a job retries failed deliveries. Bitrix24 was retired.",
      ],
      solution: [
        "Interactive main menu and a priority-products submenu, with guided answers for frequent questions.",
        "AI answers for open questions, grounded in the fragments of regulatory documents that search retrieves.",
        "In-chat capture forms and handoff to an agent, with the lead registered in Odoo.",
        "Data deletion on request from the chat itself: the conversation is anonymized instead of deleting the rows.",
        "Reference case sets and commands to evaluate retrieval, routing and answers before changing a parameter or a model.",
      ],
      challenges: [
        "In a regulatory topic the risk is not that the model writes badly but that it answers well to someone who did not ask; that is why answers rely on documents, not on what the model remembers.",
        "Avoiding duplicate messages when the model is slow: the webhook enqueues, a per-phone lock orders the turns and an incoming-messages table provides idempotency.",
        "Choosing lexical over vector search and tuning its parameters by measuring against reference cases, not by eye.",
        "Switching model providers without rewriting the system, by keeping an OpenAI-compatible interface.",
      ],
      learnings: [
        "Measure before changing: with a set of reference cases, an improvement stops being an impression.",
        "AI helps with interpreting open questions; flows that capture data or hand off to a person need explicit steps.",
        "Designing a conversation demands the same care for hierarchy and error recovery as a visual interface.",
      ],
      result:
        "In production at leyrep.cl: it answers Ley REP questions over WhatsApp and hands commercial cases to the CRM. Internal documents, credentials and operational details are omitted.",
      gallery: [],
      links: {
        demo: "https://leyrep.cl",
      },
    },
    dixta: {
      problem:
        "Tracking environmental and regulatory sources by hand scatters editorial work across searching, selecting, writing and distributing.",
      context:
        "A professional platform built at GreenSoft together with another developer, independent from the WhatsApp assistant. A Laravel core orchestrates the pipeline and a Python microservice handles extraction with Scrapling.",
      objective:
        "Turn configured sources into reviewable drafts while keeping human editorial control and pipeline traceability.",
      role: [
        "Built the first version of the platform and a large part of its evolution: scraping, candidate selection, draft generation and publishing.",
        "Hardened the Python extraction microservice: article validation, URL-based deduplication and browser rendering when a site requires it.",
        "Implemented draft validations and the review flow: nothing is published without a person approving it.",
        "Migrated the draft generator model to DeepSeek.",
      ],
      architecture: [
        "Laravel owns the database, queues, candidate selection, drafts and publishing; the FastAPI + Scrapling scraper is stateless.",
        "The normalized URL and its hash are the deduplication contract between both services.",
        "The generator model went through several stages: it started with local models and today it is DeepSeek. The Bitrix24 integration and the llama.cpp server were removed.",
        "The model must return a JSON object with fixed fields; if the result fails validation, the draft falls back to a deterministic template.",
        "Publishing is a separate action from approving: a draft goes through human review before it goes out.",
      ],
      solution: [
        "Daily extraction from configured sources, with relevance and age filters.",
        "Article persistence and deduplication before spending inference.",
        "Draft generation with DeepSeek, validated and normalized before being shown.",
        "A panel to edit, regenerate, approve or reject each draft, with LinkedIn publishing only after approval.",
      ],
      challenges: [
        "Keeping extraction reliable across heterogeneous sources without coupling it to the database.",
        "Avoiding duplicates and irrelevant content before spending inference or editorial time.",
        "Separating automation from publishing: the model proposes and a person keeps the final decision.",
      ],
      learnings: [
        "Clear boundaries between orchestrator and scraper make each part easier to test, replace and deploy.",
        "Draft quality depends as much on selection and context as on the model used.",
      ],
      result:
        "It ran in production and is currently on hold. Sources, credentials and sensitive internal details are omitted.",
      gallery: [],
    },
    pagos: {
      problem:
        "A client wanted to sell several domains online and needed a site with a catalog and integrated payment, instead of handling each sale by hand.",
      context:
        "A solo commission: tu-dominio.cl, a site to sell domains. I built it solo, end to end.",
      objective:
        "Solve the full commercial flow, from picking a domain to the payment result and its state change.",
      role: [
        "Built everything: frontend, backend and database.",
        "Integrated Mercado Pago with Checkout Pro and a webhook that confirms the payment.",
        "Modeled the data with Prisma on PostgreSQL hosted on Supabase.",
      ],
      architecture: [
        "Next.js owns frontend and backend; Prisma talks to PostgreSQL on Supabase; Mercado Pago runs checkout.",
        "The webhook does not trust the notification: it queries the payment in Mercado Pago again before recording the order.",
        "An approved payment creates the order and marks the domain as sold; the order stays pending data until the buyer completes the information for the transfer.",
      ],
      solution: [
        "Domain catalog with search, category filters and availability.",
        "Checkout with Mercado Pago and result pages for approved, pending or failed payments.",
        "When the payment is approved, the domain goes from available to sold and the order is created.",
        "A post-payment form for the owner's data, needed to transfer the domain through NIC Chile.",
      ],
      challenges: [
        "Keeping the external payment and local state consistent across approved, failed or incomplete results.",
        "Avoiding duplicate orders when Mercado Pago repeats a notification: the payment id is unique in the database.",
        "Closing the technical product even though its release depended on third-party information.",
      ],
      learnings: [
        "Integrating a payment gateway and reacting to its result to move the order state.",
        "Leaving a finished, functional product even when closing it out depends on third parties.",
      ],
      result:
        "Development finished, with payments tested in test mode. Closing it out is still pending on information the person in charge had to provide.",
      gallery: ["Domain catalog", "Order states", "Mercado Pago checkout"],
    },
    baoblue: {
      problem:
        "A clay-earring brand needed a recognizable web presence to show its catalog and move inquiries to WhatsApp without a full e-commerce.",
      context:
        "A freelance project for a real client. I designed and built the landing page around an expressive, handcrafted brand identity.",
      objective:
        "Present the catalog and buying process through a distinctive experience that stays fast and clear on mobile.",
      role: [
        "Designed and built the landing page end to end.",
        "Created a vibrant visual direction, animations and reusable components.",
        "Wired the CTA straight to the salesperson's WhatsApp, with no intermediate form.",
      ],
      architecture: [
        "A component-based landing page in React/Next.js, styled with Tailwind and animated with Framer Motion.",
        "The CTA goes straight to WhatsApp; no backend was added where the business did not need one.",
      ],
      solution: [
        "Responsive site in React/Next.js with Tailwind, Framer Motion and reusable components.",
        "BaoBlue: earring catalog with hover, a 3-step buying process, testimonials and FAQ.",
        "A vibrant yet harmonious palette, with the animations I like most in the project.",
        "Deployment on Vercel with a GitHub workflow.",
      ],
      challenges: [
        "Keeping personality and motion without hurting readability, responsive behavior or scanning speed.",
      ],
      learnings: [
        "Translating the business personality into concrete visual decisions.",
        "Keeping eye-catching animations without breaking visual harmony.",
      ],
      result:
        "BaoBlue is in production, deployed on Vercel, and its repository is public.",
      gallery: ["BaoBlue — Unique earrings for unique people", "Earring catalog (hover)", "How to buy in 3 steps", "Customer testimonials"],
      links: {
        demo: "https://baoblue-web.vercel.app/",
        repo: "https://github.com/JeremyLandaeta/baoblue-web",
      },
    },
    anrra: {
      problem:
        "A woodworking shop needed a warm, simple digital showcase to present its work and receive inquiries.",
      context:
        "A freelance project independent from BaoBlue. It stayed a mockup: the structure and design are done, but the real product images never arrived.",
      objective: "Build a responsive landing that respected the brand's handcrafted character and was easy to complete with real content.",
      role: [
        "Designed and built the frontend interface.",
        "Tailored palette, composition and animations to a woodworking shop.",
      ],
      solution: [
        "Responsive landing with Next.js, Tailwind CSS and Framer Motion.",
        "Sections for the product lines, a gallery of work and contact.",
        "A structure ready to swap the placeholder images for real photographs.",
      ],
      challenges: ["Moving the experience and layout forward without presenting temporary material as the brand's final content."],
      learnings: ["Separating structure, visual direction and content lets work move forward without blocking everything on pending assets."],
      result: "Mockup finished at the interface level. It was not published: the real product images were missing.",
      gallery: [],
    },
    portfolio: {
      problem:
        "A generic portfolio says nothing about how I work. I wanted one that showed design judgment, modern frontend and personality, not yet another template.",
      context:
        "This very site. I designed and built it solo, from scratch, as a technical calling card.",
      objective:
        "Explain what I build and how I work at a glance, using a distinct identity without sacrificing recruiter clarity.",
      role: [
        "Full design and development, with no templates or UI libraries.",
        "Architecture on Next.js 16 (App Router) and React 19, with URL-based es/en i18n for SEO.",
        "A custom interaction layer: Framer Motion animations, particles, cursor glow and 3D tilt on the cards.",
      ],
      architecture: [
        "Next.js App Router with static ES/EN routes, typed content and metadata generated from shared sources.",
        "Server Components by default, with client components limited to navigation, the carousel and animation.",
      ],
      solution: [
        "An optional “gamer” layer (RPG/MOBA/TCG): character stats, a champion-style card with an ability kit and a “Current Quest”.",
        "A custom animated pixel-art scene (samurai + campfire).",
        "A real-time age counter and experience, stack and FAQ sections.",
        "Responsive design, mindful of performance and animations.",
      ],
      challenges: [
        "Balancing the RPG narrative with professional hierarchy, accessibility and performance.",
        "Evolving content, cases, sitemap, JSON-LD and translations without letting them drift apart.",
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
    badge: "Interfaces · systems · applied AI",
    name: "Jeremy Landaeta Lizama",
    title: "Software Developer",
    stack: ["React", "Next.js", "TypeScript"],
    tagline:
      "I build digital products end to end: modern interfaces, business rules, integrations and AI when it solves a real problem.",
    location: "Santiago, Chile",
  },
  about: {
    kicker: "The character behind the keyboard",
    heading: "Character sheet",
    paragraphs: [
      "I'm a Computer Engineer and software developer at GreenSoft. I build interfaces for environmental products, automation and AI integrations; earlier I worked in process auditing at PwC and built LEXY as a team capstone.",
      "My foundation is React, Next.js and TypeScript. From there I move into backend, data, business rules and deployment when the product needs a complete solution.",
    ],
    highlights: [
      { value: "6+", label: "digital initiatives in my first year" },
      { value: "2", label: "environmental calculators in production" },
    ],
    facts: [
      { key: "class", label: "Software Developer · Frontend / Full Stack / AI" },
      { key: "current", label: "GreenSoft · since 2025" },
      { key: "location", label: "Santiago, Chile" },
      { key: "education", label: "Duoc UC · Graduated 2025" },
      { key: "languages", label: "Spanish · English (TOEIC 805)" },
    ],
  },
  projects: {
    kicker: "What I've built",
    heading: "Projects",
    featuredLabel: "Main projects",
    moreLabel: "More projects",
    prev: "Previous projects",
    next: "Next projects",
    noShots: "No public screenshots",
    contribution: "My role",
    solvesLabel: "What it solves",
    statusLabels: {
      production: "Production",
      internal: "Internal use",
      paused: "On hold",
      completed: "Completed",
      development: "In development",
      prototype: "Prototype / exploration",
      mockup: "Mockup",
    },
    categoryLabels: {
      professional: "Professional project",
      freelance: "Freelance project",
      personal: "Personal project",
      academic: "Academic project",
    },
    items: [
      {
        id: "fcc", title: "Financial Control Center", tagline: "Financial domain, architecture & product",
        metaDescription: "Financial Control Center case study: a full-stack product in development with Next.js, PostgreSQL, Prisma, Better Auth and invariant tests.",
        description: "A personal finance control center that models real available money, debt, commitments, savings and projections without confusing balance with spendable cash.",
        own: true,
        contribution: "It is my own project and it solves a problem of my own: knowing how much I can really spend each month without neglecting installments, savings and commitments. I defined it and built all of it; the schema has 23 models and 17 enums.",
        tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Vitest"], accent: "emerald",
        category: "personal", status: "development", featured: true, priority: 1,
      },
      {
        id: "greensoft", title: "GreenSoft · EcoREP · 0 Carbono", tagline: "Interfaces for environmental operations",
        metaDescription: "EcoREP and 0 Carbono case study: frontend modules for environmental platforms using React, Next.js, TypeScript, MUI and RTK Query.",
        description: "Platforms for waste traceability, EPR compliance and carbon footprint work. The case only covers the modules and interfaces I contributed to.",
        contribution: "On 0 Carbono I implemented the whole frontend, using HuellaChile's as a reference. On EcoREP I took part in frontend work: a file manager and filterable tables.",
        tags: ["React", "Next.js", "TypeScript", "MUI", "RTK Query", "REST APIs"], accent: "cyan",
        category: "professional", status: "production", priority: 2,
      },
      {
        id: "orbix", title: "Ley REP Assistant (formerly Orbix)", tagline: "AI-powered WhatsApp support",
        metaDescription: "Case study of the leyrep.cl WhatsApp assistant, formerly Orbix: Laravel 13, MySQL, DeepSeek through Vercel AI Gateway, lexical search and Odoo CRM.",
        description: "The leyrep.cl WhatsApp assistant: it answers questions about Chile's EPR law (Ley REP) grounded in regulatory documents and hands concrete cases to the sales team. Orbix was its former name.",
        own: true,
        contribution: "The same Ley REP questions kept arriving over WhatsApp. I planned and built the assistant that answers them from regulatory documents and hands commercial cases to the team.",
        tags: ["Laravel", "MySQL", "WhatsApp Cloud API", "DeepSeek", "Vercel AI Gateway", "Odoo"], accent: "violet",
        category: "professional", status: "production", priority: 4,
      },
      {
        id: "dixta", title: "Dixta — AI Content Automation", tagline: "Editorial pipeline with human review",
        metaDescription: "Dixta case study: news extraction with Scrapling, Laravel orchestration and drafts generated with DeepSeek for human review.",
        description: "A platform that discovers, extracts, classifies and prepares environmental and regulatory drafts, keeping editorial approval before anything is published.",
        own: true,
        contribution: "Tracking environmental and regulatory news by hand ate hours of editorial work. I built the platform from its first version: it extracts the news, picks what matters and generates AI drafts that a person approves before publishing.",
        tags: ["Laravel", "Python", "Scrapling", "FastAPI", "DeepSeek"], accent: "violet",
        category: "professional", status: "paused", priority: 3,
      },
      {
        id: "pagos", title: "tu-dominio.cl", tagline: "Full-stack commercial flow",
        metaDescription: "tu-dominio.cl case study: a full-stack domain sales platform with Next.js, Prisma, PostgreSQL on Supabase and Mercado Pago.",
        description: "A domain catalog with persistence, payment and business states from selection to sale.",
        own: true,
        contribution: "A client wanted to sell domains online without handling each sale by hand. I built the whole platform: catalog, Mercado Pago checkout and database.",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Supabase", "Mercado Pago"], accent: "blue",
        category: "professional", status: "completed", priority: 5,
      },
      {
        id: "baoblue", title: "BaoBlue", tagline: "Brand landing & craft catalog",
        metaDescription: "BaoBlue case study: a responsive freelance landing page using React/Next.js, Tailwind, animation and Vercel deployment.",
        description: "A digital storefront for a clay-earring brand, with catalog, buying narrative and direct WhatsApp contact.",
        own: true,
        contribution: "A clay-earring brand needed to show its catalog and take orders over WhatsApp without setting up an e-commerce. I designed and built the whole landing page, and it is live in production.",
        tags: ["React", "Next.js", "Tailwind", "Framer Motion", "Vercel"], accent: "cyan",
        category: "freelance", status: "production", featured: true, priority: 6,
      },
      {
        id: "anrra", title: "Anrra", tagline: "Landing mockup for wood products",
        metaDescription: "Anrra case study: a freelance landing mockup with Next.js and Tailwind, left waiting for the real product images.",
        description: "A landing mockup for a woodworking shop: product lines, gallery and contact.",
        own: true,
        contribution: "A woodworking shop needed a showcase on the web. I designed and built the whole landing page; it stayed a mockup because the real product images never arrived.",
        tags: ["Next.js", "React", "Tailwind", "Framer Motion"], accent: "cyan",
        category: "freelance", status: "mockup", priority: 7,
      },
      {
        id: "lexy", title: "LEXY — Legal Solutions", tagline: "Legal chatbot + back office",
        metaDescription: "LEXY case study: a legal platform with an AI chatbot and back office. Team capstone; my focus was the public frontend.",
        description: "A team capstone combining a public site, AI chatbot and back office for routing questions to lawyers.",
        contribution: "Built the public frontend, integrated components and helped configure the chatbot's legal context.",
        tags: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "OpenAI", "Tailwind"], accent: "blue",
        category: "academic", status: "completed", featured: true, priority: 8,
      },
      {
        id: "portfolio", title: "jlandaeta.dev", tagline: "Editorial product with an RPG identity",
        metaDescription: "jlandaeta.dev case study: Next.js 16, React 19, URL-based i18n, accessibility and a custom RPG/pixel-art identity.",
        description: "This portfolio: frontend architecture, a pixel-art visual system, bilingual case studies, animation and continuous product evolution.",
        own: true,
        contribution: "A template portfolio says nothing about how I work. I designed and built all of it, no template, with Next.js 16, React 19 and indexable internationalization.",
        tags: ["Next.js 16", "React 19", "TypeScript", "Framer Motion", "i18n"], accent: "emerald",
        category: "personal", status: "development", priority: 9,
      },
    ],
  },
  experience: {
    kicker: "The path",
    heading: "Professional experience",
    items: [
      {
        role: "Frontend Developer / Software Developer",
        company: "GreenSoft",
        url: "https://greensoft.cl",
        period: "Jun 2025 — Present",
        location: "Santiago, Chile",
        current: true,
        bullets: [
          "Implemented the whole 0 Carbono frontend and took part in the EcoREP one, both environmental products in production, with React, Next.js, TypeScript, Material UI, Redux Toolkit and RTK Query.",
          "Implement forms, validation, complex filters, dashboards, file management, exports and REST API integrations.",
          "Built the backend of the leyrep.cl WhatsApp assistant (formerly Orbix), now in production: guided flows, answers with DeepSeek through Vercel AI Gateway and lead handoff to the CRM.",
          "Built Dixta from its first version: a platform that extracts news, picks what matters and generates AI drafts for editorial review.",
          "Built tu-dominio.cl end to end with persistence and Mercado Pago, and manage team deployments and repositories.",
          "Integrated external services, managed Vercel deployments and worked with Git and GitHub in an agile (Scrum) flow.",
        ],
        tags: ["React", "Next.js", "TypeScript", "Node.js", "Laravel", "DeepSeek", "Vercel"],
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
          "Built the public frontend and integrated components within a legal platform developed as a team.",
          "Helped configure the chatbot's context and integrate my work with the back office.",
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
      { title: "Financial Control Center", description: "A full-stack personal product in development: financial domain, authentication, business rules, tests and documented evolution.", status: "In development", tags: ["Next.js", "PostgreSQL", "Prisma", "Better Auth"] },
      { title: "Professional products", description: "Ongoing environmental platforms, automation and integrations for real operational workflows.", status: "Active", tags: ["React", "APIs", "Bitrix24"] },
      { title: "Local AI & agent tooling", description: "Experiments with local models and with agents that automate my own development work. Agents already in production, like the Ley REP assistant, are under Projects.", status: "Exploring", tags: ["Ollama", "Agents", "Automation"] },
    ],
  },
  allies: {
    kicker: "By the fire",
    heading: "Allies",
    intro: "The one who guides me and those who've walked the road with me. Each with their own build: go take a look at their portfolios.",
    buildLabel: "Build",
    questsLabel: "Quests",
    visit: "View portfolio",
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
        a: "I work as a software developer at GreenSoft, building environmental products, automation and AI integrations. I also maintain personal projects where I explore new ideas and technologies.",
      },
      {
        q: "What's your main stack?",
        a: "My specialty is React, Next.js and TypeScript. Depending on the product I also work with Node.js or Laravel, PostgreSQL/Prisma, APIs, authentication and local-model or AI-service integrations.",
      },
      {
        q: "Do you speak English?",
        a: "Yes, upper-intermediate level (TOEIC 805). I'm comfortable working in English-speaking teams.",
      },
      {
        q: "What kind of projects excite you the most?",
        a: "Products where the interface, business rules and integrations form one coherent solution. AI interests me when it removes manual work or improves a decision, not as decoration.",
      },
      {
        q: "How do you work?",
        a: "I start by understanding the problem and modeling its rules. I work incrementally, document important decisions, validate with tests and collaborate across product and engineering to ship the solution.",
      },
    ],
  },
  contact: {
    kicker: "Let's talk",
    heading: "Let's work together?",
    status: "Always open to a good conversation",
    description:
      "I'm open to Frontend, Full Stack and applied-AI roles where I can contribute product judgment, React, Next.js, TypeScript and end-to-end integrations.",
    emailLabel: "Email me",
  },
  footer: {
    built: "Stack: Next.js · TypeScript · Tailwind",
    rights: "Forged in Santiago, Chile",
    projects: "Case studies",
  },
};

export const dictionaries: Record<Lang, Content> = { es, en };
