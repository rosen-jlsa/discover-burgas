import { describe, expect, it } from "vitest";
import { landmarks, routes } from "./landmarks";
import { landmarkSchema, routeSchema } from "@/types/content";

describe("verified content manifests", () => {
  it("contains seven valid published landmarks with both locales", () => {
    expect(landmarks).toHaveLength(7);
    for (const item of landmarks) {
      expect(() => landmarkSchema.parse(item)).not.toThrow();
      expect(item.status).toBe("PUBLISHED");
      expect(item.translations.bg.name.length).toBeGreaterThan(2);
      expect(item.translations.en.name.length).toBeGreaterThan(2);
      expect(item.sources.length).toBeGreaterThan(0);
    }
  });
  it("keeps route stops resolvable and central route walk-only", () => {
    expect(() => routeSchema.parse(routes[0])).not.toThrow();
    expect(routes[0].transportMode).toBe("WALKING");
    expect(routes[0].stops.every((stop) => landmarks.some((item) => item.slug === stop.landmarkSlug))).toBe(true);
    expect(routes[0].stops).toHaveLength(5);
  });
});
