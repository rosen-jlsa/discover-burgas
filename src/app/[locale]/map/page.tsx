import { notFound } from "next/navigation";
import { MapExplorer } from "@/components/MapExplorer";
import { landmarks } from "@/data/landmarks";
import { isLocale } from "@/types/content";

export const metadata = { title: "Карта" };
export default async function MapPage({ params }: { params: Promise<{locale:string}> }) { const {locale}=await params;if(!isLocale(locale))notFound();return <div className="map-page"><div className="shell"><div className="map-page-head"><div><p className="eyebrow">{locale==="bg"?"7 проверени места":"7 verified places"}</p><h1 className="display">{locale==="bg"?"Карта на историите":"Map of stories"}</h1></div></div><MapExplorer items={landmarks} locale={locale}/></div></div> }
