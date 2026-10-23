import { cookies } from "next/headers";
import Link from "next/link";
import { Activity, KeyRound, LockKeyhole, LogOut, ShieldCheck } from "lucide-react";
import { ADMIN_COOKIE, adminIsConfigured, getServiceStatuses, isValidAdminCookie } from "@/lib/admin";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const cookieStore = await cookies(); const query = await searchParams;
  const authenticated = isValidAdminCookie(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!authenticated) return <main className="admin-gate"><section className="admin-login"><div className="admin-lock"><LockKeyhole/></div><p className="eyebrow">Discover Burgas · private</p><h1 className="display">System health</h1><p>This area checks configuration without exposing secret values.</p>{!adminIsConfigured() && <p className="admin-alert">ADMIN_DASHBOARD_TOKEN is not configured.</p>}{query.error && <p className="admin-alert">{query.error === "rate" ? "Too many attempts. Try again in 15 minutes." : "Incorrect access token."}</p>}<form method="post" action="/api/admin/login"><label>Access token<input type="password" name="token" autoComplete="current-password" required/></label><button className="button" type="submit">Unlock dashboard</button></form><Link href="/bg">← Back to Discover Burgas</Link></section></main>;

  const statuses = getServiceStatuses(); const reports = await getReports();
  return <main className="admin-page"><div className="shell"><header className="admin-head"><div><p className="eyebrow"><Activity size={16}/> Private operations view</p><h1 className="display">System health</h1><p>Secrets are masked by design. Only configuration presence and purpose are shown.</p></div><form method="post" action="/api/admin/logout"><button className="admin-logout"><LogOut size={17}/> Lock</button></form></header><section className="status-grid">{statuses.map((item)=><article className={`status-card ${item.status}`} key={item.environment}><div><KeyRound/><span>{item.status}</span></div><h2>{item.name}</h2><code>{item.environment}</code><p>{item.note}</p></article>)}</section><section className="admin-reports"><div className="section-head"><div><p className="eyebrow"><ShieldCheck size={16}/> Issue inbox</p><h2 className="display">Visitor reports</h2></div><p>Reports are stored in the private Supabase inbox and limited to the latest 100 entries shown here.</p></div>{reports.length ? <div className="report-list">{reports.map((report)=><article key={report.id}><span>{report.category} · {new Date(report.createdAt).toLocaleString("bg-BG")}</span><strong>{report.page || "No page supplied"}</strong><p>{report.message}</p>{report.contact && <small>Contact: {report.contact}</small>}</article>)}</div> : <div className="empty-state">No reports yet.</div>}</section></div></main>;
}
