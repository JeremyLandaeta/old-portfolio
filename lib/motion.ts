/**
 * Valores de movimiento para lo que anima Framer Motion (presencia con salida y
 * alto automático: menú móvil, acordeón del FAQ, logro secreto). Son los mismos
 * de globals.css (--ease, --dur-fast, --dur-base), que usa todo lo demás.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.2, base: 0.5 } as const;
