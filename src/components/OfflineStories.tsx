"use client";
import { useEffect,useRef,useState } from "react";
import Link from "next/link";
import { listOfflineStories,removeOfflineStory,saveOfflineStory,type OfflineStory } from "@/lib/offline-library";

export function SaveOffline({slug,locale}:{slug:string;locale:"bg"|"en"}){
  const [state,setState]=useState<"idle"|"saving"|"saved"|"error">("idle");const bg=locale==="bg";
  return <div className="offline-save"><button className="button secondary" disabled={state==="saving"} onClick={async()=>{setState("saving");try{await saveOfflineStory(slug,locale);setState("saved");}catch{setState("error");}}}>{state==="saving"?(bg?"Изтегляне…":"Downloading…"):state==="saved"?(bg?"Запазено за офлайн":"Saved offline"):(bg?"Запази за офлайн":"Save offline")}</button><p role="status">{state==="saved"?<Link href="/offline">{bg?"Отвори изтеглените истории":"Open downloaded stories"}</Link>:state==="error"?(bg?"Не успяхме да запазим историята. Провери връзката и свободното място в браузъра.":"Could not save the story. Check your connection and browser storage."):null}</p></div>;
}
function SavedPhoto({story}:{story:OfflineStory}){
  const image=useRef<HTMLImageElement>(null);
  useEffect(()=>{if(!story.photo||!image.current)return;const value=URL.createObjectURL(story.photo);image.current.src=value;return()=>URL.revokeObjectURL(value);},[story]);
  // Offline blobs cannot go through the server image optimizer.
  // eslint-disable-next-line @next/next/no-img-element
  return story.photo?<img ref={image} className="offline-story-photo" alt={story.name}/>:null;
}
export function OfflineStories({locale="bg"}:{locale?:"bg"|"en"}){
  const [stories,setStories]=useState<OfflineStory[]>([]);const [state,setState]=useState("loading");const bg=locale==="bg";
  useEffect(()=>{listOfflineStories().then(items=>{setStories(items);setState("ready");}).catch(()=>setState("error"));},[]);
  return <section className="offline-library"><h2>{bg?"Изтеглени истории":"Downloaded stories"}</h2><p>{bg?"Текстът и снимките са на това устройство. Картите, упътванията и актуалните данни изискват интернет. Браузърът може да освободи това място.":"Text and photos are stored on this device. Maps, directions and current information require internet. Your browser may clear this storage."}</p>{state==="loading"?<p role="status">{bg?"Зареждане…":"Loading…"}</p>:state==="error"?<p role="status">{bg?"Офлайн паметта е недостъпна. Опитай в обикновен прозорец на браузъра.":"Offline storage is unavailable. Try a regular browser window."}</p>:!stories.length?<p>{bg?"Още няма изтеглени истории. Отвори забележителност онлайн и избери „Запази за офлайн“.":"No downloaded stories yet. Open a place online and choose Save offline."}</p>:stories.map(story=><details className="offline-story" key={story.key}><summary>{story.name} · {story.locale.toUpperCase()}</summary><SavedPhoto story={story}/><p className="image-credit">{story.attribution}</p><p>{story.description}</p><p>{story.history}</p><ul>{story.facts.map(fact=><li key={fact}>{fact}</li>)}</ul><h3>{bg?"Източници":"Sources"}</h3><ul>{story.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a> · {source.publisher}</li>)}</ul><p>{bg?"Изтеглено на":"Downloaded"} {new Date(story.savedAt).toLocaleDateString(story.locale)}</p><div className="install-actions"><Link href={`/${story.locale}/places/${story.slug}`}>{bg?"Онлайн страница":"Online page"}</Link><button className="button secondary" onClick={async()=>{try{await removeOfflineStory(story.key);setStories(items=>items.filter(item=>item.key!==story.key));}catch{setState("error");}}}>{bg?"Изтрий от устройството":"Remove from device"}</button></div></details>)}</section>;
}
