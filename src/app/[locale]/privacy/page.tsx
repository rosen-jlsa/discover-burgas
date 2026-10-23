import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "bg" ? "Поверителност" : "Privacy";
  return { title, alternates: { canonical: `/${locale}/privacy`, languages: { bg: "/bg/privacy", en: "/en/privacy" } }, robots: { index: true, follow: true } };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const bg = locale === "bg";
  return <>
    <section className="page-hero"><div className="shell"><p className="eyebrow">{bg ? "Поверителност по дизайн" : "Privacy by design"}</p><h1 className="display">{bg ? "Минимални данни. Ясна цел." : "Minimal data. A clear purpose."}</h1><p>{bg ? "„Открий Бургас“ работи без профил, рекламни тракери или постоянно проследяване на местоположението." : "Discover Burgas works without an account, advertising trackers or persistent location tracking."}</p></div></section>
    <section className="section"><div className="shell legal-copy">
      <h2>{bg ? "Какво се съхранява" : "What is stored"}</h2><p>{bg ? "Любимите места остават само в браузъра ти. Ако разрешиш местоположение, координатите се използват временно в устройството за подреждане на близките места и не се записват от платформата." : "Favorites remain only in your browser. If you allow location access, coordinates are used temporarily on your device to order nearby places and are not stored by the platform."}</p>
      <h2>{bg ? "Сигнали за проблем" : "Issue reports"}</h2><p>{bg ? "Когато изпратиш сигнал, в Supabase PostgreSQL се записват категорията, страницата, съобщението, незадължителният контакт и времето на подаване. Не изпращай пароли или чувствителни данни. Сигналите са видими само в защитения административен изглед." : "When you submit a report, its category, page, message, optional contact and submission time are stored in Supabase PostgreSQL. Do not send passwords or sensitive data. Reports are visible only in the protected administration view."}</p>
      <h2>{bg ? "Защита от злоупотреби" : "Abuse prevention"}</h2><p>{bg ? "За кратък период се пази еднопосочен криптографски отпечатък на мрежовия адрес. Той не показва самия адрес и се използва само за ограничаване на автоматизиран спам; старите записи се премахват автоматично." : "A one-way cryptographic fingerprint of the network address is retained briefly. It does not reveal the address and is used only to limit automated spam; old records are removed automatically."}</p>
      <h2>{bg ? "Срок и права" : "Retention and rights"}</h2><p>{bg ? "Сигналите се пазят само докато са необходими за проверка и подобряване на прототипа, с целеви максимален срок 90 дни. Преди официално обществено внедряване трябва да бъде посочен отговорен администратор на данните и канал за искания за достъп или изтриване." : "Reports are retained only as long as needed to review and improve the prototype, with a target maximum of 90 days. Before an official public rollout, a responsible data controller and a channel for access or deletion requests must be identified."}</p>
      <p><strong>{bg ? "Статус:" : "Status:"}</strong> {bg ? "Независим конкурсен прототип, последно обновен на 24.10.2026 г. Това не е правен съвет или декларация за пълно нормативно съответствие." : "Independent competition prototype, last updated 24 October 2026. This is not legal advice or a claim of complete regulatory compliance."}</p>
    </div></section>
  </>;
}
