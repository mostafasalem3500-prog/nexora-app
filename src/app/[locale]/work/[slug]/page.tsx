import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  const isAr = locale === "ar";
  return {
    title: isAr ? study.name.ar : study.name.en,
    description: isAr ? study.solution.ar : study.solution.en,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as "ar" | "en";
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main id="main-content">
      <Header />
      <section className="pt-40 pb-16 relative overflow-hidden" style={{ background: "radial-gradient(ellipse 500px 300px at 90% 0%, rgba(22,201,184,.14), transparent 60%), var(--bg-deep)" }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <Link href="/work" className="text-brand-teal text-sm hover:underline">
            {locale === "ar" ? "→ كل الأعمال" : "→ All work"}
          </Link>
          <div className="flex items-center gap-3 mt-4 mb-3">
            <span className="bg-black/30 border border-white/10 text-[.7rem] px-2.5 py-1 rounded-full text-ink-muted">
              {locale === "ar" ? "مشروع تجريبي لعرض القدرات" : "Demo project showcasing capability"}
            </span>
            <span className="text-brand-teal text-sm">{study.sector[locale]}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold max-w-2xl">{study.name[locale]}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">{locale === "ar" ? "المشكلة" : "Problem"}</h2>
            <p className="text-ink-muted leading-relaxed">{study.problem[locale]}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{locale === "ar" ? "الحل" : "Solution"}</h2>
            <p className="text-ink-muted leading-relaxed">{study.solution[locale]}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{locale === "ar" ? "النتيجة المتوقعة" : "Expected outcome"}</h2>
            <p className="text-ink-muted leading-relaxed">{study.expectedOutcome[locale]}</p>
          </div>
        </div>
        <aside className="h-fit rounded-2xl border border-white/8 bg-bg-deep-2 p-6">
          <h3 className="font-semibold mb-3">{locale === "ar" ? "لديك مشروع مشابه؟" : "Have a similar project?"}</h3>
          <Link
            href="/contact"
            className="block text-center rounded-md px-5 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition"
          >
            {locale === "ar" ? "تحدّث معنا" : "Talk to us"}
          </Link>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
