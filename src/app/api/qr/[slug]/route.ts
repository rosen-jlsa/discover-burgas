import { type NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

import { slugSchema } from "@/lib/api-validation";
import { loadLandmark } from "@/lib/backend";
import { apiError } from "@/lib/http";
import { placeUrl } from "@/lib/qr";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsedSlug = slugSchema.safeParse(slug);
  if (!parsedSlug.success) return apiError("Invalid landmark slug", 400, "INVALID_REQUEST");

  try {
    if (!await loadLandmark(parsedSlug.data)) return apiError("Landmark not found", 404, "NOT_FOUND");
    const format = request.nextUrl.searchParams.get("format") || "svg";
    if (format !== "svg" && format !== "png") return apiError("Format must be svg or png", 400, "INVALID_REQUEST");
    const url = placeUrl(parsedSlug.data);
    if (format === "png") {
      const png = await QRCode.toBuffer(url, {
        type: "png", width: 1200, margin: 4, errorCorrectionLevel: "H", color: { dark: "#000000", light: "#ffffff" },
      });
      return new NextResponse(new Uint8Array(png), { headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="${parsedSlug.data}-qr.png"`,
        "Cache-Control": "public, max-age=86400",
      } });
    }
    const svg = await QRCode.toString(url, { type: "svg", margin: 4, errorCorrectionLevel: "H", color: { dark: "#000000", light: "#ffffff" } });
    return new NextResponse(svg, { headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `inline; filename="${parsedSlug.data}-qr.svg"`,
      "Cache-Control": "public, max-age=86400",
    } });
  } catch {
    return apiError("QR generation temporarily unavailable", 503, "UNAVAILABLE");
  }
}
