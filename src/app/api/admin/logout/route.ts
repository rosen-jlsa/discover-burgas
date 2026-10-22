import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "strict", secure: process.env.NEXT_PUBLIC_APP_BASE_URL?.startsWith("https://") ?? false, path: "/", maxAge: 0 });
  return response;
}
