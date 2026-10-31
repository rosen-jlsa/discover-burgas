import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapExplorer } from "@/components/MapExplorer";
import { loadPublishedLandmarks } from "@/lib/backend";
import { isLocale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "bg" ? "Карта на културните места" : "Cultural places map";
  const description = locale === "bg" ? "Открий проверени културни и исторически места в Бургас." : "Discover verified cultural and historic places in Burgas.";
  return { title, description, alternates: { canonical: `/${locale}/map`, languages: { bg: "/bg/map", en: "/en/map" } } };
}
export default async function MapPage({ params }: { params: Promise<{locale:string}> }) { const {locale}=await params;if(!isLocale(locale))notFound();const landmarks=await loadPublishedLandmarks();return <div className="map-page"><div className="shell"><div className="map-page-head"><div><p className="eyebrow">{landmarks.length} {locale==="bg"?"проверени места":"verified places"}</p><h1 className="display">{locale==="bg"?"Карта на историите":"Map of stories"}</h1></div></div><MapExplorer items={landmarks} locale={locale}/></div></div> }
