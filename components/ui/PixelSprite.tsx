import { SPRITES, SPRITE_PALETTE, type SpriteName } from "@/lib/gamer";

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
  const rects: React.ReactNode[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const fill = SPRITE_PALETTE[grid[y][x]];
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
