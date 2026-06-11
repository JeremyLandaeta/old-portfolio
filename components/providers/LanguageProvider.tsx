"use client";

import { createContext, useContext } from "react";
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

  const setLang = (next: Lang) => {
    if (next === lang) return;
    // Reemplaza el primer segmento de idioma: /es/proyectos/x → /en/proyectos/x
    const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`/${next}${rest}${hash}`);
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
