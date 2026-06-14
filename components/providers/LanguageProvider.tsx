"use client";

import { createContext, use, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dictionaries, type Content, type Lang } from "@/lib/content";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Content;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

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
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.push(`/${next}${rest}${hash}`);
    },
    [lang, pathname, router],
  );

  const toggle = useCallback(() => setLang(lang === "es" ? "en" : "es"), [lang, setLang]);

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
