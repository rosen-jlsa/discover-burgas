import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/admin";
import { addReport, getReports } from "@/lib/reports";

const reportSchema = z.object({
  category: z.enum(["map", "api", "content", "accessibility", "other"]),
  page: z.string().trim().max(300).default(""),
  message: z.string().trim().min(10).max(2000),
  contact: z.string().trim().max(200).optional(),
});

export async function POST(request: Request) {
  const parsed = reportSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid report", details: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(addReport(parsed.data), { status: 201 });
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isValidAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getReports());
}
