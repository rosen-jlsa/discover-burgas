import "server-only";

import { createHmac } from "node:crypto";
import { getSupabaseAdminClient } from "@/lib/supabase";

type RateLimitAction = "admin_login" | "issue_report";
type MemoryWindow = { count: number; resetAt: number };

declare global {
  var __discoverBurgasRateLimits: Map<string, MemoryWindow> | undefined;
}

const memoryLimits = globalThis.__discoverBurgasRateLimits ?? new Map<string, MemoryWindow>();
globalThis.__discoverBurgasRateLimits = memoryLimits;

function clientAddress(request: Request) {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0],
  ];
  return candidates.find((value) => value?.trim())?.trim() ?? "local-unknown";
}

function fingerprint(request: Request, action: RateLimitAction) {
  const secret = process.env.REPORT_RATE_LIMIT_SECRET?.trim() || process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!secret) throw new Error("Rate-limit secret is not configured.");
  return createHmac("sha256", secret).update(`${action}:${clientAddress(request)}`).digest("hex");
}

function consumeMemory(key: string, limit: number, windowSeconds: number) {
  const now = Date.now();
  const existing = memoryLimits.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryLimits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }
  existing.count += 1;
  return existing.count <= limit;
}

export async function consumeRateLimit(
  action: RateLimitAction,
  request: Request,
  limit: number,
  windowSeconds: number,
) {
  const key = fingerprint(request, action);
  const admin = getSupabaseAdminClient();
  if (!admin) {
    if (process.env.CONTENT_BACKEND === "supabase") throw new Error("Supabase rate limiting is unavailable.");
    return consumeMemory(`${action}:${key}`, limit, windowSeconds);
  }
  const { data, error } = await admin.rpc("consume_request_rate_limit", {
    p_action: action,
    p_fingerprint: key,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error) throw new Error(`Rate limiting failed: ${error.message}`);
  return data === true;
}
