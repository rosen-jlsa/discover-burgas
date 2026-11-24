import type { MetadataRoute } from "next";
import { loadPublishedLandmarks, loadRoutes } from "@/lib/backend";
import { appBaseUrl } from "@/lib/qr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = appBaseUrl();
  const [landmarks, routes] = await Promise.all([loadPublishedLandmarks(), loadRoutes()]);
  const locales = ["bg", "en"] as const;
  const staticPaths = ["", "/map", "/story", "/demo", "/privacy", "/eat", "/stay", "/sources", "/install"];
  const alternates = (path: string) => ({ languages: { "bg-BG": `${base}/bg${path}`, en: `${base}/en${path}` } });
  const localized = locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({ url: `${base}/${locale}${path}`, alternates: alternates(path), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })),
    ...landmarks.map((item) => ({ url: `${base}/${locale}/places/${item.slug}`, alternates: alternates(`/places/${item.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...routes.map((route) => ({ url: `${base}/${locale}/routes/${route.slug}`, alternates: alternates(`/routes/${route.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ]);
  return localized;
}
