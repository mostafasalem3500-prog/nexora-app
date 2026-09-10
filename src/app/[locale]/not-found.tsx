"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  // حركات الدخول هنا تلقائية (initial/animate عند التحميل)، فتُحترم
  // prefers-reduced-motion صراحة بدل الاعتماد فقط على قاعدة CSS العامة
  // التي لا تغطي حركة Framer Motion.
  const shouldReduceMotion = useReducedMotion();
  const transition = (base: Transition): Transition => (shouldReduceMotion ? { duration: 0 } : base);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 600px 400px at 50% 20%, rgba(42,92,255,.18), transparent 60%), var(--surface-bg)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--surface-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--surface-grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition({ duration: 0.6, ease: "easeOut" })}
          className="font-en text-7xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, var(--brand-blue), var(--brand-teal))" }}
        >
          404
        </motion.div>
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition({ duration: 0.5, delay: 0.15 })}
          className="text-2xl font-bold mb-3"
        >
          هذه الصفحة غير موجودة
        </motion.h1>
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition({ duration: 0.5, delay: 0.25 })}
          className="text-ink-muted mb-8"
        >
          ربما تغيّر الرابط أو لم يعد متاحًا. ارجع للرئيسية أو استكشف خدماتنا.
        </motion.p>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition({ duration: 0.5, delay: 0.35 })}
          className="flex gap-3 justify-center flex-wrap"
        >
          <Link
            href="/"
            className="rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition"
          >
            الرئيسية
          </Link>
          <Link
            href="/services"
            className="rounded-md px-6 py-3 font-semibold border border-border-subtle-strong hover:border-brand-teal hover:text-brand-teal transition"
          >
            خدماتنا
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
