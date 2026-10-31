import { categories, landmarks, routes } from "../src/data/landmarks.ts";

const q = (value: unknown) => `'${String(value).replaceAll("'", "''")}'`;
const json = (value: unknown) => `${q(JSON.stringify(value))}::jsonb`;
const nullable = (value: unknown) => value == null ? "null" : q(value);

const statements = [
  ...categories.map((item, index) => `insert into public.categories (slug,labels,sort_order) values (${q(item.id)},${json({bg:item.bg,en:item.en})},${index}) on conflict (slug) do update set labels=excluded.labels,sort_order=excluded.sort_order;`),
  ...landmarks.map((item) => `insert into public.landmarks (id,slug,category,municipality,area,address,latitude,longitude,official_url,accessibility,opening_hours,entry_fees,last_verified_at,status,featured,translations,images,sources,updated_at) values (${q(item.id)},${q(item.slug)},${q(item.category)},${q(item.municipality)},${q(item.area)},${nullable(item.address)},${item.latitude ?? "null"},${item.longitude ?? "null"},${nullable(item.officialUrl)},${nullable(item.accessibility)},${nullable(item.openingHours)},${nullable(item.entryFees)},${q(item.lastVerifiedAt)},${q(item.status)},${item.featured},${json(item.translations)},${json(item.images)},${json(item.sources)},now()) on conflict (id) do update set slug=excluded.slug,category=excluded.category,municipality=excluded.municipality,area=excluded.area,address=excluded.address,latitude=excluded.latitude,longitude=excluded.longitude,official_url=excluded.official_url,accessibility=excluded.accessibility,opening_hours=excluded.opening_hours,entry_fees=excluded.entry_fees,last_verified_at=excluded.last_verified_at,status=excluded.status,featured=excluded.featured,translations=excluded.translations,images=excluded.images,sources=excluded.sources,updated_at=now();`),
  ...routes.map((route) => `insert into public.cultural_routes (id,slug,transport_mode,translations,stops,published,updated_at) values (${q(route.id)},${q(route.slug)},${q(route.transportMode)},${json(route.translations)},${json(route.stops)},true,now()) on conflict (id) do update set slug=excluded.slug,transport_mode=excluded.transport_mode,translations=excluded.translations,stops=excluded.stops,published=true,updated_at=now();`),
  `select (select count(*) from public.landmarks) as landmarks, (select count(*) from public.cultural_routes) as routes;`
];
console.log("begin;\n" + statements.join("\n") + "\ncommit;");
