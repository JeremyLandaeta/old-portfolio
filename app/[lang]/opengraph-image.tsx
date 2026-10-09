import type { CSSProperties } from "react";
import { ImageResponse } from "next/og";

export const alt = "Jeremy Landaeta — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerenderiza una imagen por idioma en build (no dinámica en runtime).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

const SUBTITLE: Record<string, string> = {
  es: "Productos web, interfaces modernas y automatizaciones con IA · React · Next.js · TypeScript",
  en: "Web products, modern interfaces and AI automations · React · Next.js · TypeScript",
};

// Estilos estáticos a nivel de módulo: Satori solo admite estilos inline
// (sin Tailwind/clases CSS), así que los extraemos a const para legibilidad
// y para estabilizar la identidad del objeto (no se reconstruye por render).
const ROOT_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "80px",
  background: "#010813",
  backgroundImage: "radial-gradient(circle at 50% 118%, rgba(255,122,26,0.42), transparent 55%)",
  color: "#f3e7cf",
  fontFamily: "sans-serif",
};

const BADGE_STYLE: CSSProperties = {
  width: 56,
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ff7a1a",
  color: "#010813",
  fontSize: 26,
  fontWeight: 700,
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const subtitle = SUBTITLE[lang] ?? SUBTITLE.es;

  return new ImageResponse(
    (
      <div style={ROOT_STYLE}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={BADGE_STYLE}>
            JL
          </div>
          <div style={{ fontSize: 26, color: "#a89f8c", fontFamily: "monospace" }}>jeremy.dev</div>
        </div>

        <div style={{ marginTop: 40, fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>
          Jeremy Landaeta
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 44,
            fontWeight: 700,
            color: "#ff7a1a",
          }}
        >
          Software Developer
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#a89f8c", maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>
    ),
    { ...size },
  );
}
