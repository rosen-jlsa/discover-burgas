import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "discover_burgas_admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function adminIsConfigured() {
  return Boolean(process.env.ADMIN_DASHBOARD_TOKEN?.trim());
}

function cookieSignature(expiresAt: string, token: string) {
  return createHmac("sha256", token).update(`discover-burgas:${expiresAt}`).digest("base64url");
}

export function adminCookieValue(now = Date.now()) {
  const token = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!token) return "";
  const expiresAt = String(now + 4 * 60 * 60 * 1000);
  return `${expiresAt}.${cookieSignature(expiresAt, token)}`;
}

export function isValidAdminToken(candidate: string) {
  const expected = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!expected || !candidate) return false;
  return timingSafeEqual(digest(candidate), digest(expected));
}

export function isValidAdminCookie(candidate?: string, now = Date.now()) {
  const token = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!token || !candidate) return false;
  const [expiresAt, suppliedSignature, ...extra] = candidate.split(".");
  if (!expiresAt || !suppliedSignature || extra.length || !/^\d+$/.test(expiresAt) || Number(expiresAt) <= now) return false;
  const expected = cookieSignature(expiresAt, token);
  if (!/^[A-Za-z0-9_-]+$/.test(suppliedSignature) || Buffer.byteLength(suppliedSignature) !== Buffer.byteLength(expected)) return false;
  return timingSafeEqual(Buffer.from(suppliedSignature), Buffer.from(expected));
}

export type ServiceStatus = { name: string; environment: string; status: "ready" | "optional" | "missing"; note: string };

export function getServiceStatuses(): ServiceStatus[] {
  const configured = (name: string) => Boolean(process.env[name]?.trim());
  return [
    { name: "Public application URL", environment: "NEXT_PUBLIC_APP_BASE_URL", status: configured("NEXT_PUBLIC_APP_BASE_URL") ? "ready" : "missing", note: "Used for permanent QR destinations." },
    { name: "Supabase project", environment: "NEXT_PUBLIC_SUPABASE_URL", status: configured("NEXT_PUBLIC_SUPABASE_URL") ? "ready" : "missing", note: "Project endpoint used by the server data layer." },
    { name: "Supabase public access", environment: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", status: configured("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ? "ready" : "missing", note: "Read-only public access governed by RLS." },
    { name: "Supabase server access", environment: "SUPABASE_SECRET_KEY", status: configured("SUPABASE_SECRET_KEY") || configured("SUPABASE_SERVICE_ROLE_KEY") ? "ready" : "missing", note: "Server-only writes and private report inbox. Never sent to browsers." },
    { name: "Google Maps platform", environment: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", status: configured("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY") ? "ready" : "optional", note: "Optional. Current Google, Apple and Waze direction links require no key." },
    { name: "Admin dashboard", environment: "ADMIN_DASHBOARD_TOKEN", status: configured("ADMIN_DASHBOARD_TOKEN") ? "ready" : "missing", note: "Protects this private health view." },
    { name: "Abuse protection", environment: "REPORT_RATE_LIMIT_SECRET", status: configured("REPORT_RATE_LIMIT_SECRET") || configured("ADMIN_DASHBOARD_TOKEN") ? "ready" : "missing", note: "Creates one-way request fingerprints for server-side rate limiting." },
  ];
}
