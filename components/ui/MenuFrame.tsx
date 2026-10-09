import type { ReactNode } from "react";

/**
 * Color de la placa. Clases ESTÁTICAS y literales a propósito: Tailwind solo
 * genera las que ve escritas, así que nada de `bg-${x}` dinámico.
 */
const ACCENTS = {
  straw: "bg-straw",
  ember: "bg-accent",
  flame: "bg-flame",
  crystal: "bg-crystal",
  moss: "bg-moss",
} as const;

export type FrameAccent = keyof typeof ACCENTS;

type MenuFrameProps = {
  /** Texto de la placa montada sobre el marco. */
  title: string;
  /** Color de la placa: de la paleta de la escena, para distinguir ventanas. */
  accent?: FrameAccent;
  /** Nivel de heading del título (2-4) o "none" para etiqueta decorativa. */
  headingLevel?: 2 | 3 | 4 | "none";
  /** "thin": borde fino sin sombra, para lo que acompaña a las piezas principales. */
  weight?: "heavy" | "thin";
  className?: string;
  children: ReactNode;
};

/**
 * Ventana de juego (`.window` en globals.css): marco en píxeles con esquinas
 * escalonadas, sombra dura y una placa con el nombre. El marco grueso se reserva
 * para las piezas que mandan (proyecto principal, ficha, inventario, resultado);
 * lo que las acompaña usa `weight="thin"`. El texto corrido va sobre el cielo.
 */
export function MenuFrame({
  title,
  accent = "straw",
  headingLevel = 3,
  weight = "heavy",
  className = "",
  children,
}: MenuFrameProps) {
  // El título es un heading real (h2-h4) salvo que sea decorativo ("none").
  const TitleTag = (headingLevel === "none" ? "span" : `h${headingLevel}`) as "span" | "h2" | "h3" | "h4";

  return (
    <div className={`${weight === "thin" ? "window-thin" : "window"} ${className}`}>
      <TitleTag className={`window-tag ${ACCENTS[accent]}`}>{title}</TitleTag>
      {children}
    </div>
  );
}
