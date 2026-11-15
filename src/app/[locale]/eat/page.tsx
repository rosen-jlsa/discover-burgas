import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown, Coffee, Utensils, Waves } from "lucide-react";
import { DiningExplorer } from "@/components/DiningExplorer";
import { isLocale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const bg = locale === "bg";
  return {
    title: bg ? "Кафе, ресторанти и нощен живот в Бургас" : "Cafés, restaurants and nightlife in Burgas",
    description: bg ? "Открий подбрани места за кафе, вечеря и нощен живот в Бургас." : "Discover curated places for coffee, dinner and nightlife in Burgas.",
    alternates: { canonical: `/${locale}/eat`, languages: { "bg-BG": "/bg/eat", en: "/en/eat" } },
  };
}

export default async function EatPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { category } = await searchParams;
  const initial = ["coffee", "dinner", "seaside", "nightlife", "steakhouse"].includes(category ?? "") ? category : "";
  const bg = locale === "bg";

  return <div className="dining-page">
    <section className="dining-hero">
      <div className="dining-hero-top"><span><i/> {bg ? "КУЛИНАРЕН БУРГАС" : "BURGAS, SERVED"}</span><span>42°29′ N · 27°28′ E</span></div>
      <div className="dining-hero-body">
        <div className="dining-hero-copy"><p className="dining-overline">{bg ? "МЕСТА С ВКУС КЪМ МОРЕТО" : "A TASTE OF THE COAST"}</p><h1>{bg ? <>Бургас<br/><em>на масата.</em></> : <>Burgas<br/><em>on the table.</em></>}</h1><p>{bg ? "От първото кафе до последния танц — намери своето място в града." : "From the first coffee to the last dance — find your place in the city."}</p><a className="dining-hero-cta" href="#dining-places">{bg ? "Намери своето място" : "Find your place"}<ArrowDown size={16}/></a></div>
        <div className="dining-hero-art" aria-hidden="true"><div className="dining-art-circle"><span>BURGAS<br/>FOOD<br/>CULTURE</span></div><div className="dining-art-icon icon-coffee"><Coffee size={30}/></div><div className="dining-art-icon icon-sea"><Waves size={32}/></div><div className="dining-art-icon icon-food"><Utensils size={27}/></div><span className="dining-art-caption">LOCAL TABLE · BLACK SEA</span></div>
      </div>
      <div className="dining-hero-bottom"><span>{bg ? "КАФЕНЕТА · РЕСТОРАНТИ · НОЩЕН ЖИВОТ" : "CAFÉS · RESTAURANTS · NIGHTLIFE"}</span><a href="#dining-places">{bg ? "ПРЕВЪРТИ НАДОЛУ" : "SCROLL TO EXPLORE"}<ArrowDown size={14}/></a></div>
    </section>
    <section id="dining-places" className="dining-content-shell"><div className="dining-section-heading"><div><p className="dining-overline">{bg ? "ПОДБРАНО ЗА ТЕБ" : "A CURATED SHORTLIST"}</p><h2>{bg ? "Къде сядаме?" : "Where shall we sit?"}</h2></div><p>{bg ? "Места за бавна сутрин, дълга вечеря и нощ, която не бърза да свърши." : "For slow mornings, long dinners and nights in no hurry to end."}</p></div><DiningExplorer locale={locale} initialCategory={initial} googlePhotosEnabled={Boolean(process.env.GOOGLE_PLACES_API_KEY)}/></section>
  </div>;
}
