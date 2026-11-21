"use client";
import { useEffect,useState } from "react";
export function ServiceWorker() {
 const [waiting,setWaiting]=useState<ServiceWorker|null>(null);const [error,setError]=useState(false);const [bg,setBg]=useState(true);
 useEffect(()=>{
  if(!("serviceWorker" in navigator)||process.env.NODE_ENV!=="production")return;
  let registration:ServiceWorkerRegistration|undefined;let disposed=false;let activating=false;
  const language=()=>setBg(!location.pathname.startsWith("/en"));
  const changed=()=>{if(activating)location.reload();};
  const update=()=>{language();if(document.visibilityState==="visible")registration?.update().catch(()=>undefined);};
  language();
  navigator.serviceWorker.register("/sw.js",{updateViaCache:"none"}).then(result=>{
   if(disposed)return;registration=result;
   if(result.waiting)setWaiting(result.waiting);
   result.addEventListener("updatefound",()=>{
    const worker=result.installing;if(!worker)return;
    worker.addEventListener("statechange",()=>{if(!disposed&&worker.state==="installed"&&navigator.serviceWorker.controller)setWaiting(worker);});
   });
   result.update().catch(()=>undefined);
  }).catch(()=>{if(!disposed)setError(true);});
  const activate=()=>{activating=true;};
  window.addEventListener("pwa-activate",activate);window.addEventListener("pageshow",update);document.addEventListener("visibilitychange",update);navigator.serviceWorker.addEventListener("controllerchange",changed);
  return()=>{disposed=true;window.removeEventListener("pwa-activate",activate);window.removeEventListener("pageshow",update);document.removeEventListener("visibilitychange",update);navigator.serviceWorker.removeEventListener("controllerchange",changed);};
 },[]);
 if(!waiting&&!error)return null;
 return <aside className="pwa-update" aria-label={bg?"Обновяване на приложението":"App update"}><p role="status">{error?(bg?"Офлайн режимът не успя да се подготви. Сайтът остава достъпен онлайн.":"Offline mode could not be prepared. The website remains available online."):(bg?"Има нова версия на Discover Burgas.":"A new Discover Burgas version is ready.")}</p>{waiting&&<button className="button" onClick={()=>{window.dispatchEvent(new Event("pwa-activate"));waiting.postMessage({type:"ACTIVATE_UPDATE"});}}>{bg?"Обнови":"Update"}</button>}<button className="button secondary" onClick={()=>{setWaiting(null);setError(false);}}>{bg?"По-късно":"Later"}</button></aside>;
}
