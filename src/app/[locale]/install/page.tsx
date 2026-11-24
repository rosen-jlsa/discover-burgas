import {notFound} from "next/navigation";
import {isLocale} from "@/types/content";
import {InstallApp} from "@/components/InstallApp";
import {OfflineStories} from "@/components/OfflineStories";
export function generateStaticParams(){return [{locale:"bg"},{locale:"en"}];}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))return {};return {title:locale==="bg"?"Инсталиране и офлайн истории":"Install and offline stories",description:locale==="bg"?"Инсталирай Открий Бургас на телефона или компютъра си и запази културни истории за четене без интернет.":"Install Discover Burgas on your phone or computer and save cultural stories to read offline.",alternates:{canonical:`/${locale}/install`,languages:{"bg-BG":"/bg/install",en:"/en/install"}}};}
export default async function InstallPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();const bg=locale==="bg";
 const instructions=bg?[
 ["Android","В Chrome отвори менюто ⋮ → „Инсталиране на приложението“ или „Добавяне към началния екран“."],
 ["iPhone и iPad","В Safari отвори „Споделяне“ → „Добавяне към началния екран“. Ако има избор „Отвори като уеб приложение“, остави го включен."],
 ["Windows и Linux","В поддържан Chrome или Edge използвай иконата за инсталиране в адресната лента или менюто на браузъра. В други браузъри отвори сайта нормално."],
 ["macOS","В Safari избери File → Add to Dock. В Chrome или Edge използвай менюто за инсталиране, ако е налично."]
 ]:[
 ["Android","In Chrome, open ⋮ → Install app or Add to Home screen."],
 ["iPhone and iPad","In Safari, open Share → Add to Home Screen. If offered, keep Open as Web App enabled."],
 ["Windows and Linux","In supported Chrome or Edge, use the install icon in the address bar or the browser menu. Other browsers can still open the website."],
 ["macOS","In Safari, choose File → Add to Dock. In Chrome or Edge, use the install menu if available."]];
 return <div className="shell install-page"><p className="eyebrow">DISCOVER BURGAS</p><h1>{bg?"Бургас. На твоя екран.":"Burgas. On your screen."}</h1><p>{bg?"Един гид на телефон, таблет и компютър. Без регистрация.":"One guide for phone, tablet and desktop. No account needed."}</p><InstallApp locale={locale}/><div className="install-grid">{instructions.map(([title,text])=><article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div><section><h2>{bg?"Как се обновява":"How updates work"}</h2><p>{bg?"Проверката за нова версия става при отваряне и връщане в приложението. Когато обновяването е готово, избери „Обнови“. Запазените любими и изтеглени истории остават на устройството. За ново съдържание е нужна интернет връзка.":"The app checks for updates when opened or resumed. When an update is ready, choose Update. Favorites and downloaded stories remain on your device. New content requires an internet connection."}</p></section><OfflineStories locale={locale}/></div>;
}
