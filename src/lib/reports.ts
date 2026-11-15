import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase";
import { reportRequestHash } from "@/lib/report-hash";

export type IssueReport = {
  id: string; createdAt: string; category: "map" | "api" | "content" | "accessibility" | "other";
  page: string; message: string; contact?: string; status: "new" | "reviewing" | "resolved";
};
type NewReport = Omit<IssueReport, "id" | "createdAt" | "status">;
type StoredReport = IssueReport & { idempotencyKey?: string; requestHash?: string };

declare global { var __discoverBurgasReports: StoredReport[] | undefined; }
const reports = globalThis.__discoverBurgasReports ?? [];
globalThis.__discoverBurgasReports = reports;

function mapRow(row: Record<string, unknown>): IssueReport {
  return {
    id: String(row.id), createdAt: String(row.created_at), category: row.category as IssueReport["category"],
    page: String(row.page || ""), message: String(row.message), contact: row.contact ? String(row.contact) : undefined,
    status: row.status as IssueReport["status"],
  };
}

async function removeExpiredReports(admin: NonNullable<ReturnType<typeof getSupabaseAdminClient>>) {
  const retentionCutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { error } = await admin.from("issue_reports").delete().lt("created_at", retentionCutoff);
  if (error) throw new Error(`Could not enforce report retention: ${error.message}`);
}

export async function addReport(input: NewReport, idempotencyKey: string) {
  const requestHash = reportRequestHash(input);
  const admin = process.env.CONTENT_BACKEND === "supabase" ? getSupabaseAdminClient() : undefined;
  if (admin) {
    await removeExpiredReports(admin);
    const existing = await admin.from("issue_reports")
      .select("id,created_at,category,page,message,contact,status,request_hash")
      .eq("idempotency_key", idempotencyKey).maybeSingle();
    if (existing.error) throw new Error(`Could not check report replay: ${existing.error.message}`);
    if (existing.data) {
      if (existing.data.request_hash !== requestHash) return { kind: "conflict" as const };
      return { kind: "replay" as const, report: mapRow(existing.data) };
    }

    const { data, error } = await admin.from("issue_reports").insert({
      category: input.category, page: input.page, message: input.message, contact: input.contact || null,
      idempotency_key: idempotencyKey, request_hash: requestHash,
    }).select("id,created_at,category,page,message,contact,status").single();
    if (error?.code === "23505") {
      const raced = await admin.from("issue_reports")
        .select("id,created_at,category,page,message,contact,status,request_hash")
        .eq("idempotency_key", idempotencyKey).single();
      if (raced.error) throw new Error(`Could not resolve report replay: ${raced.error.message}`);
      return raced.data.request_hash === requestHash
        ? { kind: "replay" as const, report: mapRow(raced.data) }
        : { kind: "conflict" as const };
    }
    if (error) throw new Error(`Could not save report: ${error.message}`);
    return { kind: "created" as const, report: mapRow(data) };
  }

  if (process.env.CONTENT_BACKEND === "supabase") throw new Error("Server-only Supabase report storage is unavailable.");
  const existing = reports.find((report) => report.idempotencyKey === idempotencyKey);
  if (existing) return existing.requestHash === requestHash ? { kind: "replay" as const, report: existing } : { kind: "conflict" as const };
  const report: StoredReport = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "new", idempotencyKey, requestHash };
  reports.unshift(report);
  reports.splice(100);
  return { kind: "created" as const, report };
}

export async function getReports() {
  const admin = process.env.CONTENT_BACKEND === "supabase" ? getSupabaseAdminClient() : undefined;
  if (admin) {
    await removeExpiredReports(admin);
    const { data, error } = await admin.from("issue_reports")
      .select("id,created_at,category,page,message,contact,status").order("created_at", { ascending: false }).limit(100);
    if (error) throw new Error(`Could not load reports: ${error.message}`);
    return data.map(mapRow);
  }
  return [...reports];
}
