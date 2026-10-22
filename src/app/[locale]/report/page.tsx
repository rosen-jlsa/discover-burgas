import { notFound } from "next/navigation";
import { Bug, ShieldCheck } from "lucide-react";
import { ReportForm } from "@/components/ReportForm";
import { isLocale } from "@/types/content";

export default async function ReportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const isBg = locale === "bg";
  return <><section className="page-hero spring-page-hero"><div className="spring-flow" aria-hidden="true"/><div className="shell"><p className="eyebrow"><Bug size={16}/> {isBg ? "Помогни ни да подобрим платформата" : "Help improve the platform"}</p><h1 className="display">{isBg ? "Докладвай проблем." : "Report an issue."}</h1><p>{isBg ? "Сигнализирай за неточен факт, проблем с картата, навигацията или достъпността." : "Tell us about an inaccurate fact or a problem with the map, navigation or accessibility."}</p></div></section>
    <section className="section"><div className="shell report-layout"><div><p className="eyebrow">{isBg ? "Формуляр" : "Report form"}</p><h2 className="display">{isBg ? "Какво не работи?" : "What is not working?"}</h2><p>{isBg ? "Не изпращай пароли, API ключове или друга чувствителна информация." : "Do not submit passwords, API keys or other sensitive information."}</p><div className="privacy-note"><ShieldCheck/>{isBg ? "Контактът не е задължителен. В прототипа сигналите се пазят временно в паметта на сървъра." : "Contact details are optional. In this prototype reports are kept temporarily in server memory."}</div></div><ReportForm locale={locale}/></div></section></>;
}
