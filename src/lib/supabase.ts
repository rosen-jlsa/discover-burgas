import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

const urlSchema = z.string().url();
const options = {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  // Bound the content cache and invalidate the previous release's empty-photo data.
  global: { fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const headers=new Headers(init?.headers);
    headers.set("x-discover-burgas-content-version","2026-11-21-photos");
    return fetch(input, { ...init, headers, cache: "force-cache", next: { revalidate: 60 } });
  } },
} as const;

function endpoint() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  return value && urlSchema.safeParse(value).success ? value : undefined;
}
function readKey() { return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim(); }
function adminKey() { return process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(); }

export function isSupabaseReadable() { return Boolean(endpoint() && readKey()); }
export function isSupabaseWritable() { return Boolean(endpoint() && adminKey()); }
export function getSupabaseReadClient(): SupabaseClient | null { const url = endpoint(); const key = readKey(); return url && key ? createClient(url, key, options) : null; }
export function getSupabaseAdminClient(): SupabaseClient | null { const url = endpoint(); const key = adminKey(); return url && key ? createClient(url, key, {auth:options.auth,global:{fetch:(input,init)=>fetch(input,{...init,cache:"no-store"})}}) : null; }
