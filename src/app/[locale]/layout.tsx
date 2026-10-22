import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isLocale } from "@/types/content";

export function generateStaticParams() { return [{ locale: "bg" }, { locale: "en" }]; }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  return <><Header locale={locale}/><main>{children}</main><Footer locale={locale}/></>;
}
