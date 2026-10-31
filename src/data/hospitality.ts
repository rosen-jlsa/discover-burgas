// Public factual summaries, verified against each venue's own website on 2026-10-26.
// No third-party photos, reviews, availability, prices or coordinates are copied.
export const venues = [
  { id: "ti-bar", name: "Ti Bar & Kitchen", categories: ["coffee", "dinner"], url: "https://ti-bar.com/bg/za-nas",
    bg: "Бар и кухня в центъра на Бургас, с предложения за кафе, десерти и хранене.",
    en: "A bar and kitchen in central Burgas, with coffee, desserts and dining.",
    search: "Ti Bar & Kitchen Burgas", checked: "2026-10-26" },
  { id: "neptun", name: "Neptun Restaurant & Bar", categories: ["dinner", "seaside"], url: "https://www.neptunburgas.com/en/restaurant",
    bg: "Ресторант и бар край морето, в близост до центъра на Бургас.",
    en: "A seafront restaurant and bar near central Burgas.",
    search: "Neptun Restaurant Burgas", checked: "2026-10-26" },
] as const;
export function mapsSearch(query: string) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}
export const stayLinks = {
  booking: "https://www.booking.com/searchresults.html?ss=Burgas%2C%20Bulgaria",
  airbnb: "https://www.airbnb.com/burgas-bulgaria/stays",
};
