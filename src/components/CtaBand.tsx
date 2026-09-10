"use client";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MagneticButton from "@/components/MagneticButton";

export default function CtaBand() {
  const t = useTranslations("cta");
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal
          className="relative overflow-hidden rounded-2xl text-center px-8 py-16"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 500px 300px at 15% 0%, rgba(22,201,184,.22), transparent 60%), radial-gradient(ellipse 400px 300px at 100% 100%, rgba(124,92,255,.2), transparent 60%), linear-gradient(135deg, var(--brand-blue-dim), var(--surface-bg))",
          }}
        >
          <h2 className="relative z-10 text-3xl font-bold mb-8">{t("title")}</h2>
          <div className="relative z-10 flex gap-4 justify-center flex-wrap">
            <MagneticButton>
              <Link href="/contact" className="rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition">
                {t("primary")}
              </Link>
            </MagneticButton>
            <Link href="/quote" className="rounded-md px-6 py-3 font-semibold border border-border-subtle-strong hover:border-brand-teal hover:text-brand-teal transition">
              {t("secondary")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
