"use client";

import { useState } from "react";
import { ArrowUpRight, BedDouble, CalendarDays, Users } from "lucide-react";
import type { Locale } from "@/types/content";
import { stayLinks } from "@/data/hospitality";

export function StaySearchPanel({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");

  function openSearch(provider: "booking" | "airbnb") {
    if (Boolean(arrival) !== Boolean(departure)) {
      setError(bg ? "Избери и двете дати или остави и двете празни." : "Choose both dates or leave both empty.");
      return;
    }
    if (arrival && departure && departure <= arrival) {
      setError(bg ? "Датата на напускане трябва да е след датата на настаняване." : "Check-out must be after check-in.");
      return;
    }
    setError("");
    const url = new URL(provider === "booking" ? stayLinks.booking : stayLinks.airbnb);
    if (arrival && departure) {
      url.searchParams.set("checkin", arrival);
      url.searchParams.set("checkout", departure);
    }
    if (provider === "booking") {
      url.searchParams.set("group_adults", guests);
      url.searchParams.set("no_rooms", "1");
    } else {
      url.searchParams.set("adults", guests);
    }
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  return <div className="stay-search-module">
    <div className="stay-search-fields">
      <label><span><CalendarDays size={16}/>{bg ? "Настаняване" : "Check in"}</span><input type="date" value={arrival} onChange={(event) => setArrival(event.target.value)} aria-label={bg ? "Дата на настаняване" : "Check-in date"}/></label>
      <label><span><CalendarDays size={16}/>{bg ? "Напускане" : "Check out"}</span><input type="date" value={departure} onChange={(event) => setDeparture(event.target.value)} aria-label={bg ? "Дата на напускане" : "Check-out date"}/></label>
      <label className="stay-guests"><span><Users size={16}/>{bg ? "Гости" : "Guests"}</span><select value={guests} onChange={(event) => setGuests(event.target.value)} aria-label={bg ? "Брой гости" : "Number of guests"}>{[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} {bg ? (n === 1 ? "гост" : "гости") : (n === 1 ? "guest" : "guests")}</option>)}</select></label>
    </div>
    <p className="stay-validation" role="status" aria-live="polite">{error}</p>
    <div className="stay-provider-options">
      <article className="stay-provider booking-provider"><div className="stay-provider-mark"><BedDouble size={20}/></div><div className="stay-provider-copy"><span>{bg ? "НАМЕРИ ХОТЕЛ ИЛИ АПАРТАМЕНТ" : "HOTELS & APARTMENTS"}</span><h3>Booking.com</h3><p>{bg ? "Сравни места за престой и условия директно в платформата." : "Compare stays and conditions directly on the platform."}</p></div><button type="button" onClick={() => openSearch("booking")}>{bg ? "Търси" : "Search"}<ArrowUpRight size={17}/></button></article>
      <article className="stay-provider airbnb-provider"><div className="stay-provider-mark"><BedDouble size={20}/></div><div className="stay-provider-copy"><span>{bg ? "ЖИЛИЩА И УНИКАЛЕН ПРЕСТОЙ" : "HOMES & UNIQUE STAYS"}</span><h3>Airbnb</h3><p>{bg ? "Разгледай домове и апартаменти в Бургас." : "Explore homes and apartments in Burgas."}</p></div><button type="button" onClick={() => openSearch("airbnb")}>{bg ? "Търси" : "Search"}<ArrowUpRight size={17}/></button></article>
    </div>
    <p className="stay-provider-disclosure">{bg ? "Ще се отвори нов раздел. Цените, наличността и резервацията се управляват от съответната платформа." : "Opens in a new tab. Prices, availability and bookings are handled by the respective platform."}</p>
  </div>;
}
