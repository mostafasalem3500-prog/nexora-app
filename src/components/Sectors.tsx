"use client";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

const SECTORS = ["التجارة", "الخدمات", "التعليم", "الصحة", "السياحة والضيافة", "اللوجستيات", "القطاع غير الربحي", "العقارات", "التصنيع", "الجهات الحكومية"];

export default function Sectors() {
  const t = useTranslations("sectors");
  return (
    <section id="sectors" className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <h2 className="text-3xl font-bold mb-9">{t("title")}</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SECTORS.map((s) => (
            <div key={s} className="rounded-xl border border-white/8 bg-bg-deep-2 text-center px-3 py-4 text-sm hover:border-brand-blue transition">
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
