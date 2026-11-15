"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const targets = [
  ".aevo-statement",
  ".choose-path",
  ".phone-guide-copy",
  ".phone-stage",
  ".rebuild-map-head",
  ".rebuild-live-map",
  ".section-head",
  ".place-card",
  ".editorial-route",
  ".leisure-tile",
  ".stay-banner",
  ".history-teaser",
  ".final-blue",
  ".map-page-head",
  ".map-toolbar",
  ".filter-row",
  ".map-layout",
  ".place-hero",
  ".place-content",
  ".route-page > *",
  ".travel-page > *",
  ".story-page > *",
  ".demo-page > *",
  ".stay-section-heading",
  ".stay-search-module",
  ".stay-route-band",
  ".history-section-heading",
  ".history-chapter",
  ".history-future-grid",
  ".history-platform-heading",
  ".history-platform-flow > article",
  ".history-sources",
];

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    const nodes = document.querySelectorAll<HTMLElement>(targets.join(","));
    nodes.forEach((node, index) => {
      node.classList.add("motion-reveal");
      node.style.setProperty("--motion-order", String(index % 5));
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
