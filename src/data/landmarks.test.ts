import { describe, expect, it } from "vitest";
import { landmarks, routes } from "./landmarks";
import { landmarkSchema, routeSchema } from "@/types/content";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

describe("verified content manifests", () => {
  it("contains fourteen unique valid published landmarks with both locales", () => {
    expect(landmarks).toHaveLength(14);
    expect(new Set(landmarks.map(item => item.id)).size).toBe(landmarks.length);
    expect(new Set(landmarks.map(item => item.slug)).size).toBe(landmarks.length);
    for (const item of landmarks) {
      expect(() => landmarkSchema.parse(item)).not.toThrow();
      expect(item.status).toBe("PUBLISHED");
      expect(item.translations.bg.name.length).toBeGreaterThan(2);
      expect(item.translations.en.name.length).toBeGreaterThan(2);
      expect(item.sources.length).toBeGreaterThan(0);
      expect(item.images.length).toBeGreaterThan(0);
      for(const image of item.images){
        expect(existsSync(resolve("public",image.path.slice(1)))).toBe(true);
        expect(image.creator.length).toBeGreaterThan(0);
        expect(image.license.length).toBeGreaterThan(0);
      }
    }
  });
  it("keeps every route resolvable and preserves the central walking route", () => {
    expect(routes).toHaveLength(3);
    for (const route of routes) {
      expect(() => routeSchema.parse(route)).not.toThrow();
      expect(route.stops.every((stop) => landmarks.some((item) => item.slug === stop.landmarkSlug))).toBe(true);
    }
    expect(routes[0].transportMode).toBe("WALKING");
    expect(routes[0].stops).toHaveLength(5);
    expect(routes.find(route => route.slug === "north-coast-heritage")?.transportMode).toBe("DRIVING");
    expect(routes.find(route => route.slug === "south-coast-discovery")?.transportMode).toBe("MIXED");
  });
});
