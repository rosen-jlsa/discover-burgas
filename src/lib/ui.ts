import type { Locale } from "@/types/content";

export const copy = {
  bg: { navHome: "Начало", navMap: "Карта", navRoute: "Маршрут", navDemo: "Демо", explore: "Разгледай картата", places: "Забележителности", learn: "Научи повече", nearby: "Наблизо", directions: "Упътване", sources: "Източници", facts: "Любопитни факти", history: "Историята", save: "Запази", saved: "Запазено", verified: "Проверено", all: "Всички" },
  en: { navHome: "Home", navMap: "Map", navRoute: "Route", navDemo: "Demo", explore: "Explore the map", places: "Places", learn: "Learn more", nearby: "Nearby", directions: "Directions", sources: "Sources", facts: "Key facts", history: "The story", save: "Save", saved: "Saved", verified: "Verified", all: "All" }
} satisfies Record<Locale, Record<string, string>>;
