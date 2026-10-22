import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getLandmark } from "@/lib/content";

export default async function StablePlacePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getLandmark(slug))notFound();const accept=(await headers()).get("accept-language")||"";const locale=accept.toLowerCase().startsWith("en")?"en":"bg";redirect(`/${locale}/places/${slug}`);}
