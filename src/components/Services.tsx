"use client";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("services");
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="max-w-xl mb-12">
          <h2 className="text-3xl font-bold mb-3">{t("title")}</h2>
          <p className="text-ink-muted">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-5">
          <div className="rounded-2xl border border-white/8 p-10 flex flex-col justify-end min-h-[320px] relative bg-gradient-to-br from-bg-deep-2 to-[#0f1626]">
            <span className="absolute top-6 inset-inline-start-6 text-xs text-brand-teal font-en">01 · Products</span>
            <h3 className="text-2xl font-bold mb-2">موقع يحوّل الزائر إلى عميل</h3>
            <p className="text-ink-muted max-w-md">مواقع وتطبيقات ويب سريعة، متوافقة مع محركات البحث، ومبنية لتحويل الزيارات إلى طلبات حقيقية.</p>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { h: "تطبيق يبقى قريبًا من مستخدميك", p: "تطبيقات جوال iOS وAndroid بتجربة عربية أصلية وإشعارات لحظية." },
              { h: "ERP يوحّد العمليات والمالية", p: "نظام واحد للمبيعات والمخزون والمحاسبة والموارد البشرية." },
              { h: "بيانات تتحول إلى قرار", p: "لوحات ذكاء أعمال تربط مصادر بياناتك المتفرقة في مكان واحد." },
            ].map((c) => (
              <div key={c.h} className="flex-1 rounded-xl border border-white/7 bg-bg-deep-2 p-6 hover:border-brand-blue transition">
                <h4 className="font-semibold mb-1.5">{c.h}</h4>
                <p className="text-ink-muted text-sm">{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
