import { type NextRequest, NextResponse } from "next/server";

import { localeQuerySchema, slugSchema } from "@/lib/api-validation";
import { loadLandmark, loadRoute } from "@/lib/backend";
import { apiError, publicCache } from "@/lib/http";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsedSlug = slugSchema.safeParse(slug);
  const parsedQuery = localeQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsedSlug.success || !parsedQuery.success) return apiError("Invalid route request", 400, "INVALID_REQUEST");
  try {
    const route = await loadRoute(parsedSlug.data);
    if (!route) return apiError("Route not found", 404, "NOT_FOUND");
    const locale = parsedQuery.data.locale;
    const stops = await Promise.all(route.stops.map(async (stop, index) => {
      const landmark = await loadLandmark(stop.landmarkSlug);
      return {
        position: index + 1,
        landmarkSlug: stop.landmarkSlug,
        note: stop.note[locale],
        landmark: landmark ? {
          id: landmark.id,
          slug: landmark.slug,
          name: landmark.translations[locale].name,
          latitude: landmark.latitude,
          longitude: landmark.longitude,
        } : null,
      };
    }));
    return NextResponse.json({
      id: route.id,
      slug: route.slug,
      transportMode: route.transportMode,
      ...route.translations[locale],
      stops,
      locale,
    }, { headers: publicCache });
  } catch {
    return apiError("Route temporarily unavailable", 503, "UNAVAILABLE");
  }
}
