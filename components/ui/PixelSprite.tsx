import { SPRITES, SPRITE_PALETTE, type SpriteName } from "@/lib/gamer";

// Cada tramo se alarga un pelo para tapar la costura entre celdas vecinas.
const OVERLAP = 0.02;

type ColorPath = { fill: string; d: string };
const cache = new Map<SpriteName, ColorPath[]>();

/**
 * Un `<path>` por color: cada fila se recorre uniendo las celdas contiguas del
 * mismo color en un solo tramo. Dibujar un `<rect>` por píxel dejaba hasta 144
 * nodos por sprite (cerca de 900 en la home); así son a lo más tantos como
 * colores tiene. Los sprites no cambian, así que se calcula una vez por nombre.
 */
function spritePaths(name: SpriteName): ColorPath[] {
  const cached = cache.get(name);
  if (cached) return cached;

  const byColor = new Map<string, string>();
  SPRITES[name].forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end++;
      const fill = SPRITE_PALETTE[row[x]];
      if (fill) {
        byColor.set(fill, `${byColor.get(fill) ?? ""}M${x} ${y}h${end - x + OVERLAP}v${1 + OVERLAP}H${x}z`);
      }
      x = end;
    }
  });

  const paths = Array.from(byColor, ([fill, d]) => ({ fill, d }));
  cache.set(name, paths);
  return paths;
}

/** Renderiza un sprite pixel-art (logros, emblemas de proyecto) como SVG nítido. */
export function PixelSprite({
  name,
  cell = 4,
  className = "",
  style,
}: {
  name: SpriteName;
  cell?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const grid = SPRITES[name];
  const rows = grid.length;
  const cols = grid[0].length;

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={cols * cell}
      height={rows * cell}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      aria-hidden
    >
      {spritePaths(name).map(({ fill, d }) => (
        <path key={fill} d={d} fill={fill} />
      ))}
    </svg>
  );
}
