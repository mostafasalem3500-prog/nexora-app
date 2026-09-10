"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-deep/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,.06)] py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-6 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
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
            نكسورا <span className="en">TECH</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-7 text-[.95rem] text-ink-muted">
          <a href="#hero" className="hover:text-ink">{t("home")}</a>
          <a href="#services" className="hover:text-ink">{t("services")}</a>
          <a href="#solutions" className="hover:text-ink">{t("solutions")}</a>
          <a href="#work" className="hover:text-ink">{t("work")}</a>
          <a href="#sectors" className="hover:text-ink">{t("sectors")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-md border border-white/15 px-4 py-2 text-sm hover:border-brand-teal hover:text-brand-teal transition">
            {t("cta")}
          </button>
        </div>
      </div>
    </header>
  );
}
