"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Coffee, Utensils, Wine } from "lucide-react";
import type { Locale } from "@/types/content";
import { mapsSearch } from "@/data/hospitality";

type PhotoData = { photoUri: string; googleMapsUri: string; authorAttributions: { displayName: string; uri?: string }[] };
type Props = { venueId: string; venueName: string; query: string; locale: Locale; kind: "nightlife" | "coffee" | "dining"; enabled: boolean };

export function GoogleVenuePhoto({ venueId, venueName, query, locale, kind, enabled }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<PhotoData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [requested, setRequested] = useState(false);
  const bg = locale === "bg";
  const Icon = kind === "nightlife" ? Wine : kind === "coffee" ? Coffee : Utensils;

  useEffect(() => {
    if (!enabled || requested || !container.current) return;
    const element = container.current;
    let active = true;
    const load = async () => {
      setRequested(true);
      try {
        const response = await fetch(`/api/venues/${encodeURIComponent(venueId)}/photo`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json() as PhotoData;
        if (active && data.photoUri) setPhoto(data);
      } catch { /* Branded fallback stays available when Google Places is not configured. */ }
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) { void load(); observer.disconnect(); }
      }, { rootMargin: "240px" });
      observer.observe(element);
      return () => { active = false; observer.disconnect(); };
    }
    void load();
    return () => { active = false; };
  }, [venueId, requested, enabled]);

  return <div ref={container} className={`google-venue-photo ${kind}`}>
    {photo ? <>
      {/* Google Places photo URLs are transient; use a plain img and do not cache the Places response. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.photoUri} alt={bg ? `Снимка на ${venueName} от Google Maps` : `Photo of ${venueName} from Google Maps`} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setPhoto(null)}/>
      {loaded && <a className="google-photo-credit" href={photo.googleMapsUri || mapsSearch(query)} target="_blank" rel="noreferrer"><span>{photo.authorAttributions[0]?.displayName ? `${bg ? "Снимка:" : "Photo:"} ${photo.authorAttributions[0].displayName}` : (bg ? "Снимка от Google Maps" : "Photo from Google Maps")}</span><ArrowUpRight size={13}/></a>}
      {photo.authorAttributions[0]?.uri && <a className="google-photo-author sr-only" href={photo.authorAttributions[0].uri} target="_blank" rel="noreferrer">{photo.authorAttributions[0].displayName}</a>}
    </> : <div className="venue-photo-fallback" aria-label={bg ? `Снимката на ${venueName} ще се зареди чрез Google Places при конфигуриран ключ` : `A Google Places photo of ${venueName} will load when an API key is configured`}>
      <div className="fallback-orbit orbit-one"/><div className="fallback-orbit orbit-two"/><span className="fallback-stamp">BURGAS / TASTE</span><Icon size={78} strokeWidth={1.1}/><small>{enabled ? (bg ? "ИЛЮСТРАТИВНА ВИЗИЯ" : "ILLUSTRATIVE ART") : (bg ? "СНИМКАТА ОЧАКВА СВЪРЗВАНЕ" : "PHOTO SERVICE NOT CONNECTED")}</small>
    </div>}
  </div>;
}
