"use client";

import { useLocale } from "next-intl";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";

const STATS_AR = [
  { value: 5, suffix: "", label: "مجالات خدمة رئيسية" },
  { value: 2, suffix: "", label: "لغتان مدعومتان بالكامل" },
  { value: 6, suffix: "", label: "مراحل جودة محددة" },
  { value: 100, suffix: "%", label: "تغطية دورة حياة المنتج" },
];
const STATS_EN = [
  { value: 5, suffix: "", label: "Core service domains" },
  { value: 2, suffix: "", label: "Fully supported languages" },
  { value: 6, suffix: "", label: "Defined quality stages" },
  { value: 100, suffix: "%", label: "Product lifecycle coverage" },
];

export default function StatsInfographic() {
  const locale = useLocale() as "ar" | "en";
  const stats = locale === "ar" ? STATS_AR : STATS_EN;
  return (
    <section className="py-16 md:py-20 border-y border-white/8">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <AnimatedCounter value={s.value} suffix={s.suffix} className="font-en text-3xl md:text-4xl font-extrabold text-brand-teal block mb-1" />
              <span className="text-ink-muted text-sm">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
