"use client";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Globe, Smartphone, Boxes, BarChart3, type LucideIcon } from "lucide-react";

const SMALL_CARDS: { slug: string; h: string; p: string; icon: LucideIcon }[] = [
  { slug: "mobile-apps", h: "تطبيق يبقى قريبًا من مستخدميك", p: "تطبيقات جوال iOS وAndroid بتجربة عربية أصلية وإشعارات لحظية.", icon: Smartphone },
  { slug: "erp", h: "ERP يوحّد العمليات والمالية", p: "نظام واحد للمبيعات والمخزون والمحاسبة والموارد البشرية.", icon: Boxes },
  { slug: "dashboards-bi", h: "بيانات تتحول إلى قرار", p: "لوحات ذكاء أعمال تربط مصادر بياناتك المتفرقة في مكان واحد.", icon: BarChart3 },
];

export default function Services() {
  const t = useTranslations("services");
  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 600px 350px at 100% 0%, rgba(42,92,255,.08), transparent 60%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-xl mb-12">
          <h2 className="text-3xl font-bold mb-3">{t("title")}</h2>
          <p className="text-ink-muted">{t("subtitle")}</p>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-5">
          <Link href="/services/web-design-dev" className="glow-card rounded-2xl border border-border-subtle p-10 flex flex-col justify-end min-h-[320px] relative bg-gradient-to-br from-bg-deep-2 to-bg-deep hover:border-brand-blue transition">
            <Globe size={28} className="absolute top-8 inset-inline-end-8 text-brand-teal/50" />
            <span className="absolute top-6 inset-inline-start-6 text-xs text-brand-teal font-en">01 · Products</span>
            <h3 className="text-2xl font-bold mb-2">موقع يحوّل الزائر إلى عميل</h3>
            <p className="text-ink-muted max-w-md">مواقع وتطبيقات ويب سريعة، متوافقة مع محركات البحث، ومبنية لتحويل الزيارات إلى طلبات حقيقية.</p>
          </Link>
          <div className="flex flex-col gap-5">
            {SMALL_CARDS.map((c) => (
              <Link href={`/services/${c.slug}`} key={c.h} className="glow-card flex-1 rounded-xl border border-border-subtle bg-bg-deep-2 p-6 hover:border-brand-blue transition block">
                <c.icon size={22} className="text-brand-teal mb-2.5" />
                <h4 className="font-semibold mb-1.5">{c.h}</h4>
                <p className="text-ink-muted text-sm">{c.p}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
