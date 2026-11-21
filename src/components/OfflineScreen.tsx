"use client";
import {useState} from "react";
import Link from "next/link";
import {OfflineStories} from "./OfflineStories";
export function OfflineScreen(){
 const [locale,setLocale]=useState<"bg"|"en">("bg");const bg=locale==="bg";
 return <main className="offline" lang={locale}><div className="shell"><button className="button secondary" onClick={()=>setLocale(bg?"en":"bg")}>{bg?"English":"Български"}</button><p className="eyebrow">{bg?"Без връзка":"Offline"}</p><h1 className="display">{bg?"Историите те чакат.":"Your stories await."}</h1><p>{bg?"Картата и новите места изискват интернет.":"Maps and new places require internet."}</p><Link className="button" href={`/${locale}`}>{bg?"Опитай отново":"Try again"}</Link><OfflineStories locale={locale}/></div></main>;
}
