"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

type WizardData = {
  solutionType: string;
  descriptionText: string;
  budgetRange: string;
  timeline: string;
  features: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  privacyAccepted: boolean;
};

const EMPTY: WizardData = {
  solutionType: "",
  descriptionText: "",
  budgetRange: "",
  timeline: "",
  features: [],
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  privacyAccepted: false,
};

const STORAGE_KEY = "nexora-quote-wizard";

function loadSavedData(): WizardData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...EMPTY, ...JSON.parse(saved) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribeNever() {
  return () => {};
}

// يحدّد ما إذا تجاوزنا الـHydration فعليًا. أثناء الـSSR والـrender الأول
// على المتصفح (الذي يجب أن يطابق HTML من الخادم) تُرجع false دائمًا؛
// React يستدعيها مجددًا بعد التركيب فتُرجع true — عندها فقط نقرأ
// localStorage ونستعيد التقدّم المحفوظ (انظر الاستخدام أدناه).
function useIsHydrated() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
}

const SOLUTION_OPTIONS_AR = ["موقع إلكتروني", "تطبيق جوال", "نظام ERP", "نظام CRM", "لوحة بيانات وذكاء أعمال", "أخرى"];
const SOLUTION_OPTIONS_EN = ["Website", "Mobile app", "ERP system", "CRM system", "BI dashboard", "Other"];
const FEATURE_OPTIONS_AR = ["دعم عربي RTL", "تطبيق جوال مرافق", "تكامل مع أنظمة حالية", "لوحة تحكم إدارية", "تقارير وتحليلات", "دعم متعدد اللغات"];
const FEATURE_OPTIONS_EN = ["Arabic RTL support", "Companion mobile app", "Integration with existing systems", "Admin dashboard", "Reports & analytics", "Multi-language support"];

