/**
 * Corner-brackets estilo HUD/8-bit en las 4 esquinas de un contenedor relativo.
 * `color` = clase de borde (ej. "border-accent-2/70"); `size` = h/w del bracket.
 */
export function CornerBrackets({ color, size = "h-3 w-3" }: { color: string; size?: string }) {
  const base = `pointer-events-none absolute ${size} ${color}`;
  return (
    <>
      <span aria-hidden className={`${base} left-1 top-1 border-l-2 border-t-2`} />
      <span aria-hidden className={`${base} right-1 top-1 border-r-2 border-t-2`} />
      <span aria-hidden className={`${base} bottom-1 left-1 border-b-2 border-l-2`} />
      <span aria-hidden className={`${base} bottom-1 right-1 border-b-2 border-r-2`} />
    </>
  );
}
