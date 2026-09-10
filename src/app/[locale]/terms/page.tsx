import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

const AR = `
باستخدامك موقع نكسورا تك، فإنك توافق على الشروط التالية.

**نطاق الخدمة**
يعرض هذا الموقع خدمات تقنية (تطوير مواقع، تطبيقات، أنظمة مؤسسية) بشكل تعريفي. أي التزام تعاقدي فعلي يتم فقط عبر عرض سعر أو عقد منفصل موقّع بين الطرفين.

**المحتوى التجريبي**
بعض المحتوى في هذا الموقع (دراسات الحالة، الآراء، الإحصاءات) هو محتوى تجريبي موضّح بوضوح ("مشروع تجريبي لعرض القدرات" أو "محتوى تجريبي")، ولا يمثل نتائج فعلية أو عملاء حقيقيين ما لم يُذكر خلاف ذلك صراحة.

**الملكية الفكرية**
جميع النصوص والتصاميم والشعارات المعروضة في هذا الموقع محمية، ولا يجوز نسخها أو إعادة استخدامها دون إذن كتابي.

**حدود المسؤولية**
نبذل جهدنا لإبقاء المعلومات دقيقة ومحدّثة، لكننا لا نضمن خلو الموقع من الأخطاء التقنية. لا نتحمل مسؤولية أي قرار عمل يُتخذ بناءً على محتوى تعريفي دون استشارة مباشرة معنا.

**التعديلات**
يجوز تحديث هذه الشروط دون إشعار مسبق. يُنصح بمراجعتها بشكل دوري.
`;

const EN = `
By using the NEXORA TECH website, you agree to the following terms.

**Scope of service**
This site presents technology services (web, app, and enterprise system development) for informational purposes. Any actual contractual commitment happens only through a separate signed quote or agreement between both parties.

**Demo content**
Some content on this site (case studies, testimonials, statistics) is clearly labeled demo content ("Demo project showcasing capability" or "Demo content") and does not represent real outcomes or real clients unless explicitly stated otherwise.

**Intellectual property**
All text, designs, and logos shown on this site are protected and may not be copied or reused without written permission.

**Limitation of liability**
We work to keep information accurate and current, but we do not guarantee the site is free of technical errors. We are not liable for any business decision made based on informational content without direct consultation with us.

**Changes**
These terms may be updated without prior notice. Please review them periodically.
`;


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "الشروط والأحكام" : "Terms & Conditions",
    description: isAr ? "شروط استخدام موقع نكسورا تك." : "Terms of use for the NEXORA TECH website.",
  };
}

export default async function TermsPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const content = locale === "ar" ? AR : EN;
  return (
    <main>
      <Header />
      <PageHeader title={locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"} />
      <div className="mx-auto max-w-[820px] px-6 pb-24 space-y-5 text-ink-muted leading-relaxed whitespace-pre-line">
        {content.trim()}
      </div>
      <Footer />
    </main>
  );
}
