"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MagneticButton from "@/components/MagneticButton";

const schema = z.object({
  solutionType: z.string().min(1, "مطلوب"),
  descriptionText: z.string().min(10, "اكتب 10 أحرف على الأقل"),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  contactName: z.string().min(2, "مطلوب"),
  contactEmail: z.string().email("بريد إلكتروني غير صحيح"),
  contactPhone: z.string().optional(),
  privacyAccepted: z.literal(true, { message: "يجب الموافقة على سياسة الخصوصية" }),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ locale }: { locale: "ar" | "en" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const t = (ar: string, en: string) => (locale === "ar" ? ar : en);

  async function onSubmit(values: FormValues) {
    setResult(null);
    try {
      const res = await fetch("/api/project-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ ok: false, message: t("تعذّر إرسال طلبك، حاول مرة أخرى.", "Couldn't send your request, please try again.") });
        return;
      }
      setResult({
        ok: true,
        message: t(`تم استلام طلبك! رقمك المرجعي: ${data.referenceNumber}`, `Request received! Your reference number: ${data.referenceNumber}`),
      });
      reset();
    } catch {
      setResult({ ok: false, message: t("حدث خطأ في الاتصال، تحقق من الإنترنت وحاول مرة أخرى.", "Connection error — check your internet and try again.") });
    }
  }

  const inputClass = "w-full rounded-md bg-bg-deep border border-border-subtle px-4 py-2.5 text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-brand-teal transition";
  const errClass = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label className="block text-sm mb-1.5">{t("نوع الحل المطلوب", "Solution type")}</label>
        <select {...register("solutionType")} className={inputClass} defaultValue="">
          <option value="" disabled>
            {t("اختر...", "Select...")}
          </option>
          <option value="website">{t("موقع إلكتروني", "Website")}</option>
          <option value="mobile-app">{t("تطبيق جوال", "Mobile app")}</option>
          <option value="erp">{t("نظام ERP", "ERP system")}</option>
          <option value="crm">{t("نظام CRM", "CRM system")}</option>
          <option value="other">{t("أخرى", "Other")}</option>
        </select>
        {errors.solutionType && <p className={errClass}>{errors.solutionType.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1.5">{t("وصف المشروع", "Project description")}</label>
        <textarea {...register("descriptionText")} rows={4} className={inputClass} />
        {errors.descriptionText && <p className={errClass}>{errors.descriptionText.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1.5">{t("الميزانية التقديرية (اختياري)", "Estimated budget (optional)")}</label>
          <input {...register("budgetRange")} className={inputClass} placeholder={t("مثال: 20,000 - 50,000 ر.س", "e.g. $5,000 - $15,000")} />
        </div>
        <div>
          <label className="block text-sm mb-1.5">{t("الموعد المتوقع (اختياري)", "Expected timeline (optional)")}</label>
          <input {...register("timeline")} className={inputClass} placeholder={t("مثال: خلال شهرين", "e.g. within 2 months")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1.5">{t("الاسم", "Name")}</label>
          <input {...register("contactName")} className={inputClass} />
          {errors.contactName && <p className={errClass}>{errors.contactName.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1.5">{t("البريد الإلكتروني", "Email")}</label>
          <input {...register("contactEmail")} type="email" className={inputClass} dir="ltr" />
          {errors.contactEmail && <p className={errClass}>{errors.contactEmail.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1.5">{t("رقم الجوال (اختياري)", "Phone (optional)")}</label>
        <input {...register("contactPhone")} className={inputClass} dir="ltr" />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-ink-muted">
        <input type="checkbox" {...register("privacyAccepted")} className="mt-1" />
        <span>{t("أوافق على سياسة الخصوصية وشروط الاستخدام.", "I agree to the Privacy Policy and Terms of Use.")}</span>
      </label>
      {errors.privacyAccepted && <p className={errClass}>{errors.privacyAccepted.message}</p>}

      <MagneticButton className="w-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition disabled:opacity-60"
        >
          {isSubmitting ? t("جارٍ الإرسال...", "Sending...") : t("إرسال الطلب", "Send request")}
        </button>
      </MagneticButton>

      {result && (
        <p className={result.ok ? "text-brand-teal text-sm" : "text-red-400 text-sm"}>{result.message}</p>
      )}
    </form>
  );
}
