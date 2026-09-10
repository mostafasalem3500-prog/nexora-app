"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { serviceCategories, getServicesByCategory } from "@/lib/site-data";

// مستشار حلول تفاعلي: زر عائم يفتح قائمة أسئلة قصيرة (قطاع ← احتياج)
// ويقترح الخدمة الأنسب من قائمة الخدمات الثابتة في site-data.ts — بدون
// أي استدعاء API أو ذكاء اصطناعي، مجرد قواعد اختيار بسيطة (category → service).

const COPY = {
  ar: {
    open: "مستشار الحلول",
    title: "ما الحل الأنسب لك؟",
    step1: "أولًا، ما نوع الحل الذي تبحث عنه؟",
    step2: "حدّد احتياجك بدقة أكبر:",
    resultEyebrow: "الحل المقترح",
    viewService: "تفاصيل الخدمة",
    getQuote: "اطلب عرض سعر",
    back: "رجوع",
    restart: "سؤال جديد",
    close: "إغلاق",
  },
  en: {
    open: "Solutions Advisor",
    title: "What's the right fit for you?",
    step1: "First, what kind of solution are you looking for?",
    step2: "Narrow down your need:",
    resultEyebrow: "Suggested solution",
    viewService: "Service details",
    getQuote: "Request a quote",
    back: "Back",
    restart: "Ask again",
    close: "Close",
  },
} as const;

export default function SolutionsAdvisor() {
  const locale = useLocale() as "ar" | "en";
  const t = COPY[locale];
  const [open, setOpen] = useState(false);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [serviceSlug, setServiceSlug] = useState<string | null>(null);

  const selectedService = serviceSlug
    ? getServicesByCategory(categorySlug || "").find((s) => s.slug === serviceSlug)
    : null;

  function reset() {
    setCategorySlug(null);
    setServiceSlug(null);
  }

  function toggle() {
    setOpen((v) => !v);
    if (open) reset();
  }

  return (
    <div className="fixed bottom-6 inset-inline-end-6 z-50">
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="mb-4 w-[340px] max-w-[88vw] rounded-2xl border border-border-subtle bg-bg-deep-2 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
            <h3 className="font-bold text-sm">{t.title}</h3>
            <button
              onClick={toggle}
              aria-label={t.close}
              className="text-ink-muted hover:text-ink transition text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div className="p-5 max-h-[420px] overflow-y-auto">
            {!categorySlug && (
              <>
                <p className="text-sm text-ink-muted mb-3">{t.step1}</p>
                <div className="space-y-2">
                  {serviceCategories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setCategorySlug(c.slug)}
                      className="w-full text-start rounded-lg border border-border-subtle px-3.5 py-2.5 text-sm hover:border-brand-teal hover:bg-surface-hover transition"
                    >
                      {c.name[locale]}
                    </button>
                  ))}
                </div>
              </>
            )}

            {categorySlug && !selectedService && (
              <>
                <p className="text-sm text-ink-muted mb-3">{t.step2}</p>
                <div className="space-y-2">
                  {getServicesByCategory(categorySlug).map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => setServiceSlug(s.slug)}
                      className="w-full text-start rounded-lg border border-border-subtle px-3.5 py-2.5 hover:border-brand-teal hover:bg-surface-hover transition"
                    >
                      <div className="text-sm font-semibold">{s.name[locale]}</div>
                      <div className="text-xs text-ink-muted mt-0.5">{s.resultLine[locale]}</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCategorySlug(null)}
                  className="mt-4 text-xs text-ink-muted hover:text-ink transition"
                >
                  ← {t.back}
                </button>
              </>
            )}

            {selectedService && (
              <div>
                <div className="text-xs text-brand-teal font-en mb-2 uppercase tracking-wide">
                  {t.resultEyebrow}
                </div>
                <h4 className="font-bold mb-1.5">{selectedService.name[locale]}</h4>
                <p className="text-sm text-ink-muted mb-5">{selectedService.resultLine[locale]}</p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/services/${selectedService.slug}`}
                    className="text-center rounded-md px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition"
                  >
                    {t.viewService}
                  </Link>
                  <Link
                    href="/quote"
                    className="text-center rounded-md px-4 py-2.5 text-sm font-semibold border border-brand-teal text-brand-teal hover:bg-brand-teal/10 transition"
                  >
                    {t.getQuote}
                  </Link>
                </div>
                <button
                  onClick={reset}
                  className="mt-4 text-xs text-ink-muted hover:text-ink transition"
                >
                  ← {t.restart}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={t.open}
        aria-expanded={open}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white bg-gradient-to-br from-brand-blue to-accent-violet shadow-lg hover:-translate-y-0.5 transition"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
