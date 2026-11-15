import { NextResponse } from "next/server";

export const noStore = { "Cache-Control": "private, no-store, max-age=0" };
export const publicCache = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" };

export type ApiErrorCode = "INVALID_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED" | "RATE_LIMITED" | "CONFLICT" | "UNAVAILABLE";

export function apiError(message: string, status: number, code: ApiErrorCode = "INVALID_REQUEST", details?: unknown) {
  return NextResponse.json(
    { error: { code, message, ...(details === undefined ? {} : { details }) } },
    { status, headers: noStore },
  );
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";
  return origin === new URL(request.url).origin;
}

// Bound the streamed body too: Content-Length can be absent or dishonest.
export async function boundedBody(request: Request, maximumBytes = 16_384) {
  if (Number(request.headers.get("content-length")) > maximumBytes) throw new Error("body-too-large");
  const reader = request.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let text = "";
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximumBytes) { await reader.cancel(); throw new Error("body-too-large"); }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally { reader.releaseLock(); }
}
