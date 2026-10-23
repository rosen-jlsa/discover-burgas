import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";
import { appBaseUrl } from "@/lib/qr";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl()),
  title: { default: "Открий Бургас", template: "%s · Открий Бургас" },
  description: "Интерактивна платформа за културното наследство на Бургас.",
  manifest: "/manifest.webmanifest",
  applicationName: "Открий Бургас",
  authors: [{ name: "Discover Burgas" }],
  category: "travel",
  openGraph: {
    type: "website",
    siteName: "Открий Бургас",
    title: "Открий Бургас",
    description: "Културни истории, реални места и QR маршрути около Бургас.",
    locale: "bg_BG",
  },
  twitter: { card: "summary_large_image", title: "Открий Бургас", description: "Всяко място разказва история." },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/icon-192.png" }
};
export const viewport: Viewport = { themeColor: "#123B52", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bg" data-scroll-behavior="smooth"><body><ServiceWorker/>{children}</body></html>;
}
