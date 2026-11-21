"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpenText, MapPinned, Navigation, QrCode, ScanLine, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types/content";
export function PhoneJourney({locale}:{locale:Locale}) {
  const bg=locale==="bg";const [active,setActive]=useState(0);const section=useRef<HTMLElement>(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const element=section.current;
      if(!element)return;
      const bounds=element.getBoundingClientRect();
      const travel=Math.max(1,bounds.height-window.innerHeight);
      const progress=Math.max(0,Math.min(1,-bounds.top/travel));
      setActive(Math.min(3,Math.floor(progress*4)));
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    return()=>{window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);cancelAnimationFrame(frame);};
  },[]);
  const steps=[
    {Icon:ScanLine,title:bg?"Сканирай знака":"Scan the sign",text:bg?"Един QR код отваря точното място.":"One QR code opens the exact place."},
    {Icon:BookOpenText,title:bg?"Открий историята":"Discover the story",text:bg?"Кратък разказ, факти и източници.":"A concise story, facts and sources."},
    {Icon:MapPinned,title:bg?"Виж какво е наблизо":"See what is nearby",text:bg?"Избери следващата си спирка.":"Choose your next stop."},
    {Icon:Navigation,title:bg?"Продължи с любимата карта":"Continue in your maps app",text:bg?"Отвори упътване в избраното приложение.":"Open directions in your chosen app."}
  ];
  const destination=encodeURIComponent("Archaeological Museum Burgas Bulgaria");
  return <section ref={section} className="phone-guide-section scroll-journey" data-active-step={active} aria-labelledby="phone-guide-title"><div className="shell phone-guide-grid"><div className="phone-guide-copy"><p className="eyebrow">{bg?"От знака до следващата история":"From the sign to the next story"}</p><h2 className="display" id="phone-guide-title">{bg?"Градът е вече в телефона ти.":"The city is already in your phone."}</h2><p>{bg?"Продължи надолу и проследи пътя от QR кода до разходката. Без инсталация и регистрация.":"Scroll to follow the journey from QR code to walk. No installation or account."}</p><ol className="phone-guide-steps" aria-label={bg?"Стъпки в мобилния гид":"Mobile guide steps"}>{steps.map(({Icon,title,text},i)=><li id={`journey-step-${i}`} aria-current={active===i?"step":undefined} key={title} className={active===i?"active":""}><span>0{i+1}</span><Icon size={21}/><div><strong>{title}</strong><small>{text}</small></div></li>)}</ol><span className="journey-scroll-hint">↓ {bg?"Скролни, за да продължиш":"Scroll to continue"}</span></div><div className="phone-stage"><div className="journey-orbit" aria-hidden="true"/><div className="phone-shell"><div className="phone-island"/><div className="phone-status" aria-hidden="true"><span>9:41</span><span>● ▰</span></div><div className="phone-screen" role="region" id="journey-panel" aria-labelledby={`journey-step-${active}`}><div className="phone-app-head"><span className="mini-brand"><QrCode size={18}/><b>{bg?"ОТКРИЙ":"DISCOVER"}</b></span><span>0{active+1} / 04</span></div>
  {active===0&&<div className="phone-scan"><div className="scan-window"><i/><i/><i/><i/><div className="scan-line"/><Image src="/api/qr/archaeological-museum?format=svg" unoptimized alt={bg?"QR код за Археологическия музей":"QR code for the Archaeological Museum"} width={165} height={165}/></div><strong>{bg?"Сканирай и открий":"Scan and discover"}</strong><small>{bg?"Кодът отваря страницата на музея.":"The code opens the museum page."}</small><Link className="phone-link" href={`/${locale}/places/archaeological-museum`}>{bg?"Или отвори тук":"Or open here"}<ArrowUpRight size={15}/></Link></div>}
  {active===1&&<div className="phone-story"><div className="phone-photo"><Image src="/images/archaeological.jpg" fill sizes="300px" alt={bg?"Археологически музей — Бургас":"Archaeological Museum — Burgas"}/></div><p>{bg?"МУЗЕИТЕ НА БУРГАС":"BURGAS MUSEUMS"}</p><h3>{bg?"Археологически музей":"Archaeological Museum"}</h3><small>{bg?"Открий най-ранната история на Бургаския залив.":"Discover the earliest history of Burgas Bay."}</small><Link className="phone-link" href={`/${locale}/places/archaeological-museum`}>{bg?"Прочети историята":"Read the story"}<ArrowUpRight size={15}/></Link></div>}
  {active===2&&<div className="phone-map"><div className="mini-map" aria-hidden="true"><div className="mini-street a"/><div className="mini-street b"/><div className="mini-water"/><span className="mini-pin p1">1</span><span className="mini-pin p2">2</span><span className="mini-pin p3">3</span></div><small>{bg?"Илюстрация на стъпките, не географска карта":"Journey illustration, not a geographic map"}</small><h3>{bg?"Наблизо до теб":"Near you"}</h3><Link className="phone-link" href={`/${locale}/map`}>{bg?"Отвори реалната карта":"Open the real map"}<ArrowUpRight size={15}/></Link></div>}
  {active===3&&<div className="phone-route"><div className="route-badge"><Navigation/></div><h3>{bg?"Към музея.":"To the museum."}</h3><small>{bg?"Избери приложение. Външният сайт ще ти помогне с упътването.":"Choose an app. The external site will help with directions."}</small><a href={`https://www.google.com/maps/dir/?api=1&destination=${destination}`} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={16}/></a><a href={`https://maps.apple.com/?daddr=${destination}`} target="_blank" rel="noreferrer">Apple Maps <ArrowUpRight size={16}/></a><a href={`https://waze.com/ul?q=${destination}&navigate=yes`} target="_blank" rel="noreferrer">Waze <ArrowUpRight size={16}/></a></div>}
  </div><div className="phone-home"/></div></div></div></section>;
}
