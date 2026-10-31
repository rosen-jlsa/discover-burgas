import { describe, expect, it } from "vitest";
import { haversineKm, navigationUrls, nearby } from "./geo";
import { landmarks } from "@/data/landmarks";

describe("geospatial helpers", () => {
  it("calculates a plausible central distance", () => {
    const clock = landmarks.find((x) => x.slug === "burgas-clock")!;
    const archaeology = landmarks.find((x) => x.slug === "archaeological-museum")!;
    const distance = haversineKm(clock as {latitude:number;longitude:number}, archaeology as {latitude:number;longitude:number});
    expect(distance).toBeGreaterThan(0.1); expect(distance).toBeLessThan(1);
  });
  it("orders nearby places by real distance", () => {
    const origin = landmarks.find((x) => x.slug === "burgas-clock")!;
    const results = nearby(origin, landmarks, 3);
    expect(results).toHaveLength(3);
    expect(results[0].distanceKm).toBeLessThanOrEqual(results[1].distanceKm);
    expect(results.every((x) => x.item.slug !== origin.slug)).toBe(true);
  });
  it("builds keyless universal navigation links", () => {
    const arena = landmarks.find((x) => x.slug === "arena-burgas")!;
    const urls = navigationUrls(arena);
    expect(urls.google).toContain("google.com/maps/dir/?api=1");
    expect(urls.apple).toContain("maps.apple.com/directions");
    expect(urls.waze).toContain("waze.com/ul?");
    expect(Object.values(urls).every((url) => url.includes("42.524694"))).toBe(true);
  });
});
