import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Landmark, Locale } from "@/types/content";

export function PlaceCard({ item, locale, index = 1 }: { item: Landmark; locale: Locale; index?: number }) {
  const t = item.translations[locale]; const image = item.images[0];
  return <article className="place-card">
    <Link className="place-image" href={`/${locale}/places/${item.slug}`}>
      {image ? <Image src={image.path} alt={t.name} fill sizes="(max-width: 760px) 90vw, 33vw"/> : <div className="image-fallback"><span>0{index}</span><i>42° N / 27° E</i></div>}
      <span className="place-number">0{index}</span>
    </Link>
    <div className="place-card-body"><span className="place-area"><MapPin size={14}/>{item.area}</span><h3><Link href={`/${locale}/places/${item.slug}`}>{t.name}</Link></h3><p>{t.short}</p><Link className="text-link" href={`/${locale}/places/${item.slug}`}>{locale === "bg" ? "Открий историята" : "Discover the story"}<ArrowUpRight size={16}/></Link></div>
  </article>;
}
