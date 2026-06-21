"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useActiveSection } from "@/components/ui/useActiveSection";
import { SOCIALS } from "@/lib/content";

// Store externo para el estado de scroll: sin render extra al montar y
// SSR-safe (el snapshot del servidor es siempre false, igual que el HTML).
function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrolledSnapshot() {
  return window.scrollY > 24;
}

function getScrolledServerSnapshot() {
  return false;
}

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  // en otras páginas, los anclajes deben apuntar a la home del idioma (/es#seccion)
  const linkFor = (id: string) => (isHome ? `#${id}` : `/${lang}#${id}`);
  // sección activa para el cursor ▸ (solo en la home; fuera, sin resaltado)
  const activeId = useActiveSection(isHome ? t.nav.map((n) => n.id) : []);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot
  );
  const [open, setOpen] = useState(false);

  // Bloquear scroll cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cerrar el menú mobile con la tecla Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <m.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 z-50 px-4 transition-all duration-300 ${scrolled ? "top-2" : "top-4"}`}
    >
      <nav
        className={`mx-auto flex items-center justify-between rounded-full transition-all duration-300 ease-out ${
          scrolled
            ? "max-w-3xl px-3.5 py-1.5 glass shadow-lg shadow-black/30"
            : "max-w-5xl px-5 py-3 bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href={isHome ? "#inicio" : `/${lang}`} className="group flex items-center gap-2 font-mono text-sm font-semibold">
          <Image
            src="/jl-logo.png"
            alt="Jeremy Landaeta — logo"
            width={44}
            height={44}
            priority
            className={`shrink-0 transition-all duration-300 ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
          />
          <span className="hidden items-center text-foreground transition-colors group-hover:text-accent-2 sm:inline-flex">
            jeremy<span className="text-accent-2">.dev</span>
            <span aria-hidden className="cursor-blink ml-1 inline-block h-3.5 w-1.5 bg-accent-2" />
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {t.nav.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={linkFor(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group/nav relative rounded-full transition-all duration-300 ${
                    isActive ? "text-accent-2" : "text-muted hover:bg-white/5 hover:text-foreground"
                  } ${scrolled ? "px-2 py-1 text-[13px]" : "px-2.5 py-1.5 text-sm"}`}
                >
                  {/* cursor de selección — absoluto para no sumar ancho al link */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute right-full top-1/2 mr-0.5 -translate-y-1/2 font-mono text-accent-2 transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover/nav:opacity-50"
                    }`}
                  >
                    ▸
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className={`rounded-full border border-border font-mono font-semibold text-muted transition-all duration-300 hover:border-accent-2 hover:text-foreground ${
              scrolled ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs"
            }`}
          >
            <span className={lang === "es" ? "text-accent-2" : ""}>ES</span>
            <span className="mx-1 opacity-40">/</span>
            <span className={lang === "en" ? "text-accent-2" : ""}>EN</span>
          </button>

          <a
            href={SOCIALS.cv}
            download
            className={`btn-shine hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-linear-to-r from-accent to-accent-2 font-semibold text-background transition-all duration-300 hover:scale-[1.03] sm:flex ${
              scrolled ? "px-3 py-1 text-[13px]" : "px-4 py-2 text-sm"
            }`}
          >
            <Download size={scrolled ? 14 : 15} />
            {t.cta.cv}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-5xl rounded-2xl glass p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {t.nav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={linkFor(item.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-base text-foreground transition-colors hover:bg-white/5 hover:text-accent-2"
                  >
                    <span aria-hidden className="font-mono text-accent-2">{">"}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SOCIALS.cv}
                  download
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-accent to-accent-2 px-4 py-3 font-semibold text-background"
                >
                  <Download size={16} />
                  {t.cta.cv}
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
