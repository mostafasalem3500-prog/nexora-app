import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Link } from "@/i18n/navigation";
import { serviceCategories, getServicesByCategory } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  Globe,
  Smartphone,
  Layers,
  ShoppingCart,
  Boxes,
  Users,
  Wallet,
  UserCog,
  BarChart3,
  Bot,
  MapPinned,
  Plug,
  Cloud,
  ShieldCheck,
  LifeBuoy,
  Palette,
  Compass,
  type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "web-design-dev": Globe,
  "mobile-apps": Smartphone,
  "saas-platforms": Layers,
  "ecommerce-booking": ShoppingCart,
  erp: Boxes,
  crm: Users,
  "accounting-finance": Wallet,
  "hr-payroll": UserCog,
  "dashboards-bi": BarChart3,
  "ai-automation": Bot,
  "gis-mapping": MapPinned,
  "system-integration-api": Plug,
  "cloud-devops": Cloud,
  "cybersecurity-backup": ShieldCheck,
  "support-maintenance": LifeBuoy,
  "ux-ui-identity": Palette,
  "tech-consulting-feasibility": Compass,
};


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";
  return {
    title: isAr ? "دليل الخدمات" : "Services Directory",
    description: isAr ? "خدمات مصنّفة إلى 5 مجموعات: منتجات رقمية، حلول مؤسسية، بيانات وذكاء اصطناعي، بنية تحتية وتكامل، تصميم واستشارات." : "Services grouped into 5 categories: digital products, enterprise solutions, data & AI, infrastructure & integration, design & consulting.",
  };
}

export default async function ServicesPage() {
  const locale = (await getLocale()) as "ar" | "en";

  return (
    <main id="main-content">
      <Header />
      <PageHeader
        eyebrow={locale === "ar" ? "دليل الخدمات" : "Services Directory"}
        title={locale === "ar" ? "خدمات مصنّفة حسب أثرها على عملك" : "Services grouped by the impact they have on your business"}
        lead={
          locale === "ar"
            ? "خمس مجموعات تغطي كل ما تحتاجه من منتج رقمي إلى بنية تحتية مؤسسية."
            : "Five groups covering everything from a digital product to enterprise infrastructure."
        }
      />
      <div className="mx-auto max-w-[1240px] px-6 pb-24 space-y-16">
        {serviceCategories.map((cat) => {
          const items = getServicesByCategory(cat.slug);
          return (
            <div key={cat.slug}>
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-border-subtle">{cat.name[locale]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((s) => {
                  const Icon = SERVICE_ICONS[s.slug];
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="glow-card group rounded-xl border border-border-subtle bg-bg-deep-2 p-5 hover:border-brand-blue transition"
                    >
                      {Icon && <Icon size={20} className="text-brand-teal mb-2.5" />}
                      <h3 className="font-semibold mb-2 group-hover:text-brand-teal transition">{s.name[locale]}</h3>
                      <p className="text-ink-muted text-sm">{s.resultLine[locale]}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}
