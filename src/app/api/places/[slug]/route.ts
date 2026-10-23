import { NextRequest, NextResponse } from "next/server";
import { loadLandmark } from "@/lib/backend";
import { isLocale } from "@/types/content";
export async function GET(request:NextRequest,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const locale=request.nextUrl.searchParams.get("locale")||"bg";if(!isLocale(locale))return NextResponse.json({error:"Unsupported locale"},{status:400});const item=await loadLandmark(slug);if(!item)return NextResponse.json({error:"Not found"},{status:404});return NextResponse.json({...item,...item.translations[locale],translations:undefined});}
