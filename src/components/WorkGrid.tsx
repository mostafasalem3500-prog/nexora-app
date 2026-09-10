"use client";
import Reveal from "@/components/Reveal";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const PROJECTS = [
  { slug: "erp-services-co", cat: "services", sector: "قطاع الخدمات", name: "نظام ERP لشركة خدمات", desc: "توحيد المبيعات والمخزون والمحاسبة في نظام واحد بدل 3 أدوات منفصلة." },
  { slug: "tourism-booking-app", cat: "commerce", sector: "السياحة والضيافة", name: "تطبيق حجوزات سياحية", desc: "حجز وإدارة رحلات مع تتبع لحظي وإشعارات للعملاء." },
  { slug: "learning-platform", cat: "services", sector: "التعليم", name: "منصة تعليمية", desc: "مسارات تعلم تفاعلية مع متابعة تقدم الطالب وتقارير للمعلم." },
  { slug: "multi-branch-store", cat: "commerce", sector: "التجارة", name: "متجر إلكتروني متعدد الفروع", desc: "مخزون موحّد عبر الفروع مع تقارير مبيعات مجمّعة." },
  { slug: "gis-ops-dashboard", cat: "nonprofit", sector: "اللوجستيات", name: "لوحة عمليات وخرائط GIS", desc: "تتبع الموارد والمركبات جغرافيًا في الوقت الفعلي." },
  { slug: "volunteer-events-system", cat: "nonprofit", sector: "القطاع غير الربحي", name: "نظام تطوع وإدارة فعاليات", desc: "تسجيل المتطوعين وجدولة المناوبات وقياس الأثر." },
];

export default function WorkGrid() {
  const t = useTranslations("work");
  const [filter, setFilter] = useState("all");
  const filters = ["all", "commerce", "services", "nonprofit"] as const;

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-9">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm border transition ${
                  filter === f ? "bg-brand-blue border-brand-blue text-white" : "border-white/15 text-ink-muted"
                }`}
              >
                {t(`filters.${f}`)}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.filter((p) => filter === "all" || p.cat === filter).map((p) => (
            <Link href={`/work/${p.slug}`} key={p.name} className="rounded-xl border border-white/7 bg-bg-deep-2 overflow-hidden hover:-translate-y-1 transition block">
              <div className="h-[150px] relative flex items-center justify-center bg-gradient-to-br from-brand-blue-dim to-bg-deep-2">
                <span className="absolute top-3 inset-inline-start-3 bg-black/45 text-[.68rem] px-2.5 py-1 rounded-full text-ink-muted">
                  {t("badge")}
                </span>
              </div>
              <div className="p-5">
                <span className="text-brand-teal text-xs block mb-1">{p.sector}</span>
                <h4 className="font-semibold mb-1.5">{p.name}</h4>
                <p className="text-ink-muted text-sm">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
