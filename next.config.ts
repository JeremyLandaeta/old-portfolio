import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
