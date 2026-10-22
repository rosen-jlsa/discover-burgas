import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { getLandmark } from "@/lib/content";
import { placeUrl } from "@/lib/qr";

export async function GET(request:NextRequest,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getLandmark(slug))return NextResponse.json({error:"Not found"},{status:404});const format=request.nextUrl.searchParams.get("format")||"svg";const url=placeUrl(slug);if(format==="png"){const png=await QRCode.toBuffer(url,{type:"png",width:1200,margin:4,errorCorrectionLevel:"H",color:{dark:"#000000",light:"#ffffff"}});return new NextResponse(new Uint8Array(png),{headers:{"Content-Type":"image/png","Content-Disposition":`inline; filename="${slug}-qr.png"`,"Cache-Control":"public, max-age=86400"}});}if(format!=="svg")return NextResponse.json({error:"format must be svg or png"},{status:400});const svg=await QRCode.toString(url,{type:"svg",margin:4,errorCorrectionLevel:"H",color:{dark:"#000000",light:"#ffffff"}});return new NextResponse(svg,{headers:{"Content-Type":"image/svg+xml","Content-Disposition":`inline; filename="${slug}-qr.svg"`,"Cache-Control":"public, max-age=86400"}});}
