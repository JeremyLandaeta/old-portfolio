"use client";

/**
 * Fondo aurora + grid. Posiciona blobs azul/cyan animados detrás del contenido.
 * Pensado para usarse como capa absoluta dentro de una sección `relative`.
 */
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      {/* grid */}
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" />

      {/* blobs aurora */}
      <div
        className="aurora-blob"
        style={{
          top: "-12%",
          left: "8%",
          width: "42vw",
          height: "42vw",
          background: "radial-gradient(circle at 30% 30%, #3b82f6, transparent 65%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "-6%",
          right: "4%",
          width: "38vw",
          height: "38vw",
          background: "radial-gradient(circle at 70% 30%, #06b6d4, transparent 65%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: "-18%",
          left: "30%",
          width: "46vw",
          height: "46vw",
          background: "radial-gradient(circle at 50% 50%, #6366f1, transparent 70%)",
          animationDelay: "-13s",
          opacity: 0.4,
        }}
      />

      {/* viñeta para fundir con el fondo */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
