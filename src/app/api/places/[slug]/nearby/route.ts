import { type NextRequest, NextResponse } from "next/server";

import { nearbyQuerySchema, slugSchema } from "@/lib/api-validation";
import { loadNearbyLandmarks } from "@/lib/backend";
import { apiError, publicCache } from "@/lib/http";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsedSlug = slugSchema.safeParse(slug);
  const parsedQuery = nearbyQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsedSlug.success || !parsedQuery.success) return apiError("Invalid nearby request", 400, "INVALID_REQUEST");

  try {
    const { locale, limit, radiusKm } = parsedQuery.data;
    const result = await loadNearbyLandmarks(parsedSlug.data, radiusKm, limit);
    if (!result.origin) return apiError("Landmark not found", 404, "NOT_FOUND");
    const items = result.items.map(({ item, distanceKm }) => ({
      id: item.id,
      slug: item.slug,
      category: item.category,
      municipality: item.municipality,
      area: item.area,
      latitude: item.latitude,
      longitude: item.longitude,
      distanceKm: Number(distanceKm.toFixed(3)),
      ...item.translations[locale],
    }));
    return NextResponse.json({ origin: result.origin.slug, items, count: items.length, locale, radiusKm }, { headers: publicCache });
  } catch {
    return apiError("Nearby places temporarily unavailable", 503, "UNAVAILABLE");
  }
}
