import { AVATAR_SPRITE, AVATAR_PALETTE } from "@/lib/gamer";

/** Sprite pixel-art (casco de explorador) renderizado como SVG nítido. */
export function PixelAvatar({ cell = 8, className = "" }: { cell?: number; className?: string }) {
  const rows = AVATAR_SPRITE.length;
  const cols = AVATAR_SPRITE[0].length;
  const rects: React.ReactNode[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ch = AVATAR_SPRITE[y][x];
      const fill = AVATAR_PALETTE[ch];
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
      role="img"
      aria-label="Avatar pixel-art"
      style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.35))" }}
    >
      {rects}
    </svg>
  );
}
