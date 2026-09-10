import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { jobPostings } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "الوظائف" : "Careers",
    description: isAr ? "الوظائف المتاحة حاليًا في نكسورا تك." : "Current open roles at NEXORA TECH.",
  };
}

export default async function CareersPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main>
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "الوظائف" : "Careers"}
        title={locale === "ar" ? "انضم لفريق يبني أنظمة حقيقية" : "Join a team building real systems"}
        lead={locale === "ar" ? "هذه أدوار تجريبية توضح نوعية الفرص — تواصل معنا لو ما وجدت ما يناسبك." : "These are illustrative roles showing the kind of opportunities available — reach out even if none fits exactly."}
      />
      <div className="mx-auto max-w-[900px] px-6 pb-24 space-y-4">
        {jobPostings.map((job, i) => (
          <Reveal key={job.slug} delay={i * 0.06}>
            <div className="rounded-xl border border-white/8 bg-bg-deep-2 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1.5">{job.title[locale]}</h3>
                <div className="flex gap-3 text-sm text-ink-muted flex-wrap">
                  <span>{job.department[locale]}</span>
                  <span>·</span>
                  <span>{job.location[locale]}</span>
                  <span>·</span>
                  <span>{job.type[locale]}</span>
                </div>
                <p className="text-ink-muted text-sm mt-2 max-w-xl">{job.description[locale]}</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 rounded-md px-5 py-2.5 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition text-center"
              >
                {locale === "ar" ? "تقدّم الآن" : "Apply now"}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <Footer />
    </main>
  );
}
