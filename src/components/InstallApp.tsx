"use client";
import {useEffect,useState} from "react";
type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export function InstallApp({locale}:{locale:"bg"|"en"}){
  const [prompt,setPrompt]=useState<InstallEvent|null>(null);const [installed,setInstalled]=useState(false);const [message,setMessage]=useState("");const bg=locale==="bg";
  useEffect(()=>{
    const query=matchMedia("(display-mode: standalone)");
    const update=()=>setInstalled(query.matches||Boolean((navigator as Navigator&{standalone?:boolean}).standalone));
    const before=(event:Event)=>{event.preventDefault();setPrompt(event as InstallEvent);};
    const done=()=>{setInstalled(true);setPrompt(null);};
    update();query.addEventListener("change",update);window.addEventListener("beforeinstallprompt",before);window.addEventListener("appinstalled",done);
    return()=>{query.removeEventListener("change",update);window.removeEventListener("beforeinstallprompt",before);window.removeEventListener("appinstalled",done);};
  },[]);
  return <div className="install-action-card">{installed?<p role="status">{bg?"Приложението е отворено в инсталиран режим.":"The app is running in installed mode."}</p>:prompt?<button className="button" onClick={async()=>{try{await prompt.prompt();const choice=await prompt.userChoice;setMessage(choice.outcome==="accepted"?(bg?"Инсталирането е заявено.":"Installation requested."):(bg?"Можеш да инсталираш и по-късно.":"You can install later."));setPrompt(null);}catch{setMessage(bg?"Използвай менюто на браузъра, за да инсталираш.":"Use the browser menu to install.");}}}>{bg?"Инсталирай Discover Burgas":"Install Discover Burgas"}</button>:<p>{bg?"Използвай менюто на браузъра според инструкциите по-долу. Ако инсталирането не се поддържа, сайтът продължава да работи в браузъра.":"Use your browser menu with the instructions below. If installation is unavailable, the website still works in your browser."}</p>}<p role="status">{message}</p></div>;
}
