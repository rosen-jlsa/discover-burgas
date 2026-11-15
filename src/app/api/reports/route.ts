import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/admin";
import { addReport, getReports } from "@/lib/reports";
import { consumeRateLimit } from "@/lib/rate-limit";
import { apiError, noStore } from "@/lib/http";

const reportSchema = z.object({
  category: z.enum(["map", "api", "content", "accessibility", "other"]),
  page: z.string().trim().max(300).default(""),
  message: z.string().trim().min(10).max(2000),
  contact: z.string().trim().max(200).optional(),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const parsed = reportSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("Invalid report", 400, "INVALID_REQUEST", parsed.error.flatten());
  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey || !z.string().uuid().safeParse(idempotencyKey).success) {
    return apiError("A valid Idempotency-Key header is required", 400, "INVALID_REQUEST");
  }
  try {
    if (!await consumeRateLimit("issue_report", request, 5, 10 * 60)) {
      return NextResponse.json({ error: "Too many reports" }, { status: 429, headers: { ...noStore, "Retry-After": "600" } });
    }
    const report = { category: parsed.data.category, page: parsed.data.page, message: parsed.data.message, contact: parsed.data.contact };
    const result = await addReport(report, idempotencyKey);
    if (result.kind === "conflict") return apiError("Idempotency key was already used with a different report", 422, "CONFLICT");
    return NextResponse.json(result.report, {
      status: result.kind === "created" ? 201 : 200,
      headers: { ...noStore, "Idempotency-Replayed": result.kind === "replay" ? "true" : "false" },
    });
  }
  catch { return apiError("Report storage unavailable", 503, "UNAVAILABLE"); }
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isValidAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value)) return apiError("Unauthorized", 401, "UNAUTHORIZED");
  try { return NextResponse.json(await getReports(), { headers: noStore }); }
  catch { return apiError("Report storage unavailable", 503, "UNAVAILABLE"); }
}
