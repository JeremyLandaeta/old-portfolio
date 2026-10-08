/**
 * Transición que se ejecuta en cada navegación de ruta: un telón del color de
 * la noche se retira hacia arriba y deja ver la página.
 *
 * Es CSS puro (`.route-*` en globals.css) y el contenido no se anima: se pinta
 * desde el primer frame bajo el telón, sin esperar al JS. Un fade desde
 * opacidad 0 haría que el navegador no registrara ese primer pintado (LCP).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="route-wipe pointer-events-none fixed inset-0 z-80 origin-top" />
      <div className="route-seal pointer-events-none fixed inset-0 z-81 grid place-items-center">
        <span className="font-mono text-2xl font-bold text-accent">{"</>"}</span>
      </div>
      {children}
    </>
  );
}
