export function appBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function placeUrl(slug: string, base = appBaseUrl()) {
  return `${base.replace(/\/$/, "")}/places/${slug}`;
}
