"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale() as "ar" | "en";
  const site = useSiteSettings();

  return (
    <footer className="border-t border-white/7 bg-bg-deep-2 pt-14 pb-8 mt-8">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <span>{locale === "ar" ? site.nameAr : site.nameEn}</span>
            </div>
            <p className="text-ink-muted text-sm max-w-xs">{locale === "ar" ? site.taglineAr : site.taglineEn}</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t("company")}</h5>
            <Link href="/about" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">من نحن</Link>
            <Link href="/work" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">أعمالنا</Link>
            <Link href="/blog" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">مركز المعرفة</Link>
            <Link href="/careers" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">الوظائف</Link>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t("solutions")}</h5>
            <Link href="/services/erp" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">ERP</Link>
            <Link href="/services/crm" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">CRM</Link>
            <Link href="/services/ai-automation" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">الذكاء الاصطناعي</Link>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t("contact")}</h5>
            <Link href="/contact" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">تواصل معنا</Link>
            <a href={`mailto:${site.email}`} className="en block text-ink-muted text-sm mb-2 hover:text-brand-teal" dir="ltr">
              {site.email}
            </a>
          </div>
        </div>
        <div className="border-t border-white/7 pt-6 flex flex-wrap justify-between gap-4 text-ink-muted text-sm">
          <span>
            © <span className="en">{new Date().getFullYear()}</span> {locale === "ar" ? site.nameAr : site.nameEn}. {t("rights")}.
          </span>
          <span>
            <Link href="/privacy" className="hover:text-brand-teal">{t("privacy")}</Link> · <Link href="/terms" className="hover:text-brand-teal">{t("terms")}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
