import { createHash } from "node:crypto";

export type ReportHashInput = { category: string; page: string; message: string; contact?: string };

export function reportRequestHash(input: ReportHashInput) {
  return createHash("sha256").update(JSON.stringify({
    category: input.category,
    page: input.page,
    message: input.message,
    contact: input.contact ?? "",
  })).digest("hex");
}
