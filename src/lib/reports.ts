export type IssueReport = {
  id: string;
  createdAt: string;
  category: "map" | "api" | "content" | "accessibility" | "other";
  page: string;
  message: string;
  contact?: string;
  status: "new";
};

declare global {
  var __discoverBurgasReports: IssueReport[] | undefined;
}

const reports = globalThis.__discoverBurgasReports ?? [];
globalThis.__discoverBurgasReports = reports;

export function addReport(input: Omit<IssueReport, "id" | "createdAt" | "status">) {
  const report: IssueReport = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "new" };
  reports.unshift(report);
  reports.splice(100);
  return report;
}

export function getReports() { return [...reports]; }
