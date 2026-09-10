import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { articles } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "مركز المعرفة" : "Knowledge Center",
    description: isAr
      ? "مقالات عملية في الأنظمة المؤسسية، التصميم، والبنية التحتية."
      : "Practical articles on enterprise systems, design, and infrastructure.",
  };
}

export default async function BlogPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main id="main-content">
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "مركز المعرفة" : "Knowledge Center"}
        title={locale === "ar" ? "مقالات عملية لا نظرية" : "Practical, not theoretical, articles"}
        lead={locale === "ar" ? "خبرات وملاحظات من العمل الفعلي على أنظمة مؤسسية." : "Lessons and notes from real enterprise-system work."}
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link href={`/blog/${a.slug}`} className="block h-full rounded-xl border border-white/8 bg-bg-deep-2 p-6 hover:border-brand-blue transition">
              <span className="text-brand-teal text-xs block mb-2">{a.category[locale]}</span>
              <h3 className="font-semibold mb-2 leading-snug">{a.title[locale]}</h3>
              <p className="text-ink-muted text-sm mb-4">{a.excerpt[locale]}</p>
              <span className="text-ink-muted text-xs font-en">{a.readMinutes} {locale === "ar" ? "دقائق قراءة" : "min read"}</span>
            </Link>
          </Reveal>
        ))}
      </div>
      <Footer />
    </main>
  );
}
