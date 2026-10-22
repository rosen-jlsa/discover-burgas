"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Languages, Menu } from "lucide-react";
import type { Locale } from "@/types/content";
import { copy } from "@/lib/ui";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locale === "bg" ? "en" : "bg";
  const otherPath = pathname.replace(/^\/(bg|en)/, `/${other}`);
  const t = copy[locale];
  return <header className="site-header">
    <div className="shell header-inner">
      <Link className="brand" href={`/${locale}`} aria-label={locale === "bg" ? "Открий Бургас — начало" : "Discover Burgas — home"}>
        <span className="brand-mark"><Compass size={20}/></span><span>ОТКРИЙ<br/><b>БУРГАС</b></span>
      </Link>
      <nav className="desktop-nav" aria-label={locale === "bg" ? "Основна навигация" : "Primary navigation"}>
        <Link href={`/${locale}`}>{t.navHome}</Link><Link href={`/${locale}/map`}>{t.navMap}</Link>
        <Link href={`/${locale}/story`}>{locale === "bg" ? "История" : "Story"}</Link><Link href={`/${locale}/routes/burgas-centre-stories`}>{t.navRoute}</Link><Link href={`/${locale}/places/arena-burgas`}>Burgas 2027</Link><Link href={`/${locale}/demo`}>{t.navDemo}</Link>
      </nav>
      <div className="header-actions">
        <Link className="language" href={otherPath}><Languages size={17}/>{other.toUpperCase()}</Link>
        <details className="mobile-menu"><summary aria-label={locale === "bg" ? "Отвори меню" : "Open menu"}><Menu/></summary><nav>
          <Link href={`/${locale}`}>{t.navHome}</Link><Link href={`/${locale}/map`}>{t.navMap}</Link><Link href={`/${locale}/story`}>{locale === "bg" ? "История" : "Story"}</Link>
          <Link href={`/${locale}/routes/burgas-centre-stories`}>{t.navRoute}</Link><Link href={`/${locale}/places/arena-burgas`}>Burgas 2027</Link><Link href={`/${locale}/demo`}>{t.navDemo}</Link>
        </nav></details>
      </div>
    </div>
  </header>;
}
