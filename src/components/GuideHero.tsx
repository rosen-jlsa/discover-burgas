import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Compass, Map, ScanLine } from "lucide-react";
import type { Locale } from "@/types/content";
import { FavoriteButton } from "@/components/FavoriteButton";

export function GuideHero({ locale }: { locale: Locale }) {
  const bg = locale === "bg";

  return (
    <section className="aevo-hero" aria-labelledby="aevo-hero-title">
      <div className="aevo-hero-meta">
        <span>{bg ? "КУЛТУРЕН ГИД · БУРГАС" : "CULTURAL GUIDE · BURGAS"}</span>
        <Link href={`/${locale}/install`}><span className="host-dot" />{bg ? "ТВОЯТ ДЖОБЕН ГИД" : "YOUR POCKET GUIDE"}<ArrowUpRight size={13}/></Link>
        <span>42°29′ N &nbsp; 27°28′ E</span>
      </div>

      <div className="aevo-hero-copy">
        <p className="aevo-overline">{bg ? "ВСЕКИ ЪГЪЛ НОСИ ИСТОРИЯ" : "EVERY CORNER HAS A STORY"}</p>
        <h1 id="aevo-hero-title">{bg ? <>Градът отблизо.<br/><span>Историите навсякъде.</span></> : <>The city, closer.<br/><span>Stories everywhere.</span></>}</h1>
        <p className="aevo-hero-description">{bg ? "Сканирай. Открий историята. Намери следващото място, което си заслужава да видиш." : "Scan. Discover the story. Find the next place worth seeing."}</p>
        <div className="aevo-hero-actions">
          <Link className="aevo-cta" href={`/${locale}/map`}>{bg ? "Разгледай картата" : "Explore the map"}<ArrowUpRight size={17}/></Link>
          <Link className="aevo-quiet-link" href={`/${locale}/demo`}><ScanLine size={16}/>{bg ? "Виж как работи QR гидът" : "See how the QR guide works"}</Link>
        </div>
      </div>

      <div className="aevo-device-stage">
        <div className="aevo-glow" aria-hidden="true" />
        <div className="aevo-grid-echo" aria-hidden="true" />
        <div className="aevo-float-note aevo-note-left"><span className="aevo-note-icon"><Compass size={17}/></span><span><b>{bg ? "Море от истории" : "A sea of stories"}</b><small>{bg ? "Бургас и регионът" : "Burgas and the region"}</small></span></div>
        <div className="aevo-float-note aevo-note-right"><span className="aevo-note-icon"><ScanLine size={17}/></span><span><b>{bg ? "Сканирай и тръгни" : "Scan and go"}</b><small>{bg ? "Без инсталация" : "No installation"}</small></span></div>

        <div className="aevo-phone" role="group" aria-label={bg ? "Преглед на мобилната страница за остров Света Анастасия" : "Preview of the St. Anastasia Island mobile page"}>
          <div className="aevo-phone-screen">
            <div className="aevo-phone-status" aria-hidden="true"><span>9:41</span><span>● ▰</span></div>
            <div className="aevo-app-bar"><span className="aevo-app-mark"><Compass size={17}/></span><b>{bg ? "ОТКРИЙ" : "DISCOVER"}</b><Link href={`/${locale}/map`} aria-label={bg ? "Отвори картата" : "Open the map"}><Map size={18}/></Link></div>
            <div className="aevo-phone-greeting"><small>{bg ? "ИСТОРИЯ ОТ ЗАЛИВА" : "A STORY FROM THE BAY"}</small><span>{bg?"С лодка":"By boat"}</span></div>
            <Link className="aevo-phone-place" href={`/${locale}/places/st-anastasia-island`}>
              <div className="aevo-phone-photo"><Image src="/images/island.jpg" alt={bg ? "Остров Света Анастасия в Бургаския залив" : "St. Anastasia Island in Burgas Bay"} fill sizes="280px" priority/></div>
              <div className="aevo-phone-place-copy"><small>{bg ? "ОСТРОВ · БУРГАСКИ ЗАЛИВ" : "ISLAND · BURGAS BAY"}</small><strong>{bg ? "Света Анастасия" : "St. Anastasia"}<ArrowUpRight size={17}/></strong><span>{bg ? "Морска история, на една лодка разстояние." : "A maritime story, a boat ride away."}</span></div>
            </Link>
            <div className="aevo-phone-quick"><Link href={`/${locale}/places/st-anastasia-island`}><ScanLine size={15}/>{bg ? "Открий мястото" : "Explore this place"}<ArrowUpRight size={14}/></Link><FavoriteButton slug="st-anastasia-island" locale={locale}/></div>
            <nav className="aevo-phone-nav" aria-label={bg ? "Бърза навигация" : "Quick navigation"}><Link className="selected" href={`/${locale}/map`}><Map size={17}/><small>{bg ? "Карта" : "Map"}</small></Link><Link href={`/${locale}/routes/burgas-centre-stories`}><Compass size={17}/><small>{bg ? "Маршрут" : "Route"}</small></Link><Link href={`/${locale}/map`}><BookOpenText size={17}/><small>{bg ? "Истории" : "Stories"}</small></Link></nav>
            <div className="aevo-home-indicator" aria-hidden="true" />
          </div>
        </div>
      </div>
      <a className="aevo-scroll-cue" href="#discover-next">{bg ? "ПРЕВЪРТИ И ОТКРИЙ" : "SCROLL TO DISCOVER"}<span>↓</span></a>
    </section>
  );
}
