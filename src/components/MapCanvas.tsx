"use client";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Link from "next/link";
import type { Landmark, Locale } from "@/types/content";

function Focus({ selected, items, userLocation }: { selected?: Landmark; items: Landmark[]; userLocation?: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (userLocation) { map.setView(userLocation, 14, { animate }); return; }
    if (selected?.latitude != null && selected.longitude != null) { map.setView([selected.latitude, selected.longitude], 15, { animate }); return; }
    const points = items.filter(item => item.latitude != null && item.longitude != null).map(item => [item.latitude!, item.longitude!] as [number, number]);
    if (points.length) map.fitBounds(points, { padding: [32, 32], maxZoom: 15, animate });
  }, [map, selected, items, userLocation]);
  return null;
}
const icon = (selected: boolean) => L.divIcon({ className: "heritage-marker-wrap", html: `<span class="heritage-marker${selected ? " selected" : ""}"><i></i></span>`, iconSize: [34, 42], iconAnchor: [17, 42] });

export default function MapCanvas({ items, locale, selectedSlug, userLocation }: { items: Landmark[]; locale: Locale; selectedSlug?: string; userLocation?: [number, number] }) {
  const [tilesFailed, setTilesFailed] = useState(false);
  const center: [number, number] = userLocation || [42.5048, 27.4626]; const selected = items.find((item) => item.slug === selectedSlug);
  return <><MapContainer center={center} zoom={12} scrollWheelZoom className="leaflet-map">
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" eventHandlers={{ tileerror: () => setTilesFailed(true), tileload: () => setTilesFailed(false) }}/>
    <Focus selected={selected} items={items} userLocation={userLocation}/>
    {items.filter((item) => item.latitude != null && item.longitude != null).map((item) => <Marker key={item.slug} position={[item.latitude!, item.longitude!]} icon={icon(item.slug === selectedSlug)} alt={item.translations[locale].name} title={item.translations[locale].name}><Popup><strong>{item.translations[locale].name}</strong><br/><Link href={`/${locale}/places/${item.slug}`}>{locale === "bg" ? "Виж мястото" : "View place"}</Link></Popup></Marker>)}
    {userLocation && <Marker position={userLocation} icon={L.divIcon({ className: "user-marker", html: "<span></span>", iconSize: [20,20] })} alt={locale === "bg" ? "Вашето местоположение" : "Your location"} title={locale === "bg" ? "Вашето местоположение" : "Your location"}><Popup>{locale === "bg" ? "Вашето местоположение" : "Your location"}</Popup></Marker>}
  </MapContainer>{tilesFailed && <p role="status" className="geo-message">{locale === "bg" ? "Фонът на картата не се зареди. Местата и връзките за упътване остават достъпни в списъка." : "The map background could not load. Places and directions remain available in the list."}</p>}</>;
}
