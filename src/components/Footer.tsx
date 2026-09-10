"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-white/7 bg-bg-deep-2 pt-14 pb-8 mt-8">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <span>
                نكسورا <span className="en">TECH</span>
              </span>
            </div>
            <p className="text-ink-muted text-sm max-w-xs">{t("tagline")}</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t("company")}</h5>
            <a href="#" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">من نحن</a>
            <a href="#" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">منهجية العمل</a>
            <a href="#" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">الوظائف</a>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t("solutions")}</h5>
            <a href="#" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">ERP</a>
            <a href="#" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">CRM</a>
            <a href="#" className="block text-ink-muted text-sm mb-2 hover:text-brand-teal">الذكاء الاصطناعي</a>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t("contact")}</h5>
            <a href="#" className="en block text-ink-muted text-sm mb-2 hover:text-brand-teal" dir="ltr">info@nexora.sa</a>
          </div>
        </div>
        <div className="border-t border-white/7 pt-6 flex flex-wrap justify-between gap-4 text-ink-muted text-sm">
          <span>© <span className="en">{new Date().getFullYear()}</span> نكسورا تك. {t("rights")}.</span>
          <span>
            <a href="#" className="hover:text-brand-teal">{t("privacy")}</a> · <a href="#" className="hover:text-brand-teal">{t("terms")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
