import { NextResponse } from "next/server";
import { backendMode } from "@/lib/backend";
import { getSupabaseReadClient, isSupabaseReadable, isSupabaseWritable } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const client = getSupabaseReadClient();
  let database: "ready" | "fallback" | "error" = client ? "ready" : "fallback";
  if (client) { const { error } = await client.from("landmarks").select("id", { count: "exact", head: true }).eq("status", "PUBLISHED"); if (error) database = "error"; }
  return NextResponse.json({ status: database === "error" ? "degraded" : "ok", backend: backendMode(), database, reportSubmission: isSupabaseReadable() ? "supabase-rpc" : "memory", reportInbox: isSupabaseWritable() ? "supabase" : "server-secret-required", checkedAt: new Date().toISOString() }, { status: database === "error" ? 503 : 200 });
}
