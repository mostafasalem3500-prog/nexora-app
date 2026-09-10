import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { articles } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const isAr = locale === "ar";
  return { title: article.title[isAr ? "ar" : "en"], description: article.excerpt[isAr ? "ar" : "en"] };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as "ar" | "en";
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <main id="main-content">
      <Header />
      <section className="pt-40 pb-12">
        <div className="mx-auto max-w-[760px] px-6">
          <Link href="/blog" className="text-brand-teal text-sm hover:underline">
            {locale === "ar" ? "→ مركز المعرفة" : "→ Knowledge Center"}
          </Link>
          <div className="flex items-center gap-3 mt-4 mb-3 text-sm text-ink-muted">
            <span className="text-brand-teal">{article.category[locale]}</span>
            <span>·</span>
            <span className="font-en">{article.readMinutes} {locale === "ar" ? "دقائق قراءة" : "min read"}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">{article.title[locale]}</h1>
        </div>
      </section>
      <article className="mx-auto max-w-[760px] px-6 pb-24 space-y-5 text-ink-muted leading-loose text-lg">
        {article.body.map((p, i) => (
          <p key={i}>{p[locale]}</p>
        ))}
      </article>
      <Footer />
    </main>
  );
}
