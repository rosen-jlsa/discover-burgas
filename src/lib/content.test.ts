import { describe, expect, it } from "vitest";
import { getLandmark, publishedLandmarks, searchLandmarks } from "./content";

describe("content repository", () => {
  it("returns published records and exact slugs", () => {
    expect(publishedLandmarks()).toHaveLength(14);
    expect(getLandmark("aquae-calidae")?.id).toBe("lm-aquae");
    expect(getLandmark("ancient-nessebar")?.municipality).toBe("Несебър");
    expect(getLandmark("ropotamo-boat-pier")?.category).toBe("nature");
    expect(getLandmark("not-real")).toBeUndefined();
  });
  it("searches localized text and filters categories", () => {
    expect(searchLandmarks("bg", "минерална").map((x) => x.slug)).toContain("aquae-calidae");
    expect(searchLandmarks("en", "monastery").map((x) => x.slug)).toContain("st-anastasia-island");
    expect(searchLandmarks("bg", "", "museums")).toHaveLength(5);
    expect(searchLandmarks("en", "protected area").map((x) => x.slug)).toContain("ropotamo-boat-pier");
    expect(searchLandmarks("bg", "Несебър").map((x) => x.slug)).toContain("ancient-nessebar");
  });
});
