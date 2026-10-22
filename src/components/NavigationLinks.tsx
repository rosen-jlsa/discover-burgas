import { Map, Navigation, Route } from "lucide-react";
import { navigationUrls } from "@/lib/geo";
import type { Landmark, Locale } from "@/types/content";

export function NavigationLinks({ item, locale, compact = false }: { item: Landmark; locale: Locale; compact?: boolean }) {
  const urls = navigationUrls(item);
  const label = locale === "bg" ? "Избери приложение за навигация" : "Choose a navigation app";
  return <div className={`navigation-chooser ${compact ? "compact" : ""}`} aria-label={label}>
    {!compact && <p>{label}</p>}
    <div className="navigation-providers">
      <a href={urls.google} target="_blank" rel="noreferrer" aria-label={`${label}: Google Maps`}><Map size={18}/><span>Google Maps</span></a>
      <a href={urls.apple} target="_blank" rel="noreferrer" aria-label={`${label}: Apple Maps`}><Route size={18}/><span>Apple Maps</span></a>
      <a href={urls.waze} target="_blank" rel="noreferrer" aria-label={`${label}: Waze`}><Navigation size={18}/><span>Waze</span></a>
    </div>
    {!compact && <small>{locale === "bg" ? "Приложението използва текущото ти местоположение след избора ти." : "The selected app can use your current location after you choose it."}</small>}
  </div>;
}
