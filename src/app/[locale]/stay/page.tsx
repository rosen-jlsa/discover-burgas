import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Compass, MapPin, Route, Waves } from "lucide-react";
import { notFound } from "next/navigation";
import { StaySearchPanel } from "@/components/StaySearchPanel";
import { isLocale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "bg" ? "Нощувки в Бургас — планирай престоя си" : "Places to stay in Burgas — plan your stay",
    description: locale === "bg" ? "Избери дати и гости, сравни търсенията в Booking.com и Airbnb и планирай културния си маршрут в Бургас." : "Choose dates and guests, compare searches on Booking.com and Airbnb, and plan your cultural route in Burgas.",
    alternates: { canonical: `/${locale}/stay`, languages: { "bg-BG": "/bg/stay", en: "/en/stay" } },
  };
}

export default async function StayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const bg = locale === "bg";

  return <div className="stay-page">
    <section className="stay-hero">
      <div className="stay-hero-copy"><p className="stay-eyebrow"><Waves size={15}/>{bg ? "ОЩЕ ЕДИН ДЕН КРАЙ МОРЕТО" : "ONE MORE DAY BY THE SEA"}</p><h1>{bg ? <>Остани.<br/><em>Откривай.</em></> : <>Stay.<br/><em>Discover.</em></>}</h1><p className="stay-hero-intro">{bg ? "Намери място за престой, остави багажа и тръгни към историите на Бургас." : "Find a place to stay, drop your bags and set out for the stories of Burgas."}</p><a className="stay-hero-cta" href="#stay-search">{bg ? "Планирай престоя" : "Plan your stay"}<ArrowDownRight size={18}/></a><div className="stay-hero-index"><span>BURGAS / BLACK SEA</span><span>01 — 03</span></div></div>
      <figure className="stay-hero-image"><Image src="/images/island.jpg" alt={bg ? "Остров Света Анастасия в Бургаския залив" : "St. Anastasia Island in Burgas Bay"} fill priority sizes="(max-width: 760px) 100vw, 52vw"/><div className="stay-image-wash"/><figcaption><span>{bg ? "ПОВЕЧЕ ВРЕМЕ ЗА ОТКРИТИЯ" : "MORE TIME TO DISCOVER"}<strong>{bg ? "Бургаски залив" : "Burgas Bay"}</strong></span><a href="https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg" target="_blank" rel="noreferrer">EvelinaRibarova · CC BY-SA 4.0 <ArrowUpRight size={14}/></a></figcaption><div className="stay-photo-stamp"><Compass size={19}/><span>42°29′ N<br/>27°28′ E</span></div></figure>
    </section>

    <section id="stay-search" className="stay-planner-shell"><div className="stay-section-heading"><div><p className="stay-eyebrow"><span>01</span>{bg ? "ПЛАНИРАЙ СВОЯТА ПАУЗА" : "PLAN YOUR PAUSE"}</p><h2>{bg ? <>Твоите дати.<br/>Твоят Бургас.</> : <>Your dates.<br/>Your Burgas.</>}</h2></div><p>{bg ? "Задай датите и броя гости. Ще отворим търсенето в избраната платформа, където можеш да сравниш наличностите и условията." : "Set your dates and guest count. We’ll open your search on the platform you choose, where you can compare availability and terms."}</p></div><StaySearchPanel locale={locale}/></section>

    <section className="stay-route-band"><div className="stay-route-symbol"><Route size={27}/><span>02</span></div><div className="stay-route-copy"><p className="stay-eyebrow">{bg ? "ИЗЛЕЗ ОТВЪН СТАЯТА" : "STEP OUTSIDE"}</p><h2>{bg ? "Бургас е част от престоя." : "Make Burgas part of the stay."}</h2><p>{bg ? "Свържи мястото, където нощуваш, с историите, музеите и морския бряг. Избери следващата спирка от културната карта." : "Connect your stay with the city’s stories, museums and seafront. Choose your next stop on the cultural map."}</p><div className="stay-route-links"><Link href={`/${locale}/routes/burgas-centre-stories`}>{bg ? "Разгледай централния маршрут" : "Explore the central route"}<ArrowUpRight size={17}/></Link><Link href={`/${locale}/map`}>{bg ? "Отвори картата" : "Open the map"}<MapPin size={17}/></Link></div></div><div className="stay-route-steps" aria-label={bg ? "Културен маршрут" : "Cultural route"}><span><i>01</i>{bg ? "Настани се" : "Check in"}</span><b/><span><i>02</i>{bg ? "Разходи се" : "Explore"}</span><b/><span><i>03</i>{bg ? "Остани още" : "Stay longer"}</span></div></section>

    <p className="stay-disclosure">{bg ? "„Открий Бургас“ не приема резервации или плащания и не е свързан с Booking.com или Airbnb. Външните платформи предоставят актуалните цени, наличности и условия." : "Discover Burgas does not accept bookings or payments and is not affiliated with Booking.com or Airbnb. The external platforms provide current prices, availability and terms."}</p>
  </div>;
}
