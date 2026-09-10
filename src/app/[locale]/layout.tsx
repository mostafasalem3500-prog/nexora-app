import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "نكسورا تك | NEXORA TECH" : "NEXORA TECH | نكسورا تك";
  const description = isAr
    ? "نحوّل الأفكار إلى أنظمة رقمية تعمل وتنمو — مواقع، تطبيقات، وأنظمة مؤسسية (ERP/CRM) مصممة ومبرمجة بجودة عالية."
    : "We turn ideas into digital systems that work and grow — websites, apps, and enterprise systems (ERP/CRM) designed and built to a high standard.";
  return {
    title: { default: title, template: `%s | ${isAr ? "نكسورا تك" : "NEXORA TECH"}` },
    description,
    openGraph: { title, description, locale: isAr ? "ar_SA" : "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { languages: { ar: "/ar", en: "/en" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
