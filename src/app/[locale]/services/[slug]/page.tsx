import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { services, serviceCategories, getServiceBySlug, faqsGlobal } from "@/lib/site-data";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const isAr = locale === "ar";
  return {
    title: isAr ? service.name.ar : service.name.en,
    description: isAr ? service.resultLine.ar : service.resultLine.en,
  };
}

const STEPS_AR = ["الاستكشاف وتحليل الاحتياج", "الاستراتيجية وتجربة المستخدم", "التصميم والنموذج الأولي", "التطوير والتكامل", "الاختبار والإطلاق", "القياس والدعم والتطوير"];
const STEPS_EN = ["Discovery & needs analysis", "Strategy & UX", "Design & prototype", "Development & integration", "Testing & launch", "Measurement & ongoing support"];

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as "ar" | "en";
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const category = serviceCategories.find((c) => c.slug === service.category)!;
  const steps = locale === "ar" ? STEPS_AR : STEPS_EN;

  return (
    <main id="main-content">
      <Header />
      <section className="pt-40 pb-16 relative overflow-hidden" style={{ background: "radial-gradient(ellipse 500px 300px at 90% 0%, rgba(42,92,255,.16), transparent 60%), var(--surface-bg)" }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <Link href="/services" className="text-brand-teal text-sm hover:underline">
            {locale === "ar" ? "→ كل الخدمات" : "→ All services"}
          </Link>
          <div className="text-ink-muted text-sm mt-4 mb-2">{category.name[locale]}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">{service.name[locale]}</h1>
          <p className="text-brand-teal text-lg font-semibold">{service.resultLine[locale]}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-6 pb-24 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold mb-3">{locale === "ar" ? "المشكلة التي نعالجها" : "The problem we solve"}</h2>
            <p className="text-ink-muted leading-relaxed">
              {locale === "ar"
                ? `كثير من الفرق تتعامل مع هذا الجانب من العمل يدويًا أو عبر أدوات متفرقة لا تتحدث مع بعضها، ما يستهلك وقتًا ويزيد فرص الخطأ.`
                : `Many teams handle this part of the business manually or through disconnected tools that don't talk to each other, wasting time and increasing the chance of error.`}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">{locale === "ar" ? "الحل الذي نقدّمه" : "The solution we provide"}</h2>
            <p className="text-ink-muted leading-relaxed">
              {locale === "ar"
                ? `نصمم ونبني ${service.name.ar} بما يتناسب مع حجم عملك وأنظمتك الحالية، بحيث تحصل على "${service.resultLine.ar}" كنتيجة ملموسة وليس مجرد أداة إضافية.`
                : `We design and build ${service.name.en} tailored to your business size and existing systems, so you get "${service.resultLine.en}" as a tangible outcome — not just another tool.`}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "خطوات التنفيذ" : "Delivery steps"}</h2>
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3 items-start">
                  <span className="en shrink-0 w-7 h-7 rounded-full bg-bg-deep-2 border border-border-subtle flex items-center justify-center text-sm text-brand-teal">
                    {i + 1}
                  </span>
                  <span className="text-ink-muted pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "أسئلة شائعة" : "Frequently asked questions"}</h2>
            <div className="space-y-4">
              {faqsGlobal.map((f) => (
                <div key={f.q.ar} className="glow-card rounded-xl border border-border-subtle bg-bg-deep-2 p-5">
                  <h3 className="font-semibold mb-1.5">{f.q[locale]}</h3>
                  <p className="text-ink-muted text-sm">{f.a[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="glow-card h-fit rounded-2xl border border-border-subtle bg-bg-deep-2 p-6 sticky top-28">
          <h3 className="font-semibold mb-2">{locale === "ar" ? "جاهز تبدأ؟" : "Ready to start?"}</h3>
          <p className="text-ink-muted text-sm mb-5">
            {locale === "ar" ? "احصل على استشارة مبدئية مجانية حول هذه الخدمة." : "Get a free initial consultation about this service."}
          </p>
          <Link
            href="/contact"
            className="block text-center rounded-md px-5 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition"
          >
            {locale === "ar" ? "اطلب عرض سعر" : "Request a quote"}
          </Link>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
