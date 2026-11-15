import { type NextRequest, NextResponse } from "next/server";

import { routeFiltersSchema } from "@/lib/api-validation";
import { filterRoutes } from "@/lib/backend";
import { apiError, publicCache } from "@/lib/http";

export async function GET(request: NextRequest) {
  const parsed = routeFiltersSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return apiError("Invalid route filters", 400, "INVALID_REQUEST", parsed.error.flatten());
  try {
    const { locale, transportMode } = parsed.data;
    const items = (await filterRoutes(transportMode)).map((route) => ({
      id: route.id,
      slug: route.slug,
      transportMode: route.transportMode,
      stopCount: route.stops.length,
      ...route.translations[locale],
    }));
    return NextResponse.json({ items, count: items.length, locale }, { headers: publicCache });
  } catch {
    return apiError("Routes temporarily unavailable", 503, "UNAVAILABLE");
  }
}
