"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import type { Locale } from "@/types/content";
import { copy } from "@/lib/ui";

const storageKey = "discover-burgas-favorites";
function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function FavoriteButton({ slug, locale }: { slug: string; locale: Locale }) {
  const subscribe = (callback: () => void) => { window.addEventListener("discover-favorites", callback); window.addEventListener("storage", callback); return () => { window.removeEventListener("discover-favorites", callback); window.removeEventListener("storage", callback); }; };
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // The disabled server state prevents a tap from being lost while React hydrates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);
  const saved = useSyncExternalStore(subscribe, () => readFavorites().includes(slug), () => false);
  const toggle = () => { const values = readFavorites(); const next = values.includes(slug) ? values.filter((v) => v !== slug) : [...values, slug]; localStorage.setItem(storageKey, JSON.stringify(next)); window.dispatchEvent(new Event("discover-favorites")); };
  return <button className={`favorite ${saved ? "is-saved" : ""}`} onClick={toggle} aria-pressed={saved} disabled={!hydrated}><Heart size={19} fill={saved ? "currentColor" : "none"}/>{saved ? copy[locale].saved : copy[locale].save}</button>;
}
