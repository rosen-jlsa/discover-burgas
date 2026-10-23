import "server-only";
import { getSupabaseAdminClient, getSupabaseReadClient } from "@/lib/supabase";

export type IssueReport = { id:string;createdAt:string;category:"map"|"api"|"content"|"accessibility"|"other";page:string;message:string;contact?:string;status:"new" };
declare global { var __discoverBurgasReports: IssueReport[] | undefined; }
const reports=globalThis.__discoverBurgasReports??[];
globalThis.__discoverBurgasReports=reports;

function mapRow(row: Record<string, unknown>):IssueReport { return { id:String(row.id),createdAt:String(row.created_at),category:row.category as IssueReport["category"],page:String(row.page||""),message:String(row.message),contact:row.contact?String(row.contact):undefined,status:"new" }; }

export async function addReport(input:Omit<IssueReport,"id"|"createdAt"|"status">) {
  const admin=getSupabaseAdminClient();
  if(admin){const {data,error}=await admin.from("issue_reports").insert({category:input.category,page:input.page,message:input.message,contact:input.contact||null}).select("id,created_at,category,page,message,contact,status").single();if(error)throw new Error(`Could not save report: ${error.message}`);return mapRow(data);}
  const publicClient=getSupabaseReadClient();
  if(publicClient){const {data,error}=await publicClient.rpc("submit_issue_report",{p_category:input.category,p_page:input.page,p_message:input.message,p_contact:input.contact||null});if(error)throw new Error(`Could not save report: ${error.message}`);return mapRow((Array.isArray(data)?data[0]:data) as Record<string,unknown>);}
  const report:IssueReport={...input,id:crypto.randomUUID(),createdAt:new Date().toISOString(),status:"new"};reports.unshift(report);reports.splice(100);return report;
}

export async function getReports(){const admin=getSupabaseAdminClient();if(admin){const {data,error}=await admin.from("issue_reports").select("id,created_at,category,page,message,contact,status").order("created_at",{ascending:false}).limit(100);if(error)throw new Error(`Could not load reports: ${error.message}`);return data.map(mapRow);}return [...reports];}
