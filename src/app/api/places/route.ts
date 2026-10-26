import { NextRequest, NextResponse } from "next/server";
import { searchBackendLandmarks } from "@/lib/backend";
import { placeFiltersSchema } from "@/lib/api-validation";
import { apiError, noStore } from "@/lib/http";

export async function GET(request: NextRequest) {
  const parsed = placeFiltersSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return apiError("Invalid search filters", 400);
  const { locale, q, category, area } = parsed.data;
  try {
    const items = (await searchBackendLandmarks(locale, q, category, area)).map(item => ({
      id: item.id, slug: item.slug, category: item.category, area: item.area,
      latitude: item.latitude, longitude: item.longitude, ...item.translations[locale],
    }));
    return NextResponse.json({ items, count: items.length, locale }, { headers: noStore });
  } catch { return apiError("Content temporarily unavailable", 503); }
}
