import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import ThemeScript from "@/components/ThemeScript";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/get-site-settings";
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
  const site = await getSiteSettings();
  const title = isAr ? `${site.nameAr} | ${site.nameEn}` : `${site.nameEn} | ${site.nameAr}`;
  const description = isAr ? site.taglineAr : site.taglineEn;
  return {
    title: { default: title, template: `%s | ${isAr ? site.nameAr : site.nameEn}` },
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
  const siteSettings = await getSiteSettings();
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
        <a href="#main-content" className="skip-link">
          {locale === "ar" ? "تخطَّ إلى المحتوى الرئيسي" : "Skip to main content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <SiteSettingsProvider value={siteSettings}>{children}</SiteSettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
