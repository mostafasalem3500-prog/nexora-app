"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CtaBand() {
  const t = useTranslations("cta");
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="rounded-2xl text-center px-8 py-16 bg-gradient-to-br from-brand-blue-dim to-bg-deep">
          <h2 className="text-3xl font-bold mb-8">{t("title")}</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition">
              {t("primary")}
            </Link>
            <Link href="/contact" className="rounded-md px-6 py-3 font-semibold border border-white/20 hover:border-brand-teal hover:text-brand-teal transition">
              {t("secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
