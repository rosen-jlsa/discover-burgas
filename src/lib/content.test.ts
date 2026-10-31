import { describe, expect, it } from "vitest";
import { getLandmark, publishedLandmarks, searchLandmarks } from "./content";

describe("content repository", () => {
  it("returns published records and exact slugs", () => {
    expect(publishedLandmarks()).toHaveLength(8);
    expect(getLandmark("aquae-calidae")?.id).toBe("lm-aquae");
    expect(getLandmark("not-real")).toBeUndefined();
  });
  it("searches localized text and filters categories", () => {
    expect(searchLandmarks("bg", "минерална").map((x) => x.slug)).toContain("aquae-calidae");
    expect(searchLandmarks("en", "monastery").map((x) => x.slug)).toContain("st-anastasia-island");
    expect(searchLandmarks("bg", "", "museums")).toHaveLength(3);
  });
});
