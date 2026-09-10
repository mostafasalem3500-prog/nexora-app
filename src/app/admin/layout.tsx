import "../[locale]/globals.css";

export const metadata = {
  title: "لوحة التحكم | نكسورا تك",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-ar">{children}</body>
    </html>
  );
}
