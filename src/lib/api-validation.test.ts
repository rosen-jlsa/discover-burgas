import { describe, expect, it } from "vitest";
import { nearbyQuerySchema, placeFiltersSchema, routeFiltersSchema, slugSchema } from "./api-validation";

describe("public API request contracts", () => {
  it("applies safe discovery defaults", () => {
    const parsed = placeFiltersSchema.parse({});
    expect(parsed).toMatchObject({ locale: "bg", page: 1, pageSize: 20, scope: "all", sort: "name" });
  });

  it("rejects unknown filters and unsafe pagination", () => {
    expect(placeFiltersSchema.safeParse({ unknown: "value" }).success).toBe(false);
    expect(placeFiltersSchema.safeParse({ pageSize: "51" }).success).toBe(false);
    expect(placeFiltersSchema.safeParse({ category: "invented" }).success).toBe(false);
  });

  it("validates nearby, routes and stable slugs", () => {
    expect(nearbyQuerySchema.parse({ radiusKm: "10", limit: "4" })).toMatchObject({ radiusKm: 10, limit: 4 });
    expect(nearbyQuerySchema.safeParse({ radiusKm: "101" }).success).toBe(false);
    expect(routeFiltersSchema.safeParse({ transportMode: "WALKING" }).success).toBe(true);
    expect(slugSchema.safeParse("aquae-calidae").success).toBe(true);
    expect(slugSchema.safeParse("../secret").success).toBe(false);
  });
});
