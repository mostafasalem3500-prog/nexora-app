import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "تواصل معنا" : "Contact Us",
    description: isAr ? "أرسل تفاصيل مشروعك واحصل على استشارة أولية خلال يوم عمل واحد." : "Send us your project details and get an initial consultation within one business day.",
  };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main id="main-content">
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "تواصل معنا" : "Contact Us"}
        title={locale === "ar" ? "خلينا نسمع عن مشروعك" : "Let's hear about your project"}
        lead={
          locale === "ar"
            ? "املأ النموذج وسنعاود التواصل معك خلال يوم عمل واحد."
            : "Fill in the form and we'll get back to you within one business day."
        }
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
        <div className="rounded-2xl border border-white/8 bg-bg-deep-2 p-6 md:p-8">
          <ContactForm locale={locale} />
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl border border-white/8 bg-bg-deep-2 p-6">
            <h3 className="font-semibold mb-2">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</h3>
            <p className="text-ink-muted en" dir="ltr">
              info@nexora.local
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-bg-deep-2 p-6">
            <h3 className="font-semibold mb-2">{locale === "ar" ? "وقت الاستجابة" : "Response time"}</h3>
            <p className="text-ink-muted text-sm">
              {locale === "ar" ? "خلال يوم عمل واحد لكل الاستفسارات." : "Within one business day for all inquiries."}
            </p>
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
