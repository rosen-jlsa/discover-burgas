import "server-only";

import { landmarks as manifestLandmarks, routes as manifestRoutes } from "@/data/landmarks";
import { haversineKm } from "@/lib/geo";
import { getSupabaseReadClient, isSupabaseReadable } from "@/lib/supabase";
import { landmarkSchema, routeSchema, type CulturalRoute, type Landmark, type Locale, type TransportMode } from "@/types/content";

type LandmarkRow = {
  id: string; slug: string; category: string; municipality: string; area: string; address: string | null;
  latitude: number | null; longitude: number | null; official_url: string | null; accessibility: string | null;
  opening_hours: string | null; entry_fees: string | null; last_verified_at: string; status: Landmark["status"];
  featured: boolean; translations: Landmark["translations"]; images: Landmark["images"]; sources: Landmark["sources"];
};

export type LandmarkSearch = {
  locale: Locale; query?: string; category?: string; area?: string; interest?: string;
  scope?: "all" | "burgas" | "region"; page?: number; pageSize?: number; sort?: "name" | "verifiedAt";
};

function rowToLandmark(row: LandmarkRow): Landmark {
  return landmarkSchema.parse({
    id: row.id, slug: row.slug, category: row.category, municipality: row.municipality, area: row.area,
    address: row.address, latitude: row.latitude, longitude: row.longitude, officialUrl: row.official_url,
    accessibility: row.accessibility, openingHours: row.opening_hours, entryFees: row.entry_fees,
    lastVerifiedAt: row.last_verified_at, status: row.status, featured: row.featured,
    translations: row.translations, images: row.images, sources: row.sources,
  });
}

function manifestFallbackEnabled() {
  return process.env.CONTENT_BACKEND !== "supabase";
}

export async function loadPublishedLandmarks(): Promise<Landmark[]> {
  if (manifestFallbackEnabled()) return manifestLandmarks.filter((item) => item.status === "PUBLISHED");
  const client = getSupabaseReadClient();
  if (!client && !isSupabaseReadable()) throw new Error("CONTENT_BACKEND=supabase but Supabase read credentials are missing.");
  const { data, error } = await client!.from("landmarks").select("*").eq("status", "PUBLISHED").order("slug");
  if (error) throw new Error(`Supabase landmarks query failed: ${error.message}`);
  return (data as LandmarkRow[]).map(rowToLandmark);
}

export async function loadLandmark(slug: string) {
  if (manifestFallbackEnabled()) return manifestLandmarks.find((item) => item.status === "PUBLISHED" && item.slug === slug);
  const client = getSupabaseReadClient();
  if (!client) throw new Error("Supabase public read configuration is missing.");
  const { data, error } = await client.from("landmarks").select("*").eq("status", "PUBLISHED").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Supabase landmark query failed: ${error.message}`);
  return data ? rowToLandmark(data as LandmarkRow) : undefined;
}

export async function loadRoutes(): Promise<CulturalRoute[]> {
  if (manifestFallbackEnabled()) return manifestRoutes;
  const client = getSupabaseReadClient();
  if (!client) throw new Error("Supabase public read configuration is missing.");
  const { data, error } = await client.from("cultural_routes").select("id,slug,transport_mode,translations,stops").eq("published", true).order("slug");
  if (error) throw new Error(`Supabase routes query failed: ${error.message}`);
  const published = new Set((await loadPublishedLandmarks()).map((item) => item.slug));
  return data
    .map((row) => routeSchema.parse({ id: row.id, slug: row.slug, transportMode: row.transport_mode, translations: row.translations, stops: row.stops }))
    .filter((route) => route.stops.every((stop) => published.has(stop.landmarkSlug)));
}

export async function loadRoute(slug: string) {
  return (await loadRoutes()).find((item) => item.slug === slug);
}

function localizedHaystack(item: Landmark, locale: Locale) {
  const translation = item.translations[locale];
  return [translation.name, translation.short, translation.description, ...translation.keywords, item.area, item.municipality]
    .join(" ").toLocaleLowerCase(locale);
}

function filterManifest(options: LandmarkSearch) {
  const query = (options.query ?? "").trim().toLocaleLowerCase(options.locale);
  const interest = (options.interest ?? "").trim().toLocaleLowerCase(options.locale);
  return manifestLandmarks.filter((item) => {
    if (item.status !== "PUBLISHED") return false;
    const haystack = localizedHaystack(item, options.locale);
    const inScope = options.scope === "burgas" ? item.municipality === "Бургас" : options.scope === "region" ? item.municipality !== "Бургас" : true;
    return inScope && (!query || haystack.includes(query)) && (!options.category || item.category === options.category)
      && (!options.area || item.area === options.area) && (!interest || haystack.includes(interest));
  });
}

export async function searchPublishedLandmarks(options: LandmarkSearch) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 20;
  const start = (page - 1) * pageSize;
  if (manifestFallbackEnabled()) {
    const filtered = filterManifest(options).sort((a, b) => options.sort === "verifiedAt"
      ? b.lastVerifiedAt.localeCompare(a.lastVerifiedAt)
      : a.translations[options.locale].name.localeCompare(b.translations[options.locale].name, options.locale));
    return { items: filtered.slice(start, start + pageSize), total: filtered.length };
  }

  const client = getSupabaseReadClient();
  if (!client) throw new Error("Supabase public read configuration is missing.");
  let request = client.from("landmarks").select("*", { count: "exact" }).eq("status", "PUBLISHED");
  if (options.query) request = request.textSearch("search_document", options.query, { config: "simple", type: "websearch" });
  if (options.interest) request = request.textSearch("search_document", options.interest, { config: "simple", type: "websearch" });
  if (options.category) request = request.eq("category", options.category);
  if (options.area) request = request.eq("area", options.area);
  if (options.scope === "burgas") request = request.eq("municipality", "Бургас");
  if (options.scope === "region") request = request.neq("municipality", "Бургас");
  request = options.sort === "verifiedAt"
    ? request.order("last_verified_at", { ascending: false })
    : request.order(options.locale === "bg" ? "name_bg" : "name_en", { ascending: true });
  const { data, error, count } = await request.range(start, start + pageSize - 1);
  if (error) throw new Error(`Supabase search failed: ${error.message}`);
  const items = (data as LandmarkRow[]).map(rowToLandmark);
  return { items, total: count ?? items.length };
}

export async function searchBackendLandmarks(locale: Locale, query = "", category = "", area = "", interest = "") {
  return (await searchPublishedLandmarks({ locale, query, category, area, interest, pageSize: 50 })).items;
}

export async function loadNearbyLandmarks(slug: string, radiusKm = 3, limit = 3) {
  const origin = await loadLandmark(slug);
  if (!origin || origin.latitude == null || origin.longitude == null) return { origin, items: [] };
  const items = (await loadPublishedLandmarks())
    .filter((item) => item.slug !== slug && item.latitude != null && item.longitude != null)
    .map((item) => ({ item, distanceKm: haversineKm(origin as { latitude: number; longitude: number }, item as { latitude: number; longitude: number }) }))
    .filter(({ distanceKm }) => distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
  return { origin, items };
}

export async function filterRoutes(transportMode?: TransportMode) {
  const routes = await loadRoutes();
  return transportMode ? routes.filter((route) => route.transportMode === transportMode) : routes;
}

export function backendMode() {
  return manifestFallbackEnabled() ? "manifest" : "supabase";
}
