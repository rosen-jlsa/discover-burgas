import type { NextConfig } from "next";
import { buildContentSecurityPolicy } from "./src/lib/security-policy";

const contentSecurityPolicy = buildContentSecurityPolicy();

const nextConfig: NextConfig = {
  env:{NEXT_PUBLIC_APP_BUILD_ID:process.env.VERCEL_GIT_COMMIT_SHA||process.env.APP_BUILD_ID||"local-1.1.0",NEXT_PUBLIC_APP_BUILT_AT:process.env.APP_BUILT_AT||new Date().toISOString()},
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "geolocation=(self), camera=(), microphone=(), payment=(), usb=()" },
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Cross-Origin-Resource-Policy", value: "same-origin" }
      ]
    }, {
      source: "/admin",
      headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }]
    }];
  }
};

export default nextConfig;
