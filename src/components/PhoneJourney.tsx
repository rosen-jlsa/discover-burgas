"use client";

import { useState } from "react";
import { BookOpenText, MapPinned, Navigation, QrCode, ScanLine } from "lucide-react";
import type { Locale } from "@/types/content";

const flags = ["bg", "it", "es", "fr", "de", "gr", "se", "fi", "pt", "ua", "ie", "no", "nl", "ch"];

export function PhoneJourney({ locale }: { locale: Locale }) {
  const isBg = locale === "bg";
  const [active, setActive] = useState(0);
  const steps = [
    { icon: ScanLine, title: isBg ? "Сканирай знака" : "Scan the sign", text: isBg ? "Камерата отваря точната забележителност — без инсталация." : "Your camera opens the exact landmark — no installation.", label: isBg ? "QR вход" : "QR entry" },
    { icon: BookOpenText, title: isBg ? "Открий историята" : "Discover the story", text: isBg ? "Получаваш кратък разказ, проверени факти и източници." : "Get a concise story, verified facts and sources.", label: isBg ? "История" : "Story" },
    { icon: MapPinned, title: isBg ? "Виж какво е наблизо" : "See what is nearby", text: isBg ? "Картата предлага реални места според разстоянието." : "The map suggests real places based on distance.", label: isBg ? "Карта" : "Map" },
    { icon: Navigation, title: isBg ? "Продължи с любимата карта" : "Continue in your maps app", text: isBg ? "Избираш Google Maps, Apple Maps или Waze за следващата спирка." : "Choose Google Maps, Apple Maps or Waze for the next stop.", label: isBg ? "Маршрут" : "Route" },
  ];

  return <section className="phone-guide-section" aria-labelledby="phone-guide-title">
    <div className="flag-stream flag-stream-top" aria-hidden="true"><div className="flag-track">{[...flags,...flags].map((flag,index)=><span className={`flag-${flag}`} key={`${flag}-${index}`}/>)}</div></div>
    <div className="shell phone-guide-grid">
      <div className="phone-guide-copy"><p className="eyebrow">{isBg ? "Просто като едно движение" : "As simple as one gesture"}</p><h2 className="display" id="phone-guide-title">{isBg ? "Градът е вече в телефона ти." : "The city is already in your phone."}</h2><p>{isBg ? "Четири ясни стъпки превръщат QR кода в културна разходка. Избери стъпка, за да видиш как работи." : "Four clear steps turn a QR code into a cultural walk. Choose a step to see how it works."}</p><div className="phone-guide-steps" role="tablist" aria-label={isBg ? "Стъпки в мобилния гид" : "Mobile guide steps"}>{steps.map((step,index)=>{const Icon=step.icon;return <button type="button" role="tab" aria-selected={active===index} className={active===index?"active":""} onClick={()=>setActive(index)} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} key={step.title}><span>{String(index+1).padStart(2,"0")}</span><Icon size={21}/><div><strong>{step.title}</strong><small>{step.text}</small></div></button>})}</div><small className="flag-disclaimer">{isBg ? "Флаговете са илюстрация на европейските гости, а не потвърден списък с участници." : "Flags illustrate European visitors; they are not a confirmed participant list."}</small></div>
      <div className="phone-stage" aria-live="polite">
        <div className="phone-glow" aria-hidden="true"/>
        <div className="phone-shell"><div className="phone-island"/><div className="phone-status"><span>9:41</span><span>● ▰</span></div><div className="phone-screen" key={active}>
          <div className="phone-app-head"><div className="mini-brand"><QrCode size={18}/><b>{isBg ? "ОТКРИЙ" : "DISCOVER"}</b></div><span>{steps[active].label}</span></div>
          {active===0&&<div className="phone-scan"><div className="scan-window"><i/><i/><i/><i/><div className="scan-line"/><QrCode size={86}/></div><strong>{isBg ? "Насочи камерата към QR кода" : "Point your camera at the QR code"}</strong><small>{isBg ? "Страницата се отваря директно в браузъра." : "The page opens directly in your browser."}</small></div>}
          {active===1&&<div className="phone-story"><div className="phone-photo"/><p>{isBg ? "ТУРИСТИЧЕСКИ КОМПЛЕКС" : "VISITOR SITE"}</p><h3>{isBg ? "Акве Калиде" : "Aquae Calidae"}</h3><small>{isBg ? "Място, познато с минералните си извори от древността…" : "A place known for its mineral springs since antiquity…"}</small><div className="fact-pill">{isBg ? "Проверено · 2 източника" : "Verified · 2 sources"}</div></div>}
          {active===2&&<div className="phone-map"><div className="mini-map"><div className="mini-street a"/><div className="mini-street b"/><div className="mini-water"/><span className="mini-pin p1">1</span><span className="mini-pin p2">2</span><span className="mini-pin p3">3</span></div><h3>{isBg ? "Наблизо до теб" : "Near you"}</h3><div className="mini-place"><b>{isBg ? "Археологически музей" : "Archaeological Museum"}</b><span>280 m</span></div><div className="mini-place"><b>{isBg ? "Часовника" : "The Burgas Clock"}</b><span>420 m</span></div></div>}
          {active===3&&<div className="phone-route"><div className="route-badge"><Navigation/><span>{isBg ? "Следваща спирка" : "Next stop"}</span></div><h3>{isBg ? "Катедрален храм „Св. св. Кирил и Методий“" : "Saints Cyril and Methodius Cathedral"}</h3><small>{isBg ? "Избери приложение за упътване" : "Choose an app for directions"}</small><button>Google Maps <span>↗</span></button><button>Apple Maps <span>↗</span></button><button>Waze <span>↗</span></button></div>}
        </div><div className="phone-home"/></div>
      </div>
    </div>
    <div className="flag-stream flag-stream-bottom" aria-hidden="true"><div className="flag-track reverse">{[...flags,...flags].map((flag,index)=><span className={`flag-${flag}`} key={`${flag}-bottom-${index}`}/>)}</div></div>
  </section>;
}
