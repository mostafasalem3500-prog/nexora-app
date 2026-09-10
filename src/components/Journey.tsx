"use client";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

const STEPS = [
  { h: "١ · الاستكشاف وتحليل الاحتياج", p: "نفهم عملك الفعلي قبل اقتراح أي حل تقني." },
  { h: "٢ · الاستراتيجية وتجربة المستخدم", p: "نرسم رحلة المستخدم ونحدد الأولويات الوظيفية." },
  { h: "٣ · التصميم والنموذج الأولي", p: "نموذج تفاعلي تجربه وتوافق عليه قبل البرمجة." },
  { h: "٤ · التطوير والتكامل", p: "بناء فعلي مع ربط الأنظمة والبيانات القائمة." },
  { h: "٥ · الاختبار والإطلاق", p: "فحص شامل للأداء والأمان قبل النشر." },
  { h: "٦ · القياس والدعم والتطوير", p: "متابعة الأداء الفعلي وتطوير مستمر بعد الإطلاق." },
];

export default function Journey() {
  const t = useTranslations("journey");
  return (
    <section id="journey" className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-xl mb-12">
          <h2 className="text-3xl font-bold mb-3">{t("title")}</h2>
          <p className="text-ink-muted">{t("subtitle")}</p>
        </Reveal>
        <div className="relative ps-8">
          <div className="absolute inset-inline-start-[.4rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue to-brand-teal" />
          {STEPS.map((s) => (
            <div key={s.h} className="relative pb-10">
              <span className="absolute inset-inline-start-[-2rem] top-1 w-2.5 h-2.5 rounded-full bg-brand-teal shadow-[0_0_0_4px_rgba(22,201,184,.15)]" />
              <h4 className="font-semibold mb-1">{s.h}</h4>
              <p className="text-ink-muted text-sm max-w-lg">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
