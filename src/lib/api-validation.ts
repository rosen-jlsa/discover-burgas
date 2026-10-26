import { z } from "zod";
import { categories } from "@/data/landmarks";

export const slugSchema = z.string().max(100).regex(/^[a-z0-9-]+$/);
export const placeFiltersSchema = z.object({
  locale: z.enum(["bg", "en"]).default("bg"),
  q: z.string().trim().max(120).default(""),
  category: z.string().max(80).default("").refine(value => !value || categories.some(category => category.id === value)),
  area: z.string().trim().max(100).default(""),
}).strict();
export const reportStatusSchema = z.enum(["new", "reviewing", "resolved"]);
export type ReportStatus = z.infer<typeof reportStatusSchema>;
