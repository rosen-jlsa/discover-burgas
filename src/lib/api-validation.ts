import { z } from "zod";
import { categories } from "@/data/landmarks";

export const slugSchema = z.string().max(100).regex(/^[a-z0-9-]+$/);
export const placeFiltersSchema = z.object({
  locale: z.enum(["bg", "en"]).default("bg"),
  q: z.string().trim().max(120).default(""),
  category: z.string().max(80).default("").refine(value => !value || categories.some(category => category.id === value)),
  area: z.string().trim().max(100).default(""),
  interest: z.string().trim().max(100).default(""),
  scope: z.enum(["all", "burgas", "region"]).default("all"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
  sort: z.enum(["name", "verifiedAt"]).default("name"),
}).strict();

export const localeQuerySchema = z.object({
  locale: z.enum(["bg", "en"]).default("bg"),
}).strict();

export const nearbyQuerySchema = localeQuerySchema.extend({
  limit: z.coerce.number().int().min(1).max(12).default(3),
  radiusKm: z.coerce.number().min(0.1).max(100).default(3),
}).strict();

export const routeFiltersSchema = z.object({
  locale: z.enum(["bg", "en"]).default("bg"),
  transportMode: z.enum(["WALKING", "DRIVING", "BOAT", "MIXED"]).optional(),
}).strict();
export const reportStatusSchema = z.enum(["new", "reviewing", "resolved"]);
export type ReportStatus = z.infer<typeof reportStatusSchema>;
