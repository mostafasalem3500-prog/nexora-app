"use client";

import { useLocale } from "next-intl";
import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    ar: { quote: "الفريق فهم عملياتنا قبل ما يقترح أي حل، وهذا وفّر علينا وقت كبير في مرحلة التخطيط.", name: "مدير عمليات، قطاع الخدمات" },
    en: { quote: "The team understood our operations before proposing any solution, which saved us a lot of planning time.", name: "Operations Manager, Services sector" },
  },
  {
    ar: { quote: "التسليم كان أوضح مما توقعنا — كل مرحلة موثقة وقابلة للمراجعة.", name: "صاحب مشروع، قطاع التجارة" },
    en: { quote: "Delivery was clearer than we expected — every phase was documented and reviewable.", name: "Business owner, Retail sector" },
  },
  {
    ar: { quote: "الدعم بعد الإطلاق كان فعليًا موجود، مو مجرد وعد في العقد.", name: "مدير تقنية معلومات، قطاع التعليم" },
    en: { quote: "Post-launch support was actually there, not just a promise in the contract.", name: "IT Manager, Education sector" },
  },
];

export default function Testimonials() {
  const locale = useLocale() as "ar" | "en";
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-xl mb-10">
          <div className="inline-block bg-black/20 border border-white/10 text-[.7rem] px-3 py-1 rounded-full text-ink-muted mb-3">
            {locale === "ar" ? "محتوى تجريبي" : "Demo content"}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {locale === "ar" ? "آراء نموذجية عن أسلوب العمل" : "Sample feedback on how we work"}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ITEMS.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-white/8 bg-bg-deep-2 p-6">
                <p className="text-ink-muted leading-relaxed mb-4">&ldquo;{it[locale].quote}&rdquo;</p>
                <span className="text-sm text-brand-teal">{it[locale].name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
