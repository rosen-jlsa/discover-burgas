import {notFound} from "next/navigation";
import {isLocale} from "@/types/content";
import {loadPublishedLandmarks} from "@/lib/backend";
import {venues} from "@/data/hospitality";
export default async function SourcesPage({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params;if(!isLocale(locale))notFound();const bg=locale==="bg";const places=await loadPublishedLandmarks();
 return <div className="shell travel-page legal-copy"><p className="eyebrow">{bg?"Прозрачност":"Transparency"}</p><h1 className="display">{bg?"Източници и фотографии.":"Sources and photography."}</h1><p>{bg?"Фотографиите на началната страница и в гида използват посочените по-долу оригинали. Иконите за храна и нощувки са декоративни и не представят конкретни обекти.":"The homepage and guide photographs use the originals listed below. Dining and accommodation icons are decorative and do not depict specific venues."}</p>{places.map(p=><section key={p.slug}><h2>{p.translations[locale].name}</h2><ul>{p.images.map(im=><li key={im.path}><a className="text-link" href={im.sourceUrl} target="_blank" rel="noreferrer">{im.creator} · {im.license} ↗</a><p>{im.attribution}</p></li>)}{p.sources.map(s=><li key={s.url}><a className="text-link" href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></li>)}</ul></section>)}<h2>{bg?"Кафе и вечеря":"Coffee and dining"}</h2><ul>{venues.map(v=><li key={v.id}><a className="text-link" href={v.url} target="_blank" rel="noreferrer">{v.name} ↗</a> · {v.checked}</li>)}</ul></div>;
}
