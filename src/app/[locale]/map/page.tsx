import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapExplorer } from "@/components/MapExplorer";
import { loadPublishedLandmarks } from "@/lib/backend";
import { isLocale } from "@/types/content";
import Link from "next/link";
import { ArrowDown, ArrowRight, Compass } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "bg" ? "Карта на културните места" : "Cultural places map";
  const description = locale === "bg" ? "Открий проверени културни, исторически и природни места в Бургас и региона." : "Discover verified cultural, historic and natural places across Burgas and the surrounding region.";
  return { title, description, alternates: { canonical: `/${locale}/map`, languages: { bg: "/bg/map", en: "/en/map" } } };
}
export default async function MapPage({ params }: { params: Promise<{locale:string}> }) { const {locale}=await params;if(!isLocale(locale))notFound();const landmarks=await loadPublishedLandmarks();const bg=locale==="bg";return <main className="atlas-map-page"><section className="atlas-map-intro"><div className="atlas-map-intro-inner"><div className="atlas-map-topline"><span><Compass size={15}/>{bg?"КУЛТУРЕН АТЛАС · БУРГАС И РЕГИОНА":"CULTURAL ATLAS · BURGAS REGION"}</span><span>{String(landmarks.length).padStart(2,"0")} {bg?"МЕСТА":"PLACES"}</span></div><div className="atlas-map-title-row"><div><p className="atlas-map-kicker">{bg?"ГРАДЪТ И БРЕГЪТ СА ПЪЛНИ С ИСТОРИИ":"THE CITY AND COAST ARE FULL OF STORIES"}</p><h1>{bg?<>Открий<br/><em>региона.</em></>:<>Discover<br/><em>the region.</em></>}</h1></div><div className="atlas-map-description"><p>{bg?"От музеите на Бургас до Несебър, Поморие, Созопол, Бегликташ и Ропотамо — избери града или открий какво има около него.":"From Burgas museums to Nessebar, Pomorie, Sozopol, Begliktash and Ropotamo — explore the city or discover what lies around it."}</p><a href="#explore-map">{bg?"Разгледай картата":"Explore the map"}<ArrowDown size={15}/></a></div></div><div className="atlas-map-footer"><span>{bg?"ПРОВЕРЕНИ МЕСТА · ИСТИНСКИ КООРДИНАТИ":"VERIFIED PLACES · REAL COORDINATES"}</span><span>42°18′–42°39′N&nbsp;&nbsp; 27°23′–27°46′E</span></div></div></section><section className="atlas-map-explore" id="explore-map"><div className="atlas-map-section-head"><div><p className="atlas-map-kicker">{bg?"БУРГАС ИЛИ ОКОЛО БУРГАС":"BURGAS OR AROUND BURGAS"}</p><h2>{bg?"Избери следващата спирка":"Choose your next stop"}</h2></div><Link href={`/${locale}/routes/south-coast-discovery`}>{bg?"Регионален маршрут":"Regional route"}<ArrowRight size={15}/></Link></div><MapExplorer items={landmarks} locale={locale}/></section></main> }
