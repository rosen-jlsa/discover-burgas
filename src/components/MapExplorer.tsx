"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { List, LocateFixed, Map as MapIcon, Search } from "lucide-react";
import type { Landmark, Locale } from "@/types/content";
import { categories } from "@/data/landmarks";
import { PlaceCard } from "./PlaceCard";

const MapCanvas = dynamic(() => import("./MapCanvas"), { ssr: false, loading: () => <div className="map-loading">Loading map…</div> });

export function MapExplorer({ items, locale, compact = false }: { items: Landmark[]; locale: Locale; compact?: boolean }) {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState(""); const [view, setView] = useState<"map"|"list">("map"); const [selected, setSelected] = useState(items[0]?.slug); const [user, setUser] = useState<[number,number]>(); const [geoMessage, setGeoMessage] = useState(""); const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Avoid losing the first outdoor tap on slower devices while the map hydrates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);
  const filtered = useMemo(() => items.filter((item) => { const t=item.translations[locale]; const hay=[t.name,t.short,...t.keywords,item.area].join(" ").toLowerCase(); return (!query || hay.includes(query.toLowerCase())) && (!category || item.category===category); }), [items,locale,query,category]);
  const locate = () => { if (!navigator.geolocation) return setGeoMessage(locale === "bg" ? "Локацията не се поддържа." : "Location is not supported."); const fallback=window.setTimeout(()=>setGeoMessage(locale === "bg" ? "Продължете с ръчното разглеждане." : "Continue browsing manually."),2500); navigator.geolocation.getCurrentPosition((pos) => { window.clearTimeout(fallback); setUser([pos.coords.latitude,pos.coords.longitude]); setGeoMessage(locale === "bg" ? "Показваме местата около вас." : "Showing places around you."); }, () => { window.clearTimeout(fallback); setGeoMessage(locale === "bg" ? "Продължете с ръчното разглеждане." : "Continue browsing manually."); }, { timeout: 2200 }); };
  return <div className={`map-explorer ${compact ? "compact" : ""}`}>
    {!compact && <div className="map-toolbar"><label className="search-box"><Search size={18}/><span className="sr-only">{locale === "bg" ? "Търси" : "Search"}</span><input disabled={!hydrated} value={query} onChange={(e)=>{ setQuery(e.target.value); if (e.target.value) setView("list"); }} placeholder={locale === "bg" ? "Търси място или история…" : "Search a place or story…"}/></label><button disabled={!hydrated} className="locate-button" onClick={locate}><LocateFixed size={18}/>{locale === "bg" ? "Около мен" : "Near me"}</button><div className="view-toggle"><button disabled={!hydrated} className={view==="map"?"active":""} onClick={()=>setView("map")} aria-label="Map"><MapIcon size={18}/></button><button disabled={!hydrated} className={view==="list"?"active":""} onClick={()=>setView("list")} aria-label="List"><List size={18}/></button></div></div>}
    {!compact && <div className="filter-row"><button className={!category?"active":""} onClick={()=>setCategory("")}>{locale === "bg" ? "Всички" : "All"}</button>{categories.map((cat)=><button className={category===cat.id?"active":""} onClick={()=>setCategory(cat.id)} key={cat.id}>{cat[locale]}</button>)}</div>}
    <p className={`geo-message ${geoMessage ? "" : "sr-only"}`} role="status" aria-live="polite">{geoMessage}</p>
    {view === "map" || compact ? <div className="map-layout"><div className="map-panel"><MapCanvas items={filtered} locale={locale} selectedSlug={selected} userLocation={user}/></div>{!compact && <div className="map-results"><div className="results-head"><span>{filtered.length} {locale === "bg" ? "места" : "places"}</span></div>{filtered.map((item,i)=><button className={`map-result ${selected===item.slug?"active":""}`} key={item.slug} onClick={()=>setSelected(item.slug)}><span>0{i+1}</span><div><strong>{item.translations[locale].name}</strong><small>{item.area}</small></div></button>)}</div>}</div> : <div className="places-grid">{filtered.map((item,i)=><PlaceCard item={item} locale={locale} index={i+1} key={item.slug}/>)}</div>}
  </div>;
}
