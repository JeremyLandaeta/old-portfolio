import { SPRITES } from "@/lib/gamer";

/** Renderiza un mini-sprite pixel-art (estrella, gema…) como SVG nítido. */
export function PixelSprite({
  name,
  cell = 4,
  className = "",
  style,
}: {
  name: keyof typeof SPRITES;
  cell?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sprite = SPRITES[name];
  const rows = sprite.grid.length;
  const cols = sprite.grid[0].length;
  const rects: React.ReactNode[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const fill = sprite.palette[sprite.grid[y][x]];
      if (!fill) continue;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
    }
  }

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
      {rects}
    </svg>
  );
}
