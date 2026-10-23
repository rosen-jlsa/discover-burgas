"use client";

import { useState } from "react";
import type { Locale } from "@/types/content";

export function ReportForm({ locale }: { locale: Locale }) {
  const isBg = locale === "bg";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(formData: FormData) {
    setState("sending");
    const response = await fetch("/api/reports", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
    setState(response.ok ? "sent" : "error");
  }

  return <form className="report-form" action={submit}>
    <label>{isBg ? "Какъв е проблемът?" : "What is the issue?"}<select name="category" defaultValue="map">
      <option value="map">{isBg ? "Карта или навигация" : "Map or navigation"}</option><option value="api">API</option>
      <option value="content">{isBg ? "Съдържание или факт" : "Content or fact"}</option><option value="accessibility">{isBg ? "Достъпност" : "Accessibility"}</option><option value="other">{isBg ? "Друго" : "Other"}</option>
    </select></label>
    <label>{isBg ? "Страница (по желание)" : "Page (optional)"}<input name="page" placeholder="/bg/map" maxLength={300}/></label>
    <label>{isBg ? "Опиши какво се случи" : "Describe what happened"}<textarea name="message" minLength={10} maxLength={2000} required rows={7}/></label>
    <label>{isBg ? "Контакт (по желание)" : "Contact (optional)"}<input name="contact" maxLength={200}/></label>
    <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button className="button" disabled={state === "sending"}>{state === "sending" ? (isBg ? "Изпращане…" : "Sending…") : (isBg ? "Изпрати сигнал" : "Send report")}</button>
    <p role="status" className={`form-status ${state}`}>{state === "sent" ? (isBg ? "Благодарим. Сигналът е записан за преглед." : "Thank you. The report is ready for review.") : state === "error" ? (isBg ? "Не успяхме да изпратим сигнала. Опитай отново." : "The report could not be sent. Please try again.") : ""}</p>
  </form>;
}
