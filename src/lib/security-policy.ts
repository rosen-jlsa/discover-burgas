export type RuntimeEnvironment = "development" | "production" | "test";

export function buildContentSecurityPolicy(
  environment: RuntimeEnvironment = process.env.NODE_ENV,
) {
  const developmentScriptDirective =
    environment === "development"
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";
  const analytics = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "");

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    developmentScriptDirective + (analytics ? " https://www.googletagmanager.com" : ""),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://tile.openstreetmap.org https://*.googleusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://places.googleapis.com" + (analytics ? " https://*.google-analytics.com https://www.googletagmanager.com" : ""),
    "manifest-src 'self'",
    "worker-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}
