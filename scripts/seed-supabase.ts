import { createClient } from "@supabase/supabase-js";
import { categories, landmarks, routes } from "../src/data/landmarks.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const seedToken = process.env.SUPABASE_SEED_TOKEN?.trim();
const key = secretKey || (seedToken ? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() : undefined);
if (!url || !key) throw new Error("Set the Supabase URL plus a secret key, or a publishable key with a temporary SUPABASE_SEED_TOKEN.");
const db = createClient(url, key, { global: { headers: seedToken ? { "x-seed-token": seedToken } : {} }, auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });

async function main() {
  const { error: categoryError } = await db.from("categories").upsert(categories.map((item, index) => ({ slug: item.id, labels: { bg: item.bg, en: item.en }, sort_order: index })), { onConflict: "slug" });
  if (categoryError) throw categoryError;

  const { error: landmarkError } = await db.from("landmarks").upsert(landmarks.map((item) => ({
    id: item.id, slug: item.slug, category: item.category, municipality: item.municipality, area: item.area,
    address: item.address, latitude: item.latitude, longitude: item.longitude, official_url: item.officialUrl,
    accessibility: item.accessibility, opening_hours: item.openingHours, entry_fees: item.entryFees,
    last_verified_at: item.lastVerifiedAt, status: item.status, featured: item.featured,
    translations: item.translations, images: item.images, sources: item.sources, updated_at: new Date().toISOString()
  })), { onConflict: "id" });
  if (landmarkError) throw landmarkError;

  const { error: routeError } = await db.from("cultural_routes").upsert(routes.map((route) => ({
    id: route.id, slug: route.slug, transport_mode: route.transportMode, translations: route.translations,
    stops: route.stops, published: true, updated_at: new Date().toISOString()
  })), { onConflict: "id" });
  if (routeError) throw routeError;

  console.log(`Seeded ${landmarks.length} landmarks, ${categories.length} categories and ${routes.length} routes.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
