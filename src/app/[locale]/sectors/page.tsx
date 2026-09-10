import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { sectorsList } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  ShoppingBag,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Plane,
  Truck,
  HandHeart,
  Building2,
  Factory,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// نفس ترتيب sectorsList في site-data.ts — أيقونة لكل قطاع بحسب الفهرس
const SECTOR_ICONS: LucideIcon[] = [
  ShoppingBag,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Plane,
  Truck,
  HandHeart,
  Building2,
  Factory,
  Landmark,
];


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "القطاعات" : "Sectors",
    description: isAr ? "حلول تقنية مصممة حسب خصوصية كل قطاع: التجارة، التعليم، الصحة، اللوجستيات، وغيرها." : "Technology solutions tailored to each sector: retail, education, healthcare, logistics, and more.",
  };
}

export default async function SectorsPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main id="main-content">
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "القطاعات" : "Sectors"}
        title={locale === "ar" ? "حلول مصممة حسب خصوصية كل قطاع" : "Solutions designed for the specifics of each sector"}
        lead={
          locale === "ar"
            ? "نفس المنهجية، لكن القرارات التقنية تختلف حسب طبيعة عملك."
            : "Same methodology, but the technical decisions change based on how your business actually works."
        }
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {sectorsList.map((s, i) => {
          const Icon = SECTOR_ICONS[i];
          return (
            <div key={s.ar} className="glow-card rounded-xl border border-border-subtle bg-bg-deep-2 text-center px-3 py-6 hover:border-brand-blue hover:-translate-y-0.5 transition">
              <Icon size={20} className="mx-auto mb-2 text-brand-teal" />
              {s[locale]}
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}
