import type { ComponentType, ReactNode } from "react";

/** Acepta íconos de lucide-react y react-icons (ambos toman size + className). */
type IconType = ComponentType<{ size?: number; className?: string }>;

/**
 * Skins de acento. Clases ESTÁTICAS y literales a propósito: Tailwind solo
 * genera las que ve escritas, así que nada de `border-${x}` dinámico.
 */
const ACCENTS = {
  cyan: { border: "border-accent-2/25", bracket: "border-accent-2/70", text: "text-accent-2" },
  blue: { border: "border-accent/30", bracket: "border-accent/70", text: "text-accent" },
  amber: { border: "border-amber-400/25", bracket: "border-amber-400/70", text: "text-amber-300" },
  emerald: { border: "border-emerald-400/25", bracket: "border-emerald-400/70", text: "text-emerald-300" },
  violet: { border: "border-violet-400/25", bracket: "border-violet-400/70", text: "text-violet-300" },
} as const;

type Accent = keyof typeof ACCENTS;

type MenuFrameProps = {
  /** Etiqueta incrustada en el borde superior (estilo menú de juego). */
  title: string;
  /** Ícono opcional junto al título. */
  icon?: IconType;
  /** Sello decorativo opcional abajo a la derecha (ej. "LORE.LOG"). */
  stamp?: string;
  /** Skin de acento — distinto por sección para que no se vean todas iguales. */
  accent?: Accent;
  className?: string;
  children: ReactNode;
};

/**
 * Contenedor "game-menu": esquinas con corner-brackets, título incrustado en
 * el borde superior y sello opcional. Alternativa con personalidad a la card
 * glass redondeada (rompe el look de plantilla).
 */
export function MenuFrame({ title, icon: Icon, stamp, accent = "cyan", className = "", children }: MenuFrameProps) {
  const a = ACCENTS[accent];

  return (
    <div
      className={`relative border ${a.border} bg-[rgba(11,16,30,0.55)] shadow-[0_0_44px_-26px_var(--accent-glow)] backdrop-blur-sm ${className}`}
    >
      {/* corner brackets */}
      <span aria-hidden className={`pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 ${a.bracket}`} />
      <span aria-hidden className={`pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 ${a.bracket}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 ${a.bracket}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 ${a.bracket}`} />

      {/* título incrustado en el borde superior */}
      <div className="absolute -top-2.25 left-5 flex items-center gap-1.5 bg-background px-2">
        {Icon && <Icon size={13} className={a.text} />}
        <span className={`font-pixel text-[0.5rem] uppercase tracking-wide ${a.text}`}>{title}</span>
      </div>

      {/* sello opcional */}
      {stamp && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/40"
        >
          {stamp}
        </span>
      )}

      {children}
    </div>
  );
}
