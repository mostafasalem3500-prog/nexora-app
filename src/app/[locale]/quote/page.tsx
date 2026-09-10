import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import QuoteWizard from "@/components/QuoteWizard";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "اطلب عرض سعر" : "Request a Quote",
    description: isAr ? "نموذج تفصيلي متعدد الخطوات لطلب عرض سعر دقيق." : "A detailed multi-step form for an accurate quote request.",
  };
}

export default async function QuotePage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main id="main-content">
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "اطلب عرض سعر" : "Request a Quote"}
        title={locale === "ar" ? "أسئلة قليلة تكفينا لإعداد عرض دقيق" : "A few questions is all we need for an accurate quote"}
        lead={locale === "ar" ? "يُحفَظ تقدّمك تلقائيًا إن غادرت الصفحة وعدت لاحقًا." : "Your progress saves automatically if you leave and come back."}
      />
      <div className="mx-auto max-w-[720px] px-6 pb-24">
        <div className="rounded-2xl border border-white/8 bg-bg-deep-2 p-6 md:p-10">
          <QuoteWizard locale={locale} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
