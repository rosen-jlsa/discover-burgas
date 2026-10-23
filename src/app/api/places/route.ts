import { NextRequest, NextResponse } from "next/server";
import { searchBackendLandmarks } from "@/lib/backend";
import { isLocale } from "@/types/content";

export async function GET(request:NextRequest){const p=request.nextUrl.searchParams;const locale=p.get("locale")||"bg";if(!isLocale(locale))return NextResponse.json({error:"Unsupported locale"},{status:400});const items=(await searchBackendLandmarks(locale,p.get("q")||"",p.get("category")||"",p.get("area")||"")).map((item)=>({id:item.id,slug:item.slug,category:item.category,area:item.area,latitude:item.latitude,longitude:item.longitude,...item.translations[locale]}));return NextResponse.json({items,count:items.length,locale});}
