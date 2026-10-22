import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "discover_burgas_admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function adminIsConfigured() {
  return Boolean(process.env.ADMIN_DASHBOARD_TOKEN?.trim());
}

export function adminCookieValue() {
  const token = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  return token ? digest(`discover-burgas:${token}`).toString("hex") : "";
}

export function isValidAdminToken(candidate: string) {
  const expected = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!expected || !candidate) return false;
  return timingSafeEqual(digest(candidate), digest(expected));
}

export function isValidAdminCookie(candidate?: string) {
  const expected = adminCookieValue();
  if (!expected || !candidate || candidate.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}

export type ServiceStatus = { name: string; environment: string; status: "ready" | "optional" | "missing"; note: string };

export function getServiceStatuses(): ServiceStatus[] {
  const configured = (name: string) => Boolean(process.env[name]?.trim());
  return [
    { name: "Public application URL", environment: "NEXT_PUBLIC_APP_BASE_URL", status: configured("NEXT_PUBLIC_APP_BASE_URL") ? "ready" : "missing", note: "Used for permanent QR destinations." },
    { name: "Neon runtime database", environment: "DATABASE_URL", status: configured("DATABASE_URL") ? "ready" : "missing", note: "Required when database-backed content is enabled." },
    { name: "Neon migration connection", environment: "DIRECT_URL", status: configured("DIRECT_URL") ? "ready" : "missing", note: "Required for production migrations." },
    { name: "Google Maps platform", environment: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", status: configured("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY") ? "ready" : "optional", note: "Optional. Current Google, Apple and Waze direction links require no key." },
    { name: "Admin dashboard", environment: "ADMIN_DASHBOARD_TOKEN", status: configured("ADMIN_DASHBOARD_TOKEN") ? "ready" : "missing", note: "Protects this private health view." },
  ];
}
