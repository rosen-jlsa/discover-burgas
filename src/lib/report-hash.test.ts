import { describe, expect, it } from "vitest";
import { reportRequestHash } from "./report-hash";

describe("report idempotency hashing", () => {
  const report = { category: "map", page: "/bg/map", message: "The marker is misplaced." };

  it("is deterministic and sensitive to payload changes", () => {
    expect(reportRequestHash(report)).toBe(reportRequestHash({ ...report }));
    expect(reportRequestHash(report)).not.toBe(reportRequestHash({ ...report, message: "A different report message." }));
    expect(reportRequestHash(report)).toMatch(/^[a-f0-9]{64}$/);
  });
});
