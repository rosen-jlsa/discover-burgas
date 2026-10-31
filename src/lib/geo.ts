import type { Landmark } from "@/types/content";

export function haversineKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const radians = (v: number) => v * Math.PI / 180;
  const earthKm = 6371;
  const dLat = radians(b.latitude - a.latitude);
  const dLon = radians(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.latitude)) * Math.cos(radians(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return earthKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function nearby(origin: Landmark, all: Landmark[], limit = 3) {
  if (origin.latitude == null || origin.longitude == null) return [];
  return all.filter((item) => item.slug !== origin.slug && item.latitude != null && item.longitude != null)
    .map((item) => ({ item, distanceKm: haversineKm(origin as {latitude:number;longitude:number}, item as {latitude:number;longitude:number}) }))
    .filter(({ distanceKm }) => distanceKm <= 3)
    .sort((a, b) => a.distanceKm - b.distanceKm).slice(0, limit);
}

export function directionsUrl(item: Landmark) {
  if (item.latitude == null || item.longitude == null) return item.officialUrl ?? "#";
  return navigationUrls(item).google;
}

export function navigationUrls(item: Landmark) {
  if (item.latitude == null || item.longitude == null) {
    const fallback = item.officialUrl ?? "#";
    return { google: fallback, apple: fallback, waze: fallback };
  }
  const coordinates = `${item.latitude},${item.longitude}`;
  const encoded = encodeURIComponent(coordinates);
  return {
    google: `https://www.google.com/maps/dir/?api=1&destination=${encoded}&dir_action=navigate`,
    apple: `https://maps.apple.com/directions?destination=${encoded}`,
    waze: `https://waze.com/ul?ll=${encoded}&navigate=yes&utm_source=discover-burgas`,
  };
}
