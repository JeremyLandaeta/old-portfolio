"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/lib/content";

// Se calcula una sola vez a nivel de módulo: servidor y cliente coinciden y
// se evita el hydration mismatch de `new Date()` en el JSX.
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative mt-24 border-t border-border px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Terminal */}
        <div className="overflow-hidden rounded-xl border border-border bg-background-soft font-mono text-sm">
          <div className="flex items-center gap-2 border-b border-border bg-white/[0.03] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted">jeremy@portfolio: ~</span>
          </div>
          <div className="space-y-1.5 p-4 leading-relaxed">
            <p>
              <span className="text-accent-2">$</span>{" "}
              <span className="text-muted">whoami</span>
            </p>
            <p className="text-foreground">Jeremy Landaeta — Frontend / Fullstack Developer</p>
            <p>
              <span className="text-accent-2">$</span>{" "}
              <span className="text-muted">cat status.txt</span>
            </p>
            <p className="text-emerald-400">● {t.contact.available}</p>
            <p>
              <span className="text-accent-2">$</span>{" "}
              <span className="text-muted">contact --links</span>
              <span className="cursor-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent-2" />
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent-2">
                <Mail size={15} /> email
              </a>
              <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent-2">
                <FaGithub size={15} /> github
              </a>
              <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent-2">
                <FaLinkedin size={15} /> linkedin
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>
            © {CURRENT_YEAR} Jeremy Landaeta Lizama · {t.footer.rights}
          </p>
          <p className="font-mono">{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
