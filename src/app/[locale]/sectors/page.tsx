import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { sectorsList } from "@/lib/site-data";
import { getLocale } from "next-intl/server";

export default async function SectorsPage() {
  const locale = (await getLocale()) as "ar" | "en";
  return (
    <main>
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "القطاعات" : "Sectors"}
        title={locale === "ar" ? "حلول مصممة حسب خصوصية كل قطاع" : "Solutions designed for the specifics of each sector"}
        lead={
          locale === "ar"
            ? "نفس المنهجية، لكن القرارات التقنية تختلف حسب طبيعة عملك."
            : "Same methodology, but the technical decisions change based on how your business actually works."
        }
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {sectorsList.map((s) => (
          <div key={s.ar} className="rounded-xl border border-white/8 bg-bg-deep-2 text-center px-3 py-6 hover:border-brand-blue transition">
            {s[locale]}
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
