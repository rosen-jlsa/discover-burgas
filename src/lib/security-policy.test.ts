import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "./security-policy";

describe("content security policy", () => {
  it("permits React development diagnostics locally", () => {
    expect(buildContentSecurityPolicy("development")).toContain("'unsafe-eval'");
  });

  it("never permits eval in production", () => {
    const policy = buildContentSecurityPolicy("production");

    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
  });
});
