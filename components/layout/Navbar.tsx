"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/lib/content";

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  // en otras páginas, los anclajes deben apuntar a la home del idioma (/es#seccion)
  const linkFor = (id: string) => (isHome ? `#${id}` : `/${lang}#${id}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <motion.header
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
          <span
            className={`grid place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-background transition-all duration-300 ${
              scrolled ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm"
            }`}
          >
            JL
          </span>
          <span className="hidden text-foreground transition-colors group-hover:text-accent-2 sm:inline">
            jeremy<span className="text-accent-2">.dev</span>
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {t.nav.map((item) => (
            <li key={item.id}>
              <Link
                href={linkFor(item.id)}
                className={`rounded-full text-muted transition-all duration-300 hover:bg-white/5 hover:text-foreground ${
                  scrolled ? "px-2.5 py-1 text-[13px]" : "px-3 py-1.5 text-sm"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
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
            className={`btn-shine hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 font-semibold text-background transition-all duration-300 hover:scale-[1.03] sm:flex ${
              scrolled ? "px-3 py-1 text-[13px]" : "px-4 py-2 text-sm"
            }`}
          >
            <Download size={scrolled ? 14 : 15} />
            {t.cta.cv}
          </a>

          <button
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
          <motion.div
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
                    className="block rounded-xl px-4 py-3 text-base text-foreground transition-colors hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SOCIALS.cv}
                  download
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-3 font-semibold text-background"
                >
                  <Download size={16} />
                  {t.cta.cv}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
