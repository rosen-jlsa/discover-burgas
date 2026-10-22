import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieValue, adminIsConfigured, isValidAdminToken } from "@/lib/admin";

export async function POST(request: Request) {
  if (!adminIsConfigured()) return NextResponse.json({ error: "Admin dashboard is not configured." }, { status: 503 });
  const form = await request.formData();
  const token = String(form.get("token") ?? "");
  if (!isValidAdminToken(token)) return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, adminCookieValue(), { httpOnly: true, sameSite: "strict", secure: process.env.NEXT_PUBLIC_APP_BASE_URL?.startsWith("https://") ?? false, path: "/", maxAge: 60 * 60 * 4 });
  return response;
}
