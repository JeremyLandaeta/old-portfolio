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

  async redirects() {
    return [
      // El idioma por defecto es español: la raíz redirige a /es.
      { source: "/", destination: "/es", permanent: false },
      // URLs antiguas sin prefijo de idioma → español.
      { source: "/proyectos/:slug*", destination: "/es/proyectos/:slug*", permanent: false },
    ];
  },
};

export default nextConfig;
