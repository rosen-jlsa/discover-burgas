import Link from "next/link";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  return <footer className="footer"><div className="shell footer-grid">
    <div><div className="footer-brand">ОТКРИЙ БУРГАС</div><p>{locale === "bg" ? "Всяко място разказва история." : "Every place has a story."}</p></div>
    <div><p className="eyebrow">{locale === "bg" ? "Разгледай" : "Explore"}</p><Link href={`/${locale}/map`}>{locale === "bg" ? "Карта и места" : "Map and places"}</Link><Link href={`/${locale}/demo`}>{locale === "bg" ? "QR демонстрация" : "QR demonstration"}</Link></div>
    <div><p className="eyebrow">{locale === "bg" ? "Важно" : "Important"}</p><p>{locale === "bg" ? "Независим конкурсен прототип. Не представлява Община Бургас." : "Independent competition prototype. Not an official Burgas Municipality service."}</p></div>
  </div><div className="shell footer-bottom"><span>© 2026 Discover Burgas</span><span>{locale === "bg" ? "Данните са проверени към 22.10.2026 г." : "Data checked on 22 Oct 2026."}</span></div></footer>;
}
