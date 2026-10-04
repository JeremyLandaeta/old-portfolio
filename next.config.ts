import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Página 404 global. Necesaria porque el "root layout" vive en un segmento
  // dinámico (app/[lang]/layout.tsx), así que el 404 se maneja con
  // app/global-not-found.tsx (devuelve su propio documento HTML).
  experimental: {
    globalNotFound: true,
  },

  // Permite acceder al dev server desde otros dispositivos de la red local
  // (p. ej. el celular). Útil solo en desarrollo; no afecta producción.
  allowedDevOrigins: ["192.168.100.7", "192.168.100.*", "192.168.1.*"],

  // No anunciar el framework en cada respuesta (header `x-powered-by`).
  poweredByHeader: false,

  images: {
    // AVIF primero (≈20% más liviano que WebP), con WebP como respaldo.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // El idioma por defecto es español: la raíz redirige a /es. Permanente
      // (308) para que buscadores consoliden la raíz en /es, que es el canonical.
      { source: "/", destination: "/es", permanent: true },
      // No hay página de listado de proyectos: vive como sección de la home.
      { source: "/proyectos", destination: "/es#proyectos", permanent: true },
      { source: "/:lang(es|en)/proyectos", destination: "/:lang#proyectos", permanent: true },
      // URLs antiguas sin prefijo de idioma → español.
      { source: "/proyectos/:slug+", destination: "/es/proyectos/:slug+", permanent: true },
    ];
  },
};

export default nextConfig;
