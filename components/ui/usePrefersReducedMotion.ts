"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// En el servidor asumimos "sin reducción" para que el HTML estático coincida
// con la primera hidratación; tras montar se lee el valor real del sistema.
function getServerSnapshot() {
  return false;
}

/**
 * `true` cuando el usuario activó "reducir movimiento" en su sistema.
 * Basado en useSyncExternalStore: sin mismatch de hidratación y reacciona
 * si el usuario cambia la preferencia en vivo.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
