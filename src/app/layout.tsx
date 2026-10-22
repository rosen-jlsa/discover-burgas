import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: { default: "Открий Бургас", template: "%s · Открий Бургас" },
  description: "Интерактивна платформа за културното наследство на Бургас.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" }
};
export const viewport: Viewport = { themeColor: "#123B52", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bg" data-scroll-behavior="smooth"><body><ServiceWorker/>{children}</body></html>;
}
