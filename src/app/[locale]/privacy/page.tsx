import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

const AR = `
نلتزم في نكسورا تك بحماية خصوصية زوار موقعنا وعملائنا. توضح هذه السياسة نوع البيانات التي نجمعها وكيفية استخدامها.

**البيانات التي نجمعها**
عند تعبئتك لنموذج طلب مشروع أو نموذج تواصل، نجمع: الاسم، البريد الإلكتروني، رقم الجوال (إن قُدِّم)، ووصف مشروعك. لا نجمع بيانات دفع أو معلومات حساسة عبر هذه النماذج.

**كيف نستخدم بياناتك**
نستخدم بياناتك فقط للرد على استفسارك، وإعداد عرض سعر أو استشارة، والتواصل بخصوص مشروعك. لا نبيع بياناتك لأي جهة خارجية.

**الاحتفاظ بالبيانات**
نحتفظ بطلبات المشاريع للمتابعة التجارية المعتادة، ويمكنك طلب حذف بياناتك بالتواصل معنا عبر البريد الإلكتروني المذكور في صفحة "تواصل معنا".

**ملفات تعريف الارتباط**
قد يستخدم الموقع ملفات تعريف ارتباط أساسية لتذكّر تفضيل الوضع الداكن/الفاتح واللغة. لا نستخدم ملفات تتبع إعلاني.

**التواصل**
لأي استفسار يخص هذه السياسة، تواصل معنا عبر صفحة "تواصل معنا".
`;

const EN = `
At NEXORA TECH, we're committed to protecting the privacy of our website visitors and clients. This policy explains what data we collect and how we use it.

**Data we collect**
When you submit a project request or contact form, we collect: name, email, phone number (if provided), and your project description. We do not collect payment data or sensitive information through these forms.

**How we use your data**
We use your data only to respond to your inquiry, prepare a quote or consultation, and communicate about your project. We never sell your data to third parties.

**Data retention**
We retain project requests for normal business follow-up. You can request deletion of your data by contacting us via the email listed on our Contact page.

**Cookies**
The site may use essential cookies to remember your dark/light mode and language preference. We do not use advertising trackers.

**Contact**
For any question about this policy, reach us via the Contact page.
`;


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    description: isAr ? "كيف نجمع بيانات زوار وعملاء نكسورا تك ونستخدمها." : "How NEXORA TECH collects and uses visitor and client data.",
  };
}

export default async function PrivacyPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const content = locale === "ar" ? AR : EN;
  return (
    <main id="main-content">
      <Header />
      <PageHeader title={locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"} />
      <div className="mx-auto max-w-[820px] px-6 pb-24 space-y-5 text-ink-muted leading-relaxed whitespace-pre-line">
        {content.trim()}
      </div>
      <Footer />
    </main>
  );
}
