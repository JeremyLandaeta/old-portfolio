import Image from "next/image";

/**
 * La escena del cierre: el samurái de espaldas frente a la luna. Usa el mismo
 * armazón que la fogata del hero (`.hero-scene`, anclada al borde inferior de
 * una sección `relative` que define `--h`: ver `.scene-end` en globals.css),
 * pero es otro momento del mismo lugar. El único movimiento es la luz del
 * farol, que parpadea a saltos.
 */
export function MoonScene() {
  return (
    <div aria-hidden className="hero-scene">
      <div className="hero-scene-art">
        <Image
          src="/pixel/moon-scene.webp"
          alt=""
          fill
          sizes="100vw"
          draggable={false}
          className="pixelated select-none object-cover"
        />
        <span className="lantern-glow" />
      </div>
    </div>
  );
}
