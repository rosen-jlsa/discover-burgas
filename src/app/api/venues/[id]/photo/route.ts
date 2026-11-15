import { NextResponse } from "next/server";
import { venues } from "@/data/hospitality";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type GoogleSearchResult = {
  places?: Array<{
    displayName?: { text?: string };
    photos?: Array<{
      name?: string;
      googleMapsUri?: string;
      authorAttributions?: Array<{ displayName?: string; uri?: string }>;
    }>;
    googleMapsUri?: string;
  }>;
};

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const venue = venues.find((entry) => entry.id === id);
  if (!venue) return noStoreJson({ error: "Venue not found" }, 404);

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return noStoreJson({ error: "Google Places photos are not configured" }, 503);

  try {
    const searchResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.photos.name,places.photos.authorAttributions,places.photos.googleMapsUri,places.googleMapsUri",
      },
      body: JSON.stringify({ textQuery: venue.search, languageCode: "bg" }),
    });
    if (!searchResponse.ok) return noStoreJson({ error: "Google Places search failed" }, 502);
    const searchData = await searchResponse.json() as GoogleSearchResult;
    const place = searchData.places?.find((candidate) => candidate.photos?.[0]?.name);
    const photo = place?.photos?.[0];
    if (!place || !photo?.name || !photo.name.startsWith("places/") || !place.googleMapsUri?.startsWith("https://")) {
      return noStoreJson({ error: "No Google Places photo is available for this venue" }, 404);
    }
    const distinctiveTokens: Record<string, string[]> = {
      "ti-bar": ["ti"], neptun: ["neptun"], "fabric-club": ["fabric"], "dock-5": ["dock"],
      "rubik-84": ["rubik"], "hashtag-culture": ["hashtag"], "la-ferme": ["ferme"],
      norma: ["norma"], "old-pub": ["old"], broadway: ["broadway"],
    };
    const distinctNameTokens = distinctiveTokens[id] ?? [];
    const matchedName = place.displayName?.text?.toLocaleLowerCase() ?? "";
    if (!distinctNameTokens.some((token) => matchedName.includes(token))) return noStoreJson({ error: "Google Places returned a different venue" }, 404);

    const photoUrl = new URL(`https://places.googleapis.com/v1/${photo.name}/media`);
    photoUrl.searchParams.set("maxWidthPx", "1200");
    photoUrl.searchParams.set("skipHttpRedirect", "true");
    const photoResponse = await fetch(photoUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: { "X-Goog-Api-Key": apiKey },
    });
    if (!photoResponse.ok) return noStoreJson({ error: "Google Places photo could not be loaded" }, 502);
    const photoData = await photoResponse.json() as { photoUri?: string };
    if (!photoData.photoUri || !photoData.photoUri.startsWith("https://")) return noStoreJson({ error: "Invalid photo response" }, 502);

    const authorAttributions = (photo.authorAttributions ?? []).flatMap((author) => author.displayName ? [{ displayName: author.displayName, ...(author.uri?.startsWith("https://") ? { uri: author.uri } : {}) }] : []);
    return noStoreJson({ photoUri: photoData.photoUri, googleMapsUri: photo.googleMapsUri?.startsWith("https://") ? photo.googleMapsUri : place.googleMapsUri, authorAttributions });
  } catch {
    return noStoreJson({ error: "Google Places photo service is temporarily unavailable" }, 502);
  }
}
