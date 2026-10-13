"use client";

import { createContext, use, useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dictionaries, type Content, type Lang } from "@/lib/content";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Content;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Deja solo el último ancla: "#inicio#inicio" → "#inicio". */
function lastFragment(hash: string) {
  return hash.slice(Math.max(0, hash.lastIndexOf("#")));
}

/**
 * El idioma es parte de la URL (/es, /en), no del cliente: cada idioma tiene su
 * propia ruta indexable. El provider recibe el `lang` resuelto en el servidor y
 * el toggle navega a la URL equivalente del otro idioma.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      // Reemplaza el primer segmento de idioma: /es/proyectos/x → /en/proyectos/x
      const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
      const hash = typeof window !== "undefined" ? lastFragment(window.location.hash) : "";
      router.push(`/${next}${rest}${hash}`);
    },
    [lang, pathname, router],
  );

  const toggle = useCallback(() => setLang(lang === "es" ? "en" : "es"), [lang, setLang]);

  // El router de Next 16 duplica el ancla al volver a una ruta a la que se entró
  // con ancla (se carga /es#inicio, se abre un caso y al volver queda
  // /es#inicio#inicio): guarda la URL de esa ruta con el ancla incluida y después
  // le suma la del enlace. El scroll llega bien, pero la URL queda mal y cada
  // cambio de idioma la alargaba. Tras cada navegación se deja solo la última.
  useEffect(() => {
    const fix = () => {
      const { hash, pathname: path, search } = window.location;
      const clean = lastFragment(hash);
      if (clean !== hash) window.history.replaceState(null, "", path + search + clean);
    };
    fix();
    window.addEventListener("hashchange", fix);
    window.addEventListener("popstate", fix);
    return () => {
      window.removeEventListener("hashchange", fix);
      window.removeEventListener("popstate", fix);
    };
  }, [pathname]);

  // Memoizamos el value para que su identidad solo cambie cuando cambian sus
  // dependencias reales y no se redibujen todos los consumidores en cada render.
  const value = useMemo(
    () => ({ lang, setLang, toggle, t: dictionaries[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = use(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
