"use client";
import {useEffect,useState,useSyncExternalStore} from "react";
import {usePathname} from "next/navigation";

const id=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const configured=Boolean(id&&/^G-[A-Z0-9]+$/.test(id));
const preferenceKey="discover-burgas-analytics";
declare global { interface Window { dataLayer?: unknown[]; discoverGtag?: (...args:unknown[])=>void; } }
function subscribe(callback:()=>void){window.addEventListener("storage",callback);window.addEventListener("analytics-preference",callback);return()=>{window.removeEventListener("storage",callback);window.removeEventListener("analytics-preference",callback);};}
function snapshot(){try{return localStorage.getItem(preferenceKey)==="yes";}catch{return false;}}

export function AnalyticsPreference({locale}:{locale:"bg"|"en"}){
 const enabled=useSyncExternalStore(subscribe,snapshot,()=>false);const [ready,setReady]=useState(false);const pathname=usePathname();const bg=locale==="bg";
 useEffect(()=>{
  if(!configured)return;
  Object.assign(window,{[`ga-disable-${id}`]:!enabled});
  if(!enabled){window.discoverGtag?.("consent","update",{analytics_storage:"denied"});return;}
  window.dataLayer??=[];
  // Google's queue consumes the Arguments object used by the official gtag snippet.
  // eslint-disable-next-line prefer-rest-params
  window.discoverGtag??=function(){window.dataLayer!.push(arguments);};
  window.discoverGtag("consent","default",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
  window.discoverGtag("js",new Date());
  window.discoverGtag("config",id,{send_page_view:false,page_location:location.origin+location.pathname,page_referrer:"",allow_google_signals:false,allow_ad_personalization_signals:false});
  const script=document.createElement("script");script.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;script.async=true;script.onload=()=>setReady(true);document.head.append(script);
  return()=>{script.remove();};
 },[enabled]);
 useEffect(()=>{
  if(ready&&enabled)window.discoverGtag?.("event","page_view",{page_location:location.origin+pathname,page_referrer:"",page_title:document.title});
 },[ready,enabled,pathname]);
 if(!configured)return null;
 function choose(value:boolean){
  try{localStorage.setItem(preferenceKey,value?"yes":"no");}catch{return;}
  if(!value){
   window.discoverGtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
   for(const cookie of document.cookie.split(";")){const name=cookie.split("=")[0].trim();if(!/^_ga(?:_|$)/.test(name))continue;document.cookie=`${name}=; Max-Age=0; path=/`;const parts=location.hostname.split(".");for(let i=0;i<parts.length-1;i++)document.cookie=`${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join(".")}`;}
   location.reload();
  }else window.dispatchEvent(new Event("analytics-preference"));
 }
 return <section className="analytics-preference" aria-label={bg?"Незадължителна статистика":"Optional analytics"}><p>{bg?"Незадължителна Google Analytics статистика — само с твое разрешение.":"Optional Google Analytics statistics — only with your permission."}</p><button className="button secondary" onClick={()=>choose(!enabled)}>{enabled?(bg?"Изключи статистиката":"Disable analytics"):(bg?"Разреши статистика":"Allow analytics")}</button>{!enabled&&<span>{bg?"В момента е изключена.":"Currently off."}</span>}</section>;
}
