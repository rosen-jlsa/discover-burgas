import Link from "next/link";
export default function OfflinePage(){return <main className="offline"><div className="shell"><p className="eyebrow">Offline / Без връзка</p><h1 className="display">Историите те чакат.</h1><p>Картата и новите места изискват интернет. Вече посетени страници може да са достъпни от кеша.</p><Link className="button" href="/bg">Опитай отново</Link></div></main>}
