import { landmarks, routes } from "@/data/landmarks";
import type { Locale } from "@/types/content";

export function publishedLandmarks() { return landmarks.filter((item) => item.status === "PUBLISHED"); }
export function getLandmark(slug: string) { return publishedLandmarks().find((item) => item.slug === slug); }
export function getRoute(slug: string) { return routes.find((item) => item.slug === slug); }
export function localizeLandmark(item: (typeof landmarks)[number], locale: Locale) { return { ...item, ...item.translations[locale] }; }
export function searchLandmarks(locale: Locale, query = "", category = "", area = "") {
  const needle = query.trim().toLocaleLowerCase(locale);
  return publishedLandmarks().filter((item) => {
    const t = item.translations[locale];
    const haystack = [t.name, t.short, t.description, ...t.keywords, item.area].join(" ").toLocaleLowerCase(locale);
    return (!needle || haystack.includes(needle)) && (!category || item.category === category) && (!area || item.area === area);
  });
}
