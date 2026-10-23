import Link from "next/link";
import { Compass } from "lucide-react";
import { notFound } from "next/navigation";
import { loadLandmark } from "@/lib/backend";
import { isLocale } from "@/types/content";

export default async function SignPage({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;if(!isLocale(locale))notFound();const item=await loadLandmark(slug);if(!item)notFound();const t=item.translations[locale];return <div className="sign-page"><article className="print-sign"><div className="sign-brand"><span>ОТКРИЙ БУРГАС</span><Compass size={32}/></div><h1>{t.name}</h1><p>{t.short}</p><div className="sign-body"><div><p><strong>{locale==="bg"?"Сканирай и открий историята на това място.":"Scan and discover the story of this place."}</strong></p><small>discover-burgas · /places/{slug}</small></div><img src={`/api/qr/${slug}?format=svg`} alt={`QR — ${t.name}`}/></div><p className="sign-disclaimer">{locale==="bg"?"Демонстрационна концепция за конкурс. Този знак не е представен като инсталирана общинска инфраструктура.":"Competition demonstration concept. This sign is not presented as installed municipal infrastructure."}</p><Link className="text-link sign-disclaimer" href={`/${locale}/places/${slug}`}>← {locale==="bg"?"Към страницата":"Back to place"}</Link></article></div>}
