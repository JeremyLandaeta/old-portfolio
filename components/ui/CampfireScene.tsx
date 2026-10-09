import Image from "next/image";

// Brasas que suben desde la fogata. Posiciones en % de la ilustración.
const EMBERS = [
  { left: "44.6%", delay: "0s", duration: "3.4s" },
  { left: "46.3%", delay: "0.9s", duration: "4.1s" },
  { left: "45.4%", delay: "1.7s", duration: "3.7s" },
  { left: "47.1%", delay: "2.6s", duration: "4.4s" },
  { left: "45.9%", delay: "3.3s", duration: "3.9s" },
];

/**
 * La escena de la fogata a todo el ancho, anclada al borde inferior de su
 * sección (que debe ser `relative` y definir `--h`, el alto de la escena: ver
 * `.hero` y `.scene-end` en globals.css). Abre el sitio en el hero y lo cierra
 * en Contacto. `preload` solo donde es lo primero que se ve.
 */
export function CampfireScene({ preload = false }: { preload?: boolean }) {
  return (
    <div aria-hidden className="hero-scene">
      <div className="hero-scene-art">
        <Image
          src="/pixel/about-scene-base.webp"
          alt=""
          fill
          sizes="100vw"
          preload={preload}
          draggable={false}
          className="pixelated select-none object-cover"
        />
        <span className="fire-glow" />
        <span className="fire-floor" />
        {EMBERS.map((e) => (
          <span
            key={e.left}
            className="ember"
            style={{ left: e.left, animationDelay: e.delay, animationDuration: e.duration }}
          />
        ))}
        <span className="term-cursor" />
      </div>
    </div>
  );
}
