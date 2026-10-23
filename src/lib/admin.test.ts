import { afterEach, describe, expect, it } from "vitest";
import { adminCookieValue, isValidAdminCookie, isValidAdminToken } from "@/lib/admin";

describe("admin authentication", () => {
  const previous = process.env.ADMIN_DASHBOARD_TOKEN;
  afterEach(() => { process.env.ADMIN_DASHBOARD_TOKEN = previous; });

  it("uses constant-time token verification and expiring signed cookies", () => {
    process.env.ADMIN_DASHBOARD_TOKEN = "a-long-test-token-that-is-not-production";
    expect(isValidAdminToken("a-long-test-token-that-is-not-production")).toBe(true);
    expect(isValidAdminToken("wrong")).toBe(false);
    const issuedAt = 1_800_000_000_000;
    const cookie = adminCookieValue(issuedAt);
    expect(isValidAdminCookie(cookie, issuedAt + 1_000)).toBe(true);
    expect(isValidAdminCookie(cookie, issuedAt + 4 * 60 * 60 * 1000 + 1)).toBe(false);
    expect(isValidAdminCookie(`${cookie}tampered`, issuedAt + 1_000)).toBe(false);
  });
});
