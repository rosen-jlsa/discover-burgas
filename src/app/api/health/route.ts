import { NextResponse } from "next/server";
import { backendMode } from "@/lib/backend";
import { getSupabaseReadClient, isSupabaseWritable } from "@/lib/supabase";
import { noStore } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const backend = backendMode();
  let database: "ready" | "fallback" | "error" = backend === "manifest" ? "fallback" : "error";
  if (backend === "supabase") {
    try {
      const client = getSupabaseReadClient();
      if (client) {
        const { error } = await client.from("landmarks").select("id", { count: "exact", head: true }).eq("status", "PUBLISHED").abortSignal(AbortSignal.timeout(5000));
        if (!error) database = "ready";
      }
    } catch { database = "error"; }
  }
  const protectedWrites = isSupabaseWritable() && Boolean(process.env.REPORT_RATE_LIMIT_SECRET?.trim() || process.env.ADMIN_DASHBOARD_TOKEN?.trim());
  const degraded = database === "error" || (backend === "supabase" && !protectedWrites);
  return NextResponse.json({ status: degraded ? "degraded" : "ok", backend, database,
    reportSubmission: backend === "manifest" ? "memory-demo" : protectedWrites ? "server-configured" : "unavailable",
    checkedAt: new Date().toISOString(),
  }, { status: degraded ? 503 : 200, headers: noStore });
}
