"use client";
import Reveal from "@/components/Reveal";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Globe, Users, TrendingUp, Boxes, Wallet, LayoutDashboard, type LucideIcon } from "lucide-react";

const NODES: { key: string; label_ar: string; sub_ar: string; detail_ar: string; icon: LucideIcon }[] = [
  { key: "site", label_ar: "الموقع الإلكتروني", sub_ar: "نقطة التلامس الأولى", detail_ar: "الموقع هو نقطة الالتقاء الأولى مع العميل، ومنه تُجمع بيانات الزوار والاستفسارات.", icon: Globe },
  { key: "crm", label_ar: "CRM", sub_ar: "إدارة العملاء", detail_ar: "كل استفسار يتحول تلقائيًا إلى فرصة بيع داخل CRM، مع سجل تواصل كامل.", icon: Users },
  { key: "sales", label_ar: "المبيعات", sub_ar: "متابعة الصفقات", detail_ar: "فرق المبيعات تتابع الصفقات وتحوّلها إلى طلبات فعلية داخل نظام موحّد.", icon: TrendingUp },
  { key: "erp", label_ar: "ERP", sub_ar: "تخطيط الموارد", detail_ar: "الطلب يدخل مباشرة إلى ERP: مخزون، فوترة، وموارد بشرية مرتبطة.", icon: Boxes },
  { key: "finance", label_ar: "المالية", sub_ar: "محاسبة آلية", detail_ar: "كل معاملة تُسجَّل ماليًا فور حدوثها، بلا إدخال يدوي مكرر.", icon: Wallet },
  { key: "dashboard", label_ar: "لوحة القيادة", sub_ar: "قرار لحظي", detail_ar: "القيادة ترى الصورة الكاملة لحظيًا: مبيعات، تكاليف، وأداء الفرق.", icon: LayoutDashboard },
];

export default function SolutionsMap() {
  const t = useTranslations("solutions");
  const [active, setActive] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.key === active);

  return (
    <section id="solutions" className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="rounded-2xl border border-border-subtle bg-bg-deep-2 p-8 md:p-12">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-3">{t("title")}</h2>
            <p className="text-ink-muted">{t("subtitle")}</p>
          </Reveal>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-1">
            {NODES.map((node, i) => (
              <div key={node.key} className="flex items-center md:contents">
                <button
                  onMouseEnter={() => setActive(node.key)}
                  onFocus={() => setActive(node.key)}
                  className={`flex-1 text-center rounded-lg border px-4 py-4 transition-all bg-bg-deep ${
                    active === node.key ? "border-brand-teal -translate-y-1" : "border-border-subtle"
                  }`}
                >
                  <node.icon size={18} className="mx-auto mb-1.5 text-brand-teal" />
                  <b className="block mb-1">{node.label_ar}</b>
                  <small className="text-ink-muted text-xs">{node.sub_ar}</small>
                </button>
                {i < NODES.length - 1 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-brand-blue to-brand-teal mx-1" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-ink-muted text-[.95rem] min-h-6">
            {activeNode ? activeNode.detail_ar : t("default")}
          </div>
        </div>
      </div>
    </section>
  );
}
