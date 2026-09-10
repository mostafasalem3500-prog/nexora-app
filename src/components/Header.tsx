"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import ThemeToggle from "@/components/ThemeToggle";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { serviceCategories, getServicesByCategory } from "@/lib/site-data";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as "ar" | "en";
  const site = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLinks = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/sectors", label: t("sectors") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-deep/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,.06)] py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-6 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="url(#g1)" />
            <path d="M10 28V12l14 16V12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="30" cy="12" r="2.5" fill="#16C9B8" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="40" y2="40">
                <stop stopColor="#2A5CFF" />
                <stop offset="1" stopColor="#16C9B8" />
              </linearGradient>
            </defs>
          </svg>
          <span>
            {locale === "ar" ? site.nameAr : site.nameEn}
          </span>
        </Link>

        <nav className="hidden md:flex gap-7 text-[.95rem] text-ink-muted items-center">
          <Link href="/" className="hover:text-ink transition">
            {t("home")}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="hover:text-ink transition flex items-center gap-1">
              {t("services")}
              <span className="text-xs">▾</span>
            </button>
            {servicesOpen && (
              <div className="absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 pt-4 w-[560px] z-50">
                <div className="rounded-xl border border-white/10 bg-bg-deep-2 shadow-2xl p-5 grid grid-cols-2 gap-4">
                  {serviceCategories.map((cat) => {
                    const items = getServicesByCategory(cat.slug).slice(0, 3);
                    return (
                      <div key={cat.slug}>
                        <div className="text-brand-teal text-xs font-semibold mb-2">{cat.name[locale]}</div>
                        <ul className="space-y-1.5">
                          {items.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                className="text-sm text-ink-muted hover:text-ink transition block"
                              >
                                {s.name[locale]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <Link
                    href="/services"
                    className="col-span-2 mt-1 text-center text-sm text-brand-teal border-t border-white/10 pt-3 hover:underline"
                  >
                    {locale === "ar" ? "عرض كل الخدمات ←" : "View all services →"}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {otherLinks.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/quote"
            className="hidden md:inline-flex rounded-md border border-white/15 px-4 py-2 text-sm hover:border-brand-teal hover:text-brand-teal transition"
          >
            {t("cta")}
          </Link>
          <button
            className="md:hidden text-2xl leading-none"
            aria-label="فتح القائمة"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mx-4 mt-3 rounded-xl border border-white/10 bg-bg-deep-2 p-4 flex flex-col gap-1">
          <Link href="/" onClick={() => setMenuOpen(false)} className="py-2.5 px-2 rounded-lg hover:bg-white/5 text-ink-muted hover:text-ink transition">
            {t("home")}
          </Link>
          <Link href="/services" onClick={() => setMenuOpen(false)} className="py-2.5 px-2 rounded-lg hover:bg-white/5 text-ink-muted hover:text-ink transition">
            {t("services")}
          </Link>
          {otherLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-2 rounded-lg hover:bg-white/5 text-ink-muted hover:text-ink transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center rounded-md bg-gradient-to-br from-brand-blue to-brand-blue-dim py-2.5 font-semibold text-white"
          >
            {t("cta")}
          </Link>
        </div>
      )}
    </header>
  );
}