export default function QuoteWizard({ locale }: { locale: "ar" | "en" }) {
  const isAr = locale === "ar";
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  // انتقال الخطوات (AnimatePresence) ورسالة النجاح يتحركان تلقائيًا عند كل
  // تغيير حالة — يُحترم prefers-reduced-motion صراحة بدل الاعتماد فقط على
  // قاعدة CSS العامة التي لا تغطي حركة Framer Motion.
  const shouldReduceMotion = useReducedMotion();

  // استعادة التقدّم المحفوظ من localStorage بأمان عبر SSR: الـrender الأول
  // على المتصفح يجب أن يطابق HTML الخادم تمامًا (data = EMPTY) وإلا ينتج
  // React تحذير/خطأ Hydration Mismatch حقيقي (تم رصده فعليًا أثناء
  // الاختبار) قد يترك الحقل المستعاد غير معروض بصريًا رغم صحة القيمة في
  // الحالة. بعد التركيب مباشرة تصبح isHydrated=true فنستدعي setData أثناء
  // الـrender نفسه (نمط "تعديل الحالة أثناء render" الموثّق في React —
  // وليس داخل useEffect) بحارس من الحالة (وليس ref، لأن الكتابة على ref
  // أثناء الـrender غير آمنة تحت الاستدعاء المضاعف لـStrict Mode)، فيُعاد
  // الرسم فورًا بالقيمة الصحيحة دون مخالفة قاعدة react-hooks/set-state-in-effect.
  const isHydrated = useIsHydrated();
  const [restored, setRestored] = useState(false);
  if (isHydrated && !restored) {
    setRestored(true);
    const saved = loadSavedData();
    if (saved !== EMPTY) setData(saved);
  }

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data, isHydrated]);

  const totalSteps = 7;

  function canProceed() {
    if (step === 1) return !!data.solutionType;
    if (step === 2) return data.descriptionText.trim().length >= 10;
    if (step === 6) return data.contactName.length >= 2 && /\S+@\S+\.\S+/.test(data.contactEmail);
    return true;
  }

  async function submit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/project-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setReference(json.referenceNumber);
      setStatus("success");
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full rounded-md bg-bg-deep border border-border-subtle px-4 py-2.5 text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-brand-teal transition";

  if (status === "success") {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : undefined}
        className="text-center py-10"
      >
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold mb-2">{isAr ? "تم استلام طلبك بنجاح" : "Your request has been received"}</h2>
        <p className="text-ink-muted mb-4">{isAr ? "رقمك المرجعي:" : "Your reference number:"}</p>
        <div className="inline-block font-en text-lg bg-bg-deep border border-brand-teal text-brand-teal px-4 py-2 rounded-md">
          {reference}
        </div>
        <p className="text-ink-muted text-sm mt-6">
          {isAr ? "سنعاود التواصل معك خلال يوم عمل واحد." : "We'll get back to you within one business day."}
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* شريط التقدم */}
      <div className="flex items-center gap-1.5 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? "bg-brand-teal" : "bg-surface-active"}`}
          />
        ))}
      </div>
      <div className="text-ink-muted text-sm mb-6 font-en">
        {isAr ? `الخطوة ${step} من ${totalSteps}` : `Step ${step} of ${totalSteps}`}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: isAr ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: isAr ? -16 : 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          className="min-h-[220px]"
        >
          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4">{isAr ? "ما نوع الحل المطلوب؟" : "What type of solution do you need?"}</h3>
              <div className="grid grid-cols-2 gap-3">
                {(isAr ? SOLUTION_OPTIONS_AR : SOLUTION_OPTIONS_EN).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setData((d) => ({ ...d, solutionType: opt }))}
                    className={`rounded-md border px-4 py-3 text-sm text-start transition ${
                      data.solutionType === opt ? "border-brand-teal text-brand-teal bg-brand-teal/5" : "border-border-subtle text-ink-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-semibold mb-4">{isAr ? "صف مشروعك" : "Describe your project"}</h3>
              <textarea
                rows={6}
                className={inputClass}
                value={data.descriptionText}
                onChange={(e) => setData((d) => ({ ...d, descriptionText: e.target.value }))}
                placeholder={isAr ? "اكتب فكرة مشروعك ولو بشكل مبدئي..." : "Describe your project idea, even roughly..."}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-semibold mb-4">{isAr ? "الميزانية التقديرية (اختياري)" : "Estimated budget (optional)"}</h3>
              <input
                className={inputClass}
                value={data.budgetRange}
                onChange={(e) => setData((d) => ({ ...d, budgetRange: e.target.value }))}
                placeholder={isAr ? "مثال: 20,000 - 50,000 ر.س" : "e.g. $5,000 - $15,000"}
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-semibold mb-4">{isAr ? "الموعد المتوقع (اختياري)" : "Expected timeline (optional)"}</h3>
              <input
                className={inputClass}
                value={data.timeline}
                onChange={(e) => setData((d) => ({ ...d, timeline: e.target.value }))}
                placeholder={isAr ? "مثال: خلال شهرين" : "e.g. within 2 months"}
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="font-semibold mb-4">{isAr ? "المزايا المطلوبة" : "Requested features"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(isAr ? FEATURE_OPTIONS_AR : FEATURE_OPTIONS_EN).map((f) => {
                  const checked = data.features.includes(f);
                  return (
                    <label
                      key={f}
                      className={`flex items-center gap-2.5 rounded-md border px-4 py-2.5 text-sm cursor-pointer transition ${
                        checked ? "border-brand-teal text-ink" : "border-border-subtle text-ink-muted"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setData((d) => ({
                            ...d,
                            features: checked ? d.features.filter((x) => x !== f) : [...d.features, f],
                          }))
                        }
                      />
                      {f}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h3 className="font-semibold mb-1">{isAr ? "بيانات التواصل" : "Contact details"}</h3>
              <input
                className={inputClass}
                value={data.contactName}
                onChange={(e) => setData((d) => ({ ...d, contactName: e.target.value }))}
                placeholder={isAr ? "الاسم" : "Name"}
              />
              <input
                className={inputClass}
                dir="ltr"
                value={data.contactEmail}
                onChange={(e) => setData((d) => ({ ...d, contactEmail: e.target.value }))}
                placeholder={isAr ? "البريد الإلكتروني" : "Email"}
              />
              <input
                className={inputClass}
                dir="ltr"
                value={data.contactPhone}
                onChange={(e) => setData((d) => ({ ...d, contactPhone: e.target.value }))}
                placeholder={isAr ? "رقم الجوال (اختياري)" : "Phone (optional)"}
              />
            </div>
          )}

          {step === 7 && (
            <div>
              <h3 className="font-semibold mb-4">{isAr ? "مراجعة الطلب" : "Review your request"}</h3>
              <dl className="text-sm space-y-2 mb-5">
                <div className="flex justify-between border-b border-border-subtle pb-2">
                  <dt className="text-ink-muted">{isAr ? "نوع الحل" : "Solution type"}</dt>
                  <dd>{data.solutionType || "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border-subtle pb-2">
                  <dt className="text-ink-muted">{isAr ? "الميزانية" : "Budget"}</dt>
                  <dd className="font-en">{data.budgetRange || "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border-subtle pb-2">
                  <dt className="text-ink-muted">{isAr ? "الموعد" : "Timeline"}</dt>
                  <dd>{data.timeline || "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border-subtle pb-2">
                  <dt className="text-ink-muted">{isAr ? "المزايا" : "Features"}</dt>
                  <dd className="text-end max-w-[60%]">{data.features.join("، ") || "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border-subtle pb-2">
                  <dt className="text-ink-muted">{isAr ? "التواصل" : "Contact"}</dt>
                  <dd>
                    {data.contactName} · <span className="font-en">{data.contactEmail}</span>
                  </dd>
                </div>
              </dl>
              <label className="flex items-start gap-2.5 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  checked={data.privacyAccepted}
                  onChange={(e) => setData((d) => ({ ...d, privacyAccepted: e.target.checked }))}
                  className="mt-1"
                />
                <span>{isAr ? "أوافق على سياسة الخصوصية وشروط الاستخدام." : "I agree to the Privacy Policy and Terms of Use."}</span>
              </label>
              {status === "error" && (
                <p className="text-red-400 text-sm mt-3">
                  {isAr ? "تعذّر إرسال الطلب، حاول مرة أخرى." : "Couldn't send the request, please try again."}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="rounded-md px-5 py-2.5 text-sm border border-border-subtle-strong disabled:opacity-30 transition hover:border-brand-teal"
        >
          {isAr ? "السابق" : "Back"}
        </button>
        {step < totalSteps ? (
          <button
            onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
            disabled={!canProceed()}
            className="rounded-md px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim disabled:opacity-40 transition"
          >
            {isAr ? "التالي" : "Next"}
          </button>
        ) : (
          <MagneticButton>
            <button
              onClick={submit}
              disabled={!data.privacyAccepted || status === "submitting"}
              className="rounded-md px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim disabled:opacity-40 transition"
            >
              {status === "submitting" ? (isAr ? "جارٍ الإرسال..." : "Sending...") : isAr ? "إرسال الطلب" : "Send request"}
            </button>
          </MagneticButton>
        )}
      </div>
    </div>
  );
}
