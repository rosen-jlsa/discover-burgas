"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Coffee, Search, Utensils, Waves, Wine } from "lucide-react";
import { venues, mapsSearch } from "@/data/hospitality";
import type { Locale } from "@/types/content";
import { GoogleVenuePhoto } from "@/components/GoogleVenuePhoto";

const categories = [
  { id: "", bg: "Всички места", en: "All places", Icon: Utensils },
  { id: "coffee", bg: "Кафе", en: "Coffee", Icon: Coffee },
  { id: "dinner", bg: "Вечеря", en: "Dinner", Icon: Utensils },
  { id: "seaside", bg: "Край морето", en: "Seaside", Icon: Waves },
  { id: "nightlife", bg: "Нощен живот", en: "Nightlife", Icon: Wine },
  { id: "steakhouse", bg: "Steakhouse", en: "Steakhouse", Icon: Utensils },
];

export function DiningExplorer({ locale, initialCategory = "", googlePhotosEnabled = false }: { locale: Locale; initialCategory?: string; googlePhotosEnabled?: boolean }) {
  const bg = locale === "bg";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => venues.filter((venue) => {
    const matchesCategory = !category || (venue.categories as readonly string[]).includes(category);
    const matchesSearch = !query || `${venue.name} ${venue[locale]} ${venue.search}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, query, locale]);

  return <div className="dining-explorer">
    <div className="dining-discovery-bar">
      <div className="dining-category-list" role="group" aria-label={bg ? "Филтрирай заведенията" : "Filter venues"}>
        {categories.map(({ id, bg: bgLabel, en, Icon }) => <button aria-pressed={category === id} className={category === id ? "active" : ""} key={id || "all"} onClick={() => setCategory(id)}><Icon size={16}/>{bg ? bgLabel : en}</button>)}
      </div>
      <label className="dining-search"><Search size={17}/><span className="sr-only">{bg ? "Търси заведение" : "Search venues"}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={bg ? "Търси място…" : "Search places…"}/></label>
    </div>

    <div className="dining-results-line"><p role="status">{visible.length.toString().padStart(2,"0")} <span>{bg ? "места за откриване" : "places to discover"}</span></p><span>{bg ? "Подбрана селекция · Бургас" : "Curated selection · Burgas"}</span></div>
    {!googlePhotosEnabled && <p className="google-photo-setup-note" role="status">{bg ? "Снимките от Google Maps ще се заредят след добавяне на сървърния GOOGLE_PLACES_API_KEY." : "Google Maps photos will load once the server-side GOOGLE_PLACES_API_KEY is configured."}</p>}

    {visible.length ? <div className="venue-grid">
      {visible.map((venue, index) => {
        const venueCategories = venue.categories as readonly string[];
        return <article className="venue-card" key={venue.id}>
        <div className="venue-photo-wrap">
          <GoogleVenuePhoto venueId={venue.id} venueName={venue.name} query={venue.search} locale={locale} kind={venueCategories.includes("nightlife") ? "nightlife" : venueCategories.includes("coffee") ? "coffee" : "dining"} enabled={googlePhotosEnabled}/>
          <span className="venue-index">{String(index + 1).padStart(2,"0")}</span>
          <span className="venue-type-tag">{venueCategories.includes("nightlife") ? (bg ? "НОЩЕН ЖИВОТ" : "NIGHTLIFE") : venueCategories.includes("steakhouse") ? "STEAKHOUSE" : venueCategories.includes("coffee") ? (bg ? "КАФЕ И ХРАНА" : "CAFÉ & FOOD") : (bg ? "ХРАНА И МОРЕ" : "DINING & SEA")}</span>
          {"rating" in venue && <span className="venue-rating"><span aria-hidden="true">★</span> {venue.rating}</span>}
        </div>
        <div className="venue-body">
          <div className="venue-title-line"><div><p className="venue-overline">{bg ? "БУРГАС · ПРЕПОРЪКА" : "BURGAS · DISCOVER"}</p><h2>{venue.name}</h2></div><a className="venue-open" href={mapsSearch(venue.search)} target="_blank" rel="noreferrer" aria-label={`${bg ? "Отвори" : "Open"} ${venue.name} ${bg ? "в Google Maps" : "on Google Maps"}`}><ArrowUpRight size={19}/></a></div>
          <p className="venue-description">{venue[locale]}</p>
          <div className="venue-actions"><a className="venue-map-link" href={mapsSearch(venue.search)} target="_blank" rel="noreferrer">{bg ? "Отвори в Google Maps" : "Open in Google Maps"}<ArrowUpRight size={15}/></a><a className="venue-site-link" href={venue.url} target="_blank" rel="noreferrer">{bg ? "Сайт / информация" : "Website / info"}</a></div>
          <div className="venue-meta"><span>{bg ? "Проверено" : "Checked"} · {venue.checked}</span>{"ratingSource" in venue && <span>{venue.ratingSource}</span>}</div>
        </div>
      </article>;
      })}
    </div> : <div className="dining-empty"><Search size={24}/><strong>{bg ? "Няма намерени места" : "No places found"}</strong><p>{bg ? "Промени търсенето или избери друга категория." : "Try another search or category."}</p></div>}

    <aside className="dining-note"><div className="dining-note-icon"><Utensils size={19}/></div><div><strong>{bg ? "Избери място. Наслади се на Бургас." : "Pick a place. Enjoy Burgas."}</strong><p>{bg ? "Потвърди работното време, менюто и условията директно с заведението. Оценките са външна информация и може да се променят." : "Confirm opening hours, menus and details directly with the venue. Ratings are external information and may change."}</p></div></aside>
  </div>;
}
