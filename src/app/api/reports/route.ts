import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/admin";
import { addReport, getReports } from "@/lib/reports";
import { consumeRateLimit } from "@/lib/rate-limit";

const reportSchema = z.object({
  category: z.enum(["map", "api", "content", "accessibility", "other"]),
  page: z.string().trim().max(300).default(""),
  message: z.string().trim().min(10).max(2000),
  contact: z.string().trim().max(200).optional(),
  website: z.string().max(0).optional(),
});

const noStore = { "Cache-Control": "private, no-store, max-age=0" };

export async function POST(request: Request) {
  const parsed = reportSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid report", details: parsed.error.flatten() }, { status: 400, headers: noStore });
  try {
    if (!await consumeRateLimit("issue_report", request, 5, 10 * 60)) {
      return NextResponse.json({ error: "Too many reports" }, { status: 429, headers: { ...noStore, "Retry-After": "600" } });
    }
    const report = { category: parsed.data.category, page: parsed.data.page, message: parsed.data.message, contact: parsed.data.contact };
    return NextResponse.json(await addReport(report), { status: 201, headers: noStore });
  }
  catch { return NextResponse.json({ error: "Report storage unavailable" }, { status: 503, headers: noStore }); }
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isValidAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noStore });
  try { return NextResponse.json(await getReports(), { headers: noStore }); }
  catch { return NextResponse.json({ error: "Report storage unavailable" }, { status: 503, headers: noStore }); }
}
