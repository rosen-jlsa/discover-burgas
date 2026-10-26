import "server-only";
import { landmarks as manifestLandmarks, routes as manifestRoutes } from "@/data/landmarks";
import { landmarkSchema, routeSchema, type CulturalRoute, type Landmark, type Locale } from "@/types/content";
import { getSupabaseReadClient, isSupabaseReadable } from "@/lib/supabase";

type LandmarkRow = { id:string;slug:string;category:string;municipality:string;area:string;address:string|null;latitude:number|null;longitude:number|null;official_url:string|null;accessibility:string|null;opening_hours:string|null;entry_fees:string|null;last_verified_at:string;status:Landmark["status"];featured:boolean;translations:Landmark["translations"];images:Landmark["images"];sources:Landmark["sources"] };
function rowToLandmark(row: LandmarkRow): Landmark { return landmarkSchema.parse({ id:row.id,slug:row.slug,category:row.category,municipality:row.municipality,area:row.area,address:row.address,latitude:row.latitude,longitude:row.longitude,officialUrl:row.official_url,accessibility:row.accessibility,openingHours:row.opening_hours,entryFees:row.entry_fees,lastVerifiedAt:row.last_verified_at,status:row.status,featured:row.featured,translations:row.translations,images:row.images,sources:row.sources }); }
function manifestFallbackEnabled() { return process.env.CONTENT_BACKEND !== "supabase"; }

export async function loadPublishedLandmarks(): Promise<Landmark[]> {
  if (manifestFallbackEnabled()) return manifestLandmarks.filter(item => item.status === "PUBLISHED");
  const client=getSupabaseReadClient();
  if(client){const {data,error}=await client.from("landmarks").select("*").eq("status","PUBLISHED").order("slug");if(!error)return (data as LandmarkRow[]).map(rowToLandmark);if(!manifestFallbackEnabled())throw new Error(`Supabase landmarks query failed: ${error.message}`);console.error("Supabase unavailable; using validated manifest fallback.",error.message);}
  if(!manifestFallbackEnabled()&&!isSupabaseReadable())throw new Error("CONTENT_BACKEND=supabase but Supabase read credentials are missing.");
  return manifestLandmarks.filter((item)=>item.status==="PUBLISHED");
}
export async function loadLandmark(slug:string){return (await loadPublishedLandmarks()).find((item)=>item.slug===slug);}
export async function loadRoutes(): Promise<CulturalRoute[]> {
  if (manifestFallbackEnabled()) return manifestRoutes;
  const client = getSupabaseReadClient();
  if (!client) throw new Error("Supabase public read configuration is missing.");
  const { data, error } = await client.from("cultural_routes").select("id,slug,transport_mode,translations,stops").eq("published", true).order("slug");
  if (error) throw new Error("Supabase routes query failed.");
  const published = new Set((await loadPublishedLandmarks()).map(item => item.slug));
  return data.map(row => routeSchema.parse({ id: row.id, slug: row.slug, transportMode: row.transport_mode, translations: row.translations, stops: row.stops }))
    .filter(route => route.stops.every(stop => published.has(stop.landmarkSlug)));
}
export async function loadRoute(slug:string){return (await loadRoutes()).find((item)=>item.slug===slug);}
export async function searchBackendLandmarks(locale:Locale,query="",category="",area=""){const needle=query.trim().toLocaleLowerCase(locale);return (await loadPublishedLandmarks()).filter((item)=>{const t=item.translations[locale];const haystack=[t.name,t.short,t.description,...t.keywords,item.area].join(" ").toLocaleLowerCase(locale);return(!needle||haystack.includes(needle))&&(!category||item.category===category)&&(!area||item.area===area);});}
export function backendMode(){return manifestFallbackEnabled()?"manifest":"supabase";}
