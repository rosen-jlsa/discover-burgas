import { type NextRequest, NextResponse } from "next/server";

import { localeQuerySchema, slugSchema } from "@/lib/api-validation";
import { loadLandmark } from "@/lib/backend";
import { apiError, publicCache } from "@/lib/http";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsedSlug = slugSchema.safeParse(slug);
  const parsedQuery = localeQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsedSlug.success || !parsedQuery.success) {
    return apiError("Invalid landmark request", 400, "INVALID_REQUEST");
  }

  try {
    const item = await loadLandmark(parsedSlug.data);
    if (!item) return apiError("Landmark not found", 404, "NOT_FOUND");
    const translation = item.translations[parsedQuery.data.locale];
    return NextResponse.json({
      ...item,
      ...translation,
      translations: undefined,
      locale: parsedQuery.data.locale,
    }, { headers: publicCache });
  } catch {
    return apiError("Content temporarily unavailable", 503, "UNAVAILABLE");
  }
}
