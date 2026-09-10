import type { MetadataRoute } from "next";
import { services, caseStudies } from "@/lib/site-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nexora.example.com";
const LOCALES = ["ar", "en"] as const;
const STATIC_PATHS = ["", "/services", "/work", "/sectors", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${BASE_URL}/${locale}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 });
    }
    for (const s of services) {
      entries.push({ url: `${BASE_URL}/${locale}/services/${s.slug}`, changeFrequency: "monthly", priority: 0.6 });
    }
    for (const c of caseStudies) {
      entries.push({ url: `${BASE_URL}/${locale}/work/${c.slug}`, changeFrequency: "monthly", priority: 0.5 });
    }
  }

  return entries;
}
