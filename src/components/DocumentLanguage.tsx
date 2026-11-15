"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/types/content";

export function DocumentLanguage({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
