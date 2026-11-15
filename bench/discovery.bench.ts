import { describe, test } from "vitest";
import { landmarks } from "@/data/landmarks";
import { haversineKm, nearby } from "@/lib/geo";
import { searchLandmarks } from "@/lib/content";

const centre = landmarks.find((item) => item.slug === "archaeological-museum")!;
const aquae = landmarks.find((item) => item.slug === "aquae-calidae")!;

describe("cultural discovery hot paths", () => {
  test("discovery operations", async ({ bench }) => {
    await bench.compare(
      bench("localized landmark search", () => {
        searchLandmarks("bg", "история");
        searchLandmarks("en", "museum");
      }),
      bench("nearby landmark ordering", () => {
        nearby(centre, landmarks, 5);
      }),
      bench("Haversine distance", () => {
        haversineKm(
          { latitude: centre.latitude!, longitude: centre.longitude! },
          { latitude: aquae.latitude!, longitude: aquae.longitude! },
        );
      }),
    );
  });
});
