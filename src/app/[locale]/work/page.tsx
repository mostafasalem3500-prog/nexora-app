import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "أعمالنا" : "Our Work",
    description: isAr ? "مشاريع تجريبية توضّح القدرة التقنية عبر قطاعات متعددة." : "Demo projects showcasing technical capability across multiple sectors.",
  };
}

export default async function WorkPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main id="main-content">
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "أعمالنا" : "Our Work"}
        title={locale === "ar" ? "مشاريع تجريبية تعرض القدرة التقنية" : "Demo projects showcasing technical capability"}
        lead={
          locale === "ar"
            ? "دراسات حالة توضيحية — النتائج متوقعة لا مزعومة، ومعنونة بوضوح كمحتوى تجريبي."
            : "Illustrative case studies — outcomes are expected, not claimed, and clearly labeled as demo content."
        }
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {caseStudies.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className="rounded-xl border border-white/7 bg-bg-deep-2 overflow-hidden hover:-translate-y-1 transition"
          >
            <div className="h-[140px] relative flex items-center justify-center bg-gradient-to-br from-brand-blue-dim to-bg-deep-2">
              <span className="absolute top-3 inset-inline-start-3 bg-black/45 text-[.68rem] px-2.5 py-1 rounded-full text-ink-muted">
                {locale === "ar" ? "مشروع تجريبي لعرض القدرات" : "Demo project showcasing capability"}
              </span>
            </div>
            <div className="p-5">
              <span className="text-brand-teal text-xs block mb-1">{c.sector[locale]}</span>
              <h3 className="font-semibold mb-1.5">{c.name[locale]}</h3>
              <p className="text-ink-muted text-sm">{c.solution[locale]}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}
