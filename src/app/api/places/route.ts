import { NextRequest, NextResponse } from "next/server";
import { searchPublishedLandmarks } from "@/lib/backend";
import { placeFiltersSchema } from "@/lib/api-validation";
import { apiError, publicCache } from "@/lib/http";

export async function GET(request: NextRequest) {
  const parsed = placeFiltersSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return apiError("Invalid search filters", 400, "INVALID_REQUEST", parsed.error.flatten());
  const { locale, q, category, area, interest, scope, page, pageSize, sort } = parsed.data;
  try {
    const result = await searchPublishedLandmarks({ locale, query: q, category, area, interest, scope, page, pageSize, sort });
    const items = result.items.map(item => ({
      id: item.id, slug: item.slug, category: item.category, municipality: item.municipality, area: item.area,
      latitude: item.latitude, longitude: item.longitude, ...item.translations[locale],
    }));
    return NextResponse.json({
      items,
      count: result.total,
      locale,
      pagination: { page, pageSize, total: result.total, totalPages: Math.ceil(result.total / pageSize) },
    }, { headers: publicCache });
  } catch {
    return apiError("Content temporarily unavailable", 503, "UNAVAILABLE");
  }
}
