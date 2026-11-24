"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,Check,Footprints,Car,Compass} from "lucide-react";
import type {CulturalRoute,Landmark,Locale} from "@/types/content";

export function DiscoveryCollection({routes,places,locale}:{routes:CulturalRoute[];places:Landmark[];locale:Locale}){
 const [selected,setSelected]=useState(routes[0]?.slug||"");const bg=locale==="bg";
 const route=routes.find(item=>item.slug===selected)||routes[0];if(!route)return null;
 const stops=route.stops.flatMap(stop=>{const place=places.find(item=>item.slug===stop.landmarkSlug);return place?[place]:[];});
 const cover=stops.find(place=>place.images.length)?.images[0];
 const mode=route.transportMode==="WALKING"?(bg?"Пеша през центъра":"Walk the centre"):route.transportMode==="DRIVING"?(bg?"С автомобил по крайбрежието":"Drive the coast"):(bg?"Различен транспорт според спирката":"Transport varies by stop");
 return <section className="discovery-collection shell" aria-labelledby="collection-title">
  <div className="collection-heading"><p>{bg?"Разходка по твоя вкус":"A journey that feels like you"}</p><h2 id="collection-title">{bg?"По-малко планиране. Повече Бургас.":"Less planning. More Burgas."}</h2></div>
  <div className="collection-layout"><div className="collection-visual" key={route.slug}>{cover&&<Image src={cover.path} alt={stops.find(place=>place.images.length)?.translations[locale].name||route.translations[locale].title} fill sizes="(max-width:800px) 92vw, 52vw"/>}<div className="collection-photo-caption"><Compass size={20}/><span>{bg?"Местата са реални. Историята е твоя.":"Real places. Your own story."}</span></div></div>
  <div className="collection-config"><div className="collection-selector" role="group" aria-label={bg?"Избери разходка":"Choose a journey"}>{routes.map((item,index)=><button key={item.slug} type="button" aria-pressed={route.slug===item.slug} onClick={()=>setSelected(item.slug)}><span>{item.transportMode==="WALKING"?<Footprints size={18}/>:<Car size={18}/>} {bg?["Центърът","Северен бряг","Южен бряг"][index]||item.translations.bg.title:["City centre","North coast","South coast"][index]||item.translations.en.title}</span>{route.slug===item.slug&&<Check size={16}/>}</button>)}</div>
   <div className="collection-summary" aria-live="polite"><span className="collection-mode">{mode}</span><h3>{route.translations[locale].title}</h3><p>{route.translations[locale].description}</p><ol>{stops.slice(0,5).map(place=><li key={place.slug}><Link href={`/${locale}/places/${place.slug}`}>{place.translations[locale].name}<ArrowUpRight size={14}/></Link></li>)}</ol></div>
   <Link className="collection-start" href={`/${locale}/routes/${route.slug}`}>{bg?"Това е моята разходка":"This is my journey"}<ArrowUpRight size={20}/></Link><p className="collection-reassurance">{bg?"Без регистрация · Навигация с Google Maps, Apple Maps или Waze":"No account needed · Directions with Google Maps, Apple Maps or Waze"}</p>
  </div></div>
  <div className="collection-benefits"><span><Check size={17}/>{bg?"Истории с посочени източници":"Stories with traceable sources"}</span><span><Check size={17}/>{bg?"Запазване за четене офлайн":"Save stories for offline reading"}</span><span><Check size={17}/>{bg?"На български и английски":"Bulgarian and English"}</span></div>
 </section>;
}
