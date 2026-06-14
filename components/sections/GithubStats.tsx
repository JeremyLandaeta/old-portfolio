"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLang } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SOCIALS } from "@/lib/content";

type Day = { date: string; count: number; level: number };
type Lang = { name: string; count: number };

type Stats = {
  repos: number;
  followers: number;
  contributions: number;
  weeks: Day[][];
  languages: Lang[];
};

const USER = "JeremyLandaeta";
const CACHE_KEY = `gh-stats:${USER}`;

// La API de contribuciones devuelve niveles por cuartil; los mapeamos a 0–4.
const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

// Colores de la heatmap (vacío → intenso) en la paleta azul/cyan del sitio.
const LEVEL_COLORS = [
  "rgba(120,160,220,0.08)",
  "rgba(6,182,212,0.28)",
  "rgba(6,182,212,0.5)",
  "rgba(59,130,246,0.78)",
  "rgba(59,130,246,1)",
];

// Colores por lenguaje (fallback al cyan del sitio).
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Python: "#3572A5",
  Vue: "#41b883",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  SCSS: "#c6538c",
};

const json = (url: string) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

async function fetchStats(): Promise<Stats> {
  // allSettled: una fuente caída degrada con gracia en vez de tumbar el panel.
  const [profileR, contribR, reposR] = await Promise.allSettled([
    json(`https://api.github.com/users/${USER}`),
    json(`https://github-contributions-api.deno.dev/${USER}.json`),
    json(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
  ]);

  // El perfil es el dato base: si falla, no hay panel.
  if (profileR.status !== "fulfilled") throw new Error("profile unavailable");
  const profile = profileR.value;

  // Contribuciones (best-effort): semanas ya agrupadas, niveles por cuartil.
  let weeks: Day[][] = [];
  let contributions = 0;
  if (contribR.status === "fulfilled" && Array.isArray(contribR.value?.contributions)) {
    weeks = contribR.value.contributions.map((week: { contributionCount: number; contributionLevel: string; date: string }[]) =>
      week.map((d) => {
        contributions += d.contributionCount ?? 0;
        return { date: d.date, count: d.contributionCount ?? 0, level: LEVEL_MAP[d.contributionLevel] ?? 0 };
      }),
    );
  }

  // Lenguajes (best-effort): a partir del lenguaje principal de cada repo.
  const counts = new Map<string, number>();
  if (reposR.status === "fulfilled" && Array.isArray(reposR.value)) {
    for (const repo of reposR.value) {
      if (repo.fork || !repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
  }
  const languages: Lang[] = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    repos: profile?.public_repos ?? 0,
    followers: profile?.followers ?? 0,
    contributions,
    weeks,
    languages,
  };
}

export function GithubStats() {
  const { t } = useLang();
  const g = t.github;
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;

    const cached = (() => {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        return raw ? (JSON.parse(raw) as Stats) : null;
      } catch {
        return null;
      }
    })();

    // setStats siempre dentro de un .then (microtask): nunca de forma síncrona
    // en el effect, y el render inicial se mantiene en skeleton (coincide con SSR).
    const source = cached
      ? Promise.resolve(cached)
      : fetchStats().then((data) => {
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
          } catch {
            /* sin almacenamiento: no cacheamos */
          }
          return data;
        });

    source.then((data) => alive && setStats(data)).catch(() => alive && setError(true));

    return () => {
      alive = false;
    };
  }, []);

  const langTotal = stats?.languages.reduce((s, l) => s + l.count, 0) ?? 0;
  const counters = stats
    ? [
        ...(stats.weeks.length > 0 ? [{ value: stats.contributions, label: g.contributions }] : []),
        { value: stats.repos, label: g.repos },
        { value: stats.followers, label: g.followers },
      ]
    : [];

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <SectionHeading kicker={g.kicker} title={g.heading} />

      <Reveal className="mt-10">
        <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-8">
          {/* Cabecera */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold transition-colors hover:text-accent-2"
            >
              <FaGithub size={20} className="text-accent-2" />
              @{g.username}
              <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            {stats && (
              <span className="font-mono text-xs uppercase tracking-wider text-muted">{g.lastYear}</span>
            )}
          </div>

          {error ? (
            <p className="mt-8 text-center text-sm text-muted">{g.error}</p>
          ) : !stats ? (
            // Skeleton de carga
            <div className="mt-8 animate-pulse space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-20 rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
              <div className="h-28 rounded-2xl bg-white/[0.04]" />
            </div>
          ) : (
            <>
              {/* Contadores */}
              <div className={`mt-6 grid gap-3 sm:gap-4 ${counters.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {counters.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-white/[0.02] p-4 text-center">
                    <Counter
                      value={String(stat.value)}
                      className="text-2xl font-bold tabular-nums text-gradient sm:text-3xl"
                    />
                    <p className="mt-1 text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Heatmap de contribuciones (best-effort) */}
              {stats.weeks.length > 0 && (
                <div className="mt-6 overflow-x-auto pb-1">
                  <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
                    {stats.weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((day) => (
                          <span
                            key={day.date}
                            title={`${day.date}: ${day.count}`}
                            className="h-2.5 w-2.5 rounded-[3px]"
                            style={{
                              background: LEVEL_COLORS[day.level],
                              boxShadow: day.level >= 4 ? "0 0 6px -1px var(--accent-2)" : undefined,
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lenguajes más usados */}
              {stats.languages.length > 0 && (
                <div className="mt-7">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">{g.languages}</p>
                  <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
                    {stats.languages.map((l) => (
                      <span
                        key={l.name}
                        style={{
                          width: `${(l.count / langTotal) * 100}%`,
                          background: LANG_COLORS[l.name] ?? "var(--accent-2)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {stats.languages.map((l) => (
                      <span key={l.name} className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: LANG_COLORS[l.name] ?? "var(--accent-2)" }}
                        />
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
