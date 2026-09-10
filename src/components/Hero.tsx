"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";

const bars = [62, 80, 45, 90, 70, 55, 85];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-36 pb-20"
      style={{
        background:
          "radial-gradient(ellipse 600px 400px at 85% 10%, rgba(42,92,255,.18), transparent 60%), radial-gradient(ellipse 500px 400px at 10% 90%, rgba(22,201,184,.10), transparent 60%), var(--bg-deep)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(231,236,245,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(231,236,245,.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="text-brand-teal font-semibold mb-4">
            {t("eyebrow")}
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show" className="text-4xl md:text-5xl font-bold leading-[1.45] mb-6">
            {t("titleStart")} <span className="text-brand-teal">{t("titleHighlight")}</span> {t("titleEnd")}
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" className="text-ink-muted text-lg max-w-md mb-8">
            {t("lead")}
          </motion.p>
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex gap-4 flex-wrap">
            <Link href="/quote" className="rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(42,92,255,.35)] transition">
              {t("ctaPrimary")}
            </Link>
            <Link href="/work" className="rounded-md px-6 py-3 font-semibold border border-white/20 hover:border-brand-teal hover:text-brand-teal transition">
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        <div className="relative h-[340px] md:h-[440px]">
          <div className="absolute inset-inline-start-0 top-0 w-[80%] md:w-[66%] h-[320px] rounded-2xl border border-white/10 bg-bg-deep-2 shadow-2xl overflow-hidden">
            <div className="h-6 flex items-center gap-1.5 px-2.5 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="p-4 font-en text-[.7rem] text-ink-muted">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 bg-white/5 rounded-lg px-2.5 py-2">
                  المبيعات
                  <b className="block text-ink text-[.95rem] font-en">128,400</b>
                </div>
                <div className="flex-1 bg-white/5 rounded-lg px-2.5 py-2">
                  الطلبات
                  <b className="block text-ink text-[.95rem] font-en">342</b>
                </div>
                <div className="flex-1 bg-white/5 rounded-lg px-2.5 py-2">
                  المخزون
                  <b className="block text-ink text-[.95rem] font-en">96%</b>
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-20 mt-2">
                {bars.map((h, i) => (
                  <i
                    key={i}
                    className="flex-1 rounded-t-sm opacity-85"
                    style={{ height: `${h}%`, background: "linear-gradient(180deg,var(--brand-teal),var(--brand-blue))" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-inline-end-0 top-8 w-[55%] md:w-[44%] h-[200px] rounded-2xl border border-white/10 bg-bg-deep-2 shadow-2xl overflow-hidden z-20">
            <div className="h-6 flex items-center gap-1.5 px-2.5 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="p-4 font-en text-[.7rem] text-ink-muted">متجر إلكتروني · تحديث المخزون الآن</div>
          </div>

          <div className="absolute inset-inline-end-[6%] bottom-[-10px] w-[110px] md:w-[150px] h-[220px] md:h-[300px] rounded-[26px] border-[6px] border-[#1a2438] bg-bg-deep-2 shadow-2xl overflow-hidden z-30">
            <div className="p-3 space-y-2 text-[.65rem]">
              <div className="bg-white/5 rounded-lg p-2">
                إشعار: طلب جديد #<span className="en">2291</span>
              </div>
              <div className="bg-white/5 rounded-lg p-2">تمت الموافقة على الفاتورة</div>
              <div className="bg-white/5 rounded-lg p-2">تحديث لوحة القيادة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
