import { z } from "zod";

export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const translationSchema = z.object({
  name: z.string().min(2), short: z.string().min(10), description: z.string().min(20),
  history: z.string().min(20), facts: z.array(z.string().min(5)).min(2), keywords: z.array(z.string()).min(2)
});

export const imageSchema = z.object({
  path: z.string().startsWith("/"), creator: z.string(), sourceUrl: z.string().url(),
  license: z.string(), attribution: z.string()
});

export const sourceSchema = z.object({
  title: z.string(), url: z.string().url(), publisher: z.string(), verifiedAt: z.string().date()
});

export const landmarkSchema = z.object({
  id: z.string(), slug: z.string().regex(/^[a-z0-9-]+$/), category: z.string(), municipality: z.string(),
  area: z.string(), address: z.string().nullable(), latitude: z.number().min(-90).max(90).nullable(), longitude: z.number().min(-180).max(180).nullable(),
  officialUrl: z.string().url().nullable(), accessibility: z.string().nullable(), openingHours: z.string().nullable(),
  entryFees: z.string().nullable(), lastVerifiedAt: z.string().date(), status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false), translations: z.object({ bg: translationSchema, en: translationSchema }),
  images: z.array(imageSchema), sources: z.array(sourceSchema).min(1)
});

export type Landmark = z.infer<typeof landmarkSchema>;
export type LandmarkTranslation = z.infer<typeof translationSchema>;
export type ImageAsset = z.infer<typeof imageSchema>;
export type SourceReference = z.infer<typeof sourceSchema>;
export type PublicationStatus = Landmark["status"];

export const routeSchema = z.object({
  id: z.string(), slug: z.string(), transportMode: z.enum(["WALKING", "DRIVING", "BOAT", "MIXED"]),
  translations: z.object({
    bg: z.object({ title: z.string(), description: z.string() }),
    en: z.object({ title: z.string(), description: z.string() })
  }),
  stops: z.array(z.object({ landmarkSlug: z.string(), note: z.object({ bg: z.string(), en: z.string() }) })).min(2)
});
export type CulturalRoute = z.infer<typeof routeSchema>;
export type TransportMode = CulturalRoute["transportMode"];
