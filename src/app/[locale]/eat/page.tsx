import { notFound } from "next/navigation";
import { isLocale } from "@/types/content";
import { DiningExplorer } from "@/components/DiningExplorer";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params; return {title:locale==="bg"?"Кафе и вечеря в Бургас":"Coffee and dining in Burgas"};
}
export default async function EatPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{category?:string}>}) {
  const {locale}=await params; if(!isLocale(locale)) notFound();
  const {category}=await searchParams;
  const initial = ["coffee","dinner","seaside"].includes(category??"") ? category : "";
  const bg=locale==="bg";
  return <div className="shell travel-page"><p className="eyebrow">{bg?"Кафе · Храна · Море":"Coffee · Food · Sea"}</p><h1 className="display">{bg?"Пауза между историите.":"A pause between stories."}</h1><p className="travel-intro">{bg?"След музея, преди следващата спирка или просто заради гледката. Открий места за кафе и вечеря в Бургас.":"After the museum, before the next stop, or simply for the view. Discover places for coffee and dinner in Burgas."}</p><DiningExplorer locale={locale} initialCategory={initial}/></div>;
}
