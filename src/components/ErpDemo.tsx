"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Reveal from "@/components/Reveal";

type TabKey = "dash" | "sales" | "inventory" | "hr" | "reports";

const TABS: { key: TabKey; ar: string; en: string }[] = [
  { key: "dash", ar: "لوحة القيادة", en: "Dashboard" },
  { key: "sales", ar: "المبيعات", en: "Sales" },
  { key: "inventory", ar: "المخزون", en: "Inventory" },
  { key: "hr", ar: "الموارد البشرية", en: "HR" },
  { key: "reports", ar: "التقارير", en: "Reports" },
];

const DATA: Record<TabKey, { stats: [string, string][]; chart: number[] }> = {
  dash: { stats: [["128,400 ر.س", "الإيراد الشهري"], ["342", "الطلبات المفتوحة"], ["96%", "معدل الإنجاز"], ["58", "الموظفون النشطون"]], chart: [40, 65, 50, 80, 60, 90, 70] },
  sales: { stats: [["64 صفقة", "صفقات مغلقة"], ["210K ر.س", "قيمة الأنابيب"], ["+18%", "نمو شهري"], ["12", "مندوب مبيعات"]], chart: [30, 50, 45, 70, 55, 60, 85] },
  inventory: { stats: [["1,204", "صنف مخزون"], ["23", "أصناف منخفضة"], ["4", "مخازن نشطة"], ["98%", "دقة الجرد"]], chart: [60, 55, 70, 40, 75, 65, 50] },
  hr: { stats: [["58", "موظف"], ["3", "إجازات نشطة"], ["96%", "معدل الحضور"], ["4", "طلبات توظيف"]], chart: [50, 52, 54, 53, 58, 57, 60] },
  reports: { stats: [["12", "تقرير آلي"], ["100%", "أتمتة كاملة"], ["يومي", "دورية التحديث"], ["PDF", "صيغة التصدير"]], chart: [45, 60, 58, 72, 66, 80, 75] },
};

const DATA_EN: Record<TabKey, { stats: [string, string][]; chart: number[] }> = {
  dash: { stats: [["$34,200", "Monthly revenue"], ["342", "Open orders"], ["96%", "Completion rate"], ["58", "Active staff"]], chart: DATA.dash.chart },
  sales: { stats: [["64 deals", "Closed deals"], ["$56K", "Pipeline value"], ["+18%", "Monthly growth"], ["12", "Sales reps"]], chart: DATA.sales.chart },
  inventory: { stats: [["1,204", "SKUs"], ["23", "Low-stock items"], ["4", "Active warehouses"], ["98%", "Count accuracy"]], chart: DATA.inventory.chart },
  hr: { stats: [["58", "Employees"], ["3", "Active leaves"], ["96%", "Attendance rate"], ["4", "Open positions"]], chart: DATA.hr.chart },
  reports: { stats: [["12", "Automated reports"], ["100%", "Fully automated"], ["Daily", "Refresh cycle"], ["PDF", "Export format"]], chart: DATA.reports.chart },
};

export default function ErpDemo() {
  const locale = useLocale() as "ar" | "en";
  const [tab, setTab] = useState<TabKey>("dash");
  const source = locale === "ar" ? DATA : DATA_EN;
  const active = source[tab];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {locale === "ar" ? "جرّب واجهة ERP من الداخل" : "Try the ERP interface from the inside"}
          </h2>
          <p className="text-ink-muted">
            {locale === "ar"
              ? "هذه بيانات توضيحية لشرح تجربة الاستخدام — وليست بيانات فعلية."
              : "This is demo data illustrating the experience — not real figures."}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border-subtle bg-bg-deep-2 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-border-subtle bg-surface-hover">
              {TABS.map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTab(tb.key)}
                  className={`px-5 py-3.5 text-sm whitespace-nowrap border-b-2 transition ${
                    tab === tb.key ? "text-ink border-brand-teal" : "text-ink-muted border-transparent"
                  }`}
                >
                  {locale === "ar" ? tb.ar : tb.en}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8">
              <div className="font-en text-xs text-ink-muted mb-4">Demo data — isDemo: true</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {active.stats.map(([val, label]) => (
                  <div key={label} className="bg-bg-deep rounded-lg p-4">
                    <b className="font-en text-xl block text-brand-teal">{val}</b>
                    <small className="text-ink-muted text-xs">{label}</small>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {active.chart.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{ height: `${h}%`, background: "linear-gradient(180deg,var(--brand-blue),transparent)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
