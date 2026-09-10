import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

const VALUES = [
  { ar: { h: "الوضوح قبل التعقيد", p: "نبدأ دائمًا بفهم المشكلة الحقيقية قبل اقتراح أي حل تقني، مهما بدا الحل جذابًا." }, en: { h: "Clarity before complexity", p: "We start by understanding the real problem before proposing any technical solution, however appealing it looks." } },
  { ar: { h: "الملكية الكاملة للكود", p: "كل مشروع نسلّمه يصير ملكك بالكامل — الكود، القاعدة، والتوثيق — بلا اعتماد على منصات مغلقة." }, en: { h: "Full code ownership", p: "Every project we deliver is fully yours — code, database, and documentation — with no lock-in to closed platforms." } },
  { ar: { h: "دعم لا ينتهي عند التسليم", p: "الإطلاق بداية العلاقة، لا نهايتها. نبقى معك في مرحلة القياس والتطوير المستمر." }, en: { h: "Support doesn't end at launch", p: "Launch is the start of the relationship, not the end. We stay with you through measurement and ongoing development." } },
];


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "من نحن" : "About Us",
    description: isAr ? "فريق نكسورا تك: مديرو منتج، مصممون، ومطورون متخصصون في الحلول العربية المؤسسية." : "The NEXORA TECH team: product managers, designers, and developers specialized in Arabic enterprise solutions.",
  };
}

export default async function AboutPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main>
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "من نحن" : "About Us"}
        title={locale === "ar" ? "شركة تقنية تبني الأنظمة التي تشغّل بها أعمالها أيضًا" : "A tech company that runs its own business on the systems it builds"}
        lead={
          locale === "ar"
            ? "نكسورا تك فريق متكامل من مديري منتج، مصممين، ومطورين متخصصين في الحلول العربية المؤسسية."
            : "NEXORA TECH is a full team of product managers, designers, and developers specialized in Arabic enterprise solutions."
        }
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.ar.h} className="rounded-xl border border-white/8 bg-bg-deep-2 p-6">
              <h3 className="font-semibold mb-2">{v[locale].h}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{v[locale].p}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
