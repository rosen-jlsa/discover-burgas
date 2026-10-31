"use client";
import { useState } from "react";
import { ArrowUpRight, Coffee, Utensils, Waves } from "lucide-react";
import { venues, mapsSearch } from "@/data/hospitality";
import type { Locale } from "@/types/content";

export function DiningExplorer({ locale, initialCategory = "" }: { locale: Locale; initialCategory?: string }) {
  const bg = locale === "bg";
  const [category, setCategory] = useState(initialCategory);
  const choices = [{id:"",bg:"Всички",en:"All"},{id:"coffee",bg:"За кафе",en:"Coffee"},{id:"dinner",bg:"За вечеря",en:"Dinner"},{id:"seaside",bg:"Край морето",en:"Seaside"}];
  const visible = venues.filter(v => !category || (v.categories as readonly string[]).includes(category));
  return <><div className="filter-row dining-filters" aria-label={bg ? "Вид заведение" : "Venue type"}>{choices.map(c=><button aria-pressed={category===c.id} className={category===c.id?"active":""} key={c.id} onClick={()=>setCategory(c.id)}>{bg?c.bg:c.en}</button>)}</div>
    <p className="results-count" role="status">{visible.length} {bg ? "места в подбраната колекция" : "places in the curated collection"}</p>
    <div className="venue-grid">{visible.map(v=><article className="venue-card" key={v.id}><div className={`venue-art ${v.id}`} aria-hidden="true">{v.id==="ti-bar"?<Coffee size={88} strokeWidth={1}/>:<Waves size={88} strokeWidth={1}/>}<span>{v.id==="ti-bar"?"COFFEE / KITCHEN":"SEA / DINING"}</span></div><div className="venue-body"><p className="eyebrow">{bg ? "Бургас" : "Burgas"}</p><h2>{v.name}</h2><p>{v[locale]}</p><div className="venue-actions"><a className="button" href={mapsSearch(v.search)} target="_blank" rel="noreferrer">{bg ? "Намери в Google Maps" : "Find on Google Maps"}<ArrowUpRight size={16}/></a><a className="text-link" href={v.url} target="_blank" rel="noreferrer">{bg ? "Сайт и меню" : "Website & menu"}<ArrowUpRight size={16}/></a></div><small>{bg ? "Източник: сайтът на заведението · проверен на 26.10.2026 г." : "Source: venue website · checked 26 Oct 2026."}</small></div></article>)}</div>
    <div className="travel-note"><Utensils size={24}/><div><strong>{bg ? "Планирай паузата си." : "Plan your pause."}</strong><p>{bg ? "Провери работното време, менюто и възможността за резервация директно със заведението. Връзките отварят външни сайтове. Колекцията не е платена класация." : "Check hours, menus and reservations directly with the venue. Links open external sites. This collection is not a paid ranking."}</p></div></div></>;
}
