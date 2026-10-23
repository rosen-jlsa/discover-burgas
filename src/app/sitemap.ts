import type { MetadataRoute } from "next";
import { landmarks, routes } from "@/data/landmarks";
import { appBaseUrl } from "@/lib/qr";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appBaseUrl();
  const locales = ["bg", "en"] as const;
  const staticPaths = ["", "/map", "/story", "/demo", "/privacy"];
  const localized = locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({ url: `${base}/${locale}${path}`, lastModified: new Date("2026-10-24"), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })),
    ...landmarks.filter((item) => item.status === "PUBLISHED").map((item) => ({ url: `${base}/${locale}/places/${item.slug}`, lastModified: new Date(item.lastVerifiedAt), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...routes.map((route) => ({ url: `${base}/${locale}/routes/${route.slug}`, lastModified: new Date("2026-10-24"), changeFrequency: "monthly" as const, priority: 0.7 })),
  ]);
  return localized;
}
