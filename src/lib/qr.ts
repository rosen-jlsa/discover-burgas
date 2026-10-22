export function placeUrl(slug: string, base = process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000") {
  return `${base.replace(/\/$/, "")}/places/${slug}`;
}
