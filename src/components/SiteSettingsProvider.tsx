"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteSettings } from "@/lib/get-site-settings";

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: ReactNode;
}) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettings {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    // قيمة احتياطية إن استُخدم الهوك خارج المزوّد (لا يجب أن يحدث عمليًا)
    return {
      nameAr: "نكسورا تك",
      nameEn: "NEXORA TECH",
      taglineAr: "نحوّل الأفكار إلى أنظمة رقمية تعمل وتنمو",
      taglineEn: "We turn ideas into digital systems that work and grow",
      email: "info@nexora.local",
      phone: null,
      whatsapp: null,
    };
  }
  return ctx;
}
