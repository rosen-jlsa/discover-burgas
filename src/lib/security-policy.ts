export type RuntimeEnvironment = "development" | "production" | "test";

export function buildContentSecurityPolicy(
  environment: RuntimeEnvironment = process.env.NODE_ENV,
) {
  const developmentScriptDirective =
    environment === "development"
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    developmentScriptDirective,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://tile.openstreetmap.org https://*.googleusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://places.googleapis.com",
    "manifest-src 'self'",
    "worker-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}
