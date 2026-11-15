import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ArrowUpRight, Landmark, Leaf, Ship, Sparkles, TrainFront } from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale } from "@/types/content";

const sources = [
  { href: "https://www.burgas.bg/bg/istoricheska-spravka", bg: "Община Бургас — Историческа справка", en: "Burgas Municipality — Historical overview" },
  { href: "https://www.burgas.bg/bg/novini/planat-za-integrirano-razvitie-na-obshtina-burgas-2021-2027-g-be-razgledan-na-obshtestveno-obsazhdane", bg: "Община Бургас — План за интегрирано развитие 2021–2027", en: "Burgas Municipality — Integrated Development Plan 2021–2027" },
  { href: "https://www.burgasmuseums.bg/bg/about", bg: "Регионален исторически музей — Бургас", en: "Regional Historical Museum Burgas" },
];

const chapterMeta = [
  { slug: "archaeological-museum", image: "/images/archaeological.jpg", bgAlt: "Археологическото наследство на Бургаския регион", enAlt: "Archaeological heritage of the Burgas region", bgPlace: "Археологически музей", enPlace: "Archaeological Museum", Icon: Landmark },
  { slug: "aquae-calidae", image: "/images/aquae.jpg", bgAlt: "Археологическият комплекс Акве Калиде край Бургас", enAlt: "The Aquae Calidae archaeological complex near Burgas", bgPlace: "Акве Калиде", enPlace: "Aquae Calidae", Icon: Ship },
  { slug: "cathedral", image: "/images/cathedral.jpg", bgAlt: "Катедралният храм „Св. св. Кирил и Методий“ в Бургас", enAlt: "Saints Cyril and Methodius Cathedral in Burgas", bgPlace: "Катедралният храм", enPlace: "The Cathedral", Icon: TrainFront },
  { slug: "ethnographic-museum", image: "/images/ethnographic.jpg", bgAlt: "Етнографският музей в Бургас", enAlt: "The Ethnographic Museum in Burgas", bgPlace: "Етнографски музей", enPlace: "Ethnographic Museum", Icon: Sparkles },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "bg" ? "Историята на Бургас — от първите селища до днес" : "The story of Burgas — from early settlements to today",
    description: locale === "bg" ? "Проследи историческите пластове на Бургас чрез проверени източници и места, които можеш да посетиш." : "Follow Burgas through its historical layers with sourced stories and places you can visit.",
    alternates: { canonical: `/${locale}/story`, languages: { "bg-BG": "/bg/story", en: "/en/story" } },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const bg = locale === "bg";
  const chapters = bg ? [
    ["VI–V хил. пр. Хр.", "Преди града — първите селища", "На територията на днешен Бургас са познати поне шест селища от неолита и халколита. Регионът пази пластове от праисторията, античността и средновековието — включително Акве Калиде и Порос."],
    ["XIII–XVIII век", "Пиргос и черноморското пристанище", "Историческите извори свързват днешния град с името Пиргос — „кула“. През XVIII век Бургас вече е оживено пристанище, включено в черноморската търговия."],
    ["1878–1903", "План, железница, пристанище", "След Освобождението се създава първата българска община. Регулационният план от 1891 г., железницата Ямбол–Бургас от 1890 г. и модерното пристанище, открито през 1903 г., ускоряват развитието."],
    ["XX век", "Индустрия, култура, море", "Бургас се оформя като индустриален, транспортен и космополитен център. Музеи, читалища, училища, летището и пристанището разширяват ролята му далеч отвъд залива."],
  ] : [
    ["6th–5th millennia BCE", "Settlements before the city", "At least six Neolithic and Chalcolithic settlements are known within present-day Burgas. The region preserves prehistoric, ancient and medieval layers, including Aquae Calidae and Poros."],
    ["13th–18th centuries", "Pyrgos and the Black Sea port", "Historical sources connect the modern city with Pyrgos, meaning “tower”. By the 18th century Burgas was already a busy port engaged in Black Sea trade."],
    ["1878–1903", "A plan, a railway, a port", "After Bulgaria’s Liberation, the first Bulgarian municipality was established. The 1891 urban plan, the Yambol–Burgas railway opened in 1890 and the modern port opened in 1903 accelerated growth."],
    ["20th century", "Industry, culture and the sea", "Burgas developed as an industrial, transport and cosmopolitan centre. Museums, community centres, schools, the airport and port extended its role far beyond the bay."],
  ];

  return <div className="history-page">
    <section className="history-hero"><div className="shell history-hero-grid">
      <div className="history-hero-copy"><p className="history-eyebrow"><Landmark size={16}/>{bg ? "ИСТОРИЯ НА ЕДИН МОРСКИ ГРАД" : "THE STORY OF A COASTAL CITY"}</p><h1>{bg ? <>Езера.<br/>Пристанище.<br/><em>Бургас.</em></> : <>Lakes.<br/>A port.<br/><em>Burgas.</em></>}</h1><p>{bg ? "Градът не се появява изведнъж. Той се натрупва — от древни селища, търговски пътища, железница и хора, които избират да останат край морето." : "A city does not appear all at once. It gathers — from ancient settlements, trade routes, a railway and people who choose to stay by the sea."}</p><a className="history-start" href="#chapter-1">{bg ? "Започни разказа" : "Start the story"}<ArrowDown size={16}/></a><div className="history-hero-dates"><span>VI–V хил. пр. Хр.</span><i/><span>1903</span><i/><span>ДНЕС</span></div></div>
      <figure className="history-hero-photo"><Image src="/images/ethnographic.jpg" alt={bg ? "Етнографският музей — част от историческата архитектура на Бургас" : "The Ethnographic Museum, part of Burgas’s historic architecture"} fill priority sizes="(max-width: 760px) 100vw, 56vw"/><div className="history-photo-shade"/><figcaption><span>{bg ? "СЛЕДИТЕ НА ГРАДА" : "THE CITY’S LAYERS"}<strong>{bg ? "Памет в архитектурата." : "Memory in architecture."}</strong></span><a href="https://commons.wikimedia.org/wiki/File:Burgas-Ethnographic-museum.jpg" target="_blank" rel="noreferrer">Vassia Atanassova – Spiritia · CC BY-SA 3.0 ↗</a></figcaption><span className="history-image-index">42°29′ N<br/>27°28′ E</span></figure>
    </div></section>

    <nav className="history-period-nav" aria-label={bg ? "Периоди от историята на Бургас" : "Periods in the history of Burgas"}><div className="shell"><span>{bg ? "ПРЕВЪРТИ КЪМ" : "JUMP TO"}</span>{chapters.map(([date], index) => <a key={date} href={`#chapter-${index + 1}`}><i>0{index + 1}</i>{date}<ArrowDown size={13}/></a>)}</div></nav>

    <section className="history-chronicle"><div className="shell"><div className="history-section-heading"><div><p className="history-eyebrow">{bg ? "ЧЕТИРИ ХОРИЗОНТА" : "FOUR HORIZONS"}</p><h2>{bg ? <>Градът расте<br/><em>на пластове.</em></> : <>A city grows<br/><em>in layers.</em></>}</h2></div><p>{bg ? "Кратък разказ по историческата справка на Община Бургас. Всеки период е свързан с място, което можеш да откриеш и днес." : "A concise account following Burgas Municipality’s historical overview. Each period connects to a place you can discover today."}</p></div>
      <div className="history-chapters">{chapters.map(([date, title, text], index) => { const meta = chapterMeta[index]; const Icon = meta.Icon; return <article id={`chapter-${index + 1}`} className="history-chapter" key={date}><div className="history-chapter-date"><span>0{index + 1}</span><strong>{date}</strong></div><div className="history-chapter-copy"><div className="history-chapter-icon"><Icon size={19}/></div><h3>{title}</h3><p>{text}</p><Link href={`/${locale}/places/${meta.slug}`}>{bg ? `Открий ${meta.bgPlace}` : `Discover ${meta.enPlace}`}<ArrowUpRight size={16}/></Link></div><Link className="history-chapter-image" href={`/${locale}/places/${meta.slug}`} aria-label={bg ? `Виж ${meta.bgPlace}` : `View ${meta.enPlace}`}><Image src={meta.image} alt={bg ? meta.bgAlt : meta.enAlt} fill sizes="(max-width: 760px) 90vw, 35vw"/><span>{bg ? meta.bgPlace : meta.enPlace}<ArrowUpRight size={15}/></span></Link></article>; })}</div>
    </div></section>

    <section className="history-future"><div className="shell history-future-grid"><div className="history-future-visual"><div className="future-orbit orbit-a"/><div className="future-orbit orbit-b"/><div className="future-spark"><Leaf size={25}/></div><span>BUR GAS<br/>NEXT CHAPTER</span><small>2021 — 2027</small></div><div className="history-future-copy"><p className="history-eyebrow"><Leaf size={16}/>{bg ? "ДНЕС И УТРЕ" : "TODAY AND TOMORROW"}</p><h2>{bg ? "Растеж с посока, не с обещания." : "Growth with direction, not promises."}</h2><p>{bg ? "Днес Бургас съчетава пристанище, летище, културен живот и система от крайбрежни езера. Общинският план за 2021–2027 г. посочва устойчивото развитие, образованието, регионалната свързаност и адаптацията към климатичните промени като посоки за работа." : "Today Burgas combines a port, airport, cultural life and coastal lakes. The municipal plan for 2021–2027 sets directions around sustainable development, education, regional connectivity and climate adaptation."}</p><p className="history-caveat">{bg ? "Това са публикувани цели, а не гаранция за конкретен бъдещ резултат. Историята продължава с решенията на хората, които живеят и работят тук." : "These are published goals, not a guarantee of a specific future outcome. The story continues through the choices of people who live and work here."}</p><Link href={`/${locale}/map`}>{bg ? "Открий града такъв, какъвто е днес" : "Discover the city as it is today"}<ArrowRight size={17}/></Link></div></div></section>

    <section className="history-platform"><div className="shell"><div className="history-platform-heading"><div><p className="history-eyebrow">{bg ? "ИСТОРИЯТА НА ПЛАТФОРМАТА" : "THE STORY OF THIS GUIDE"}</p><h2>{bg ? <>От един QR код<br/><em>към цял град.</em></> : <>From one QR code<br/><em>to a whole city.</em></>}</h2></div><p>{bg ? "Технологията е входът. Целта е човекът да открие, разбере и посети културното място." : "Technology is the entry point. The aim is for people to discover, understand and visit a cultural place."}</p></div><div className="history-platform-flow"><article><span>01</span><h3>{bg ? "Проблем" : "The gap"}</h3><p>{bg ? "Минаваме покрай важни места, без да познаваме техните истории." : "We pass significant places without knowing their stories."}</p></article><article><span>02</span><h3>{bg ? "Прототип" : "Prototype"}</h3><p>{bg ? "През 2026 г. е създаден независим конкурсен MVP с реални места, QR страници и източници." : "An independent competition MVP with real places, QR pages and sources was created in 2026."}</p></article><article><span>03</span><h3>2027</h3><p>{bg ? "Градът домакин отваря врата към културата отвъд събитието." : "The host-city moment opens a door to culture beyond the event."}</p></article><article><span>04</span><h3>{bg ? "Следващо" : "What’s next"}</h3><p>{bg ? "Повече истории и езици — след проверка на съдържанието и реално сътрудничество." : "More stories and languages — after content verification and real collaboration."}</p></article></div><Link className="history-platform-cta" href={`/${locale}/map`}>{bg ? "Виж картата на историите" : "Explore the story map"}<ArrowUpRight size={17}/></Link></div></section>

    <section className="history-sources"><div className="shell"><div><p className="history-eyebrow">{bg ? "ИЗТОЧНИЦИ" : "SOURCES"}</p><h2>{bg ? "Провери разказа." : "Check the story."}</h2></div><div className="history-source-links">{sources.map((source, index) => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}><span>0{index + 1}</span>{bg ? source.bg : source.en}<ArrowUpRight size={17}/></a>)}</div></div></section>
  </div>;
}
