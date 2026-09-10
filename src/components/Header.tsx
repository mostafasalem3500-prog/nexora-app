"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/work", label: t("work") },
    { href: "/sectors", label: t("sectors") },
    { href: "/about", label: t("about") },
  ];

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
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
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
          {links.map((l) => (
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
            href="/contact"
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
