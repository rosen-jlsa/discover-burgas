"use client";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Link from "next/link";
import type { Landmark, Locale } from "@/types/content";

function Focus({ selected }: { selected?: Landmark }) { const map = useMap(); useEffect(() => { if (selected?.latitude != null && selected.longitude != null) map.flyTo([selected.latitude, selected.longitude], 15, { duration: .7 }); }, [map, selected]); return null; }
const icon = (selected: boolean) => L.divIcon({ className: "heritage-marker-wrap", html: `<span class="heritage-marker${selected ? " selected" : ""}"><i></i></span>`, iconSize: [34, 42], iconAnchor: [17, 42] });

export default function MapCanvas({ items, locale, selectedSlug, userLocation }: { items: Landmark[]; locale: Locale; selectedSlug?: string; userLocation?: [number, number] }) {
  const center: [number, number] = userLocation || [42.5048, 27.4626]; const selected = items.find((item) => item.slug === selectedSlug);
  return <MapContainer center={center} zoom={12} scrollWheelZoom className="leaflet-map">
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <Focus selected={selected}/>
    {items.filter((item) => item.latitude != null && item.longitude != null).map((item) => <Marker key={item.slug} position={[item.latitude!, item.longitude!]} icon={icon(item.slug === selectedSlug)} alt={item.translations[locale].name} title={item.translations[locale].name}><Popup><strong>{item.translations[locale].name}</strong><br/><Link href={`/${locale}/places/${item.slug}`}>{locale === "bg" ? "Виж мястото" : "View place"}</Link></Popup></Marker>)}
    {userLocation && <Marker position={userLocation} icon={L.divIcon({ className: "user-marker", html: "<span></span>", iconSize: [20,20] })} alt={locale === "bg" ? "Вашето местоположение" : "Your location"} title={locale === "bg" ? "Вашето местоположение" : "Your location"}><Popup>{locale === "bg" ? "Вашето местоположение" : "Your location"}</Popup></Marker>}
  </MapContainer>;
}
