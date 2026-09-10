"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// زر بحركة مغناطيسية: يتبع مؤشر الفأرة بإزاحة محدودة ثم يعود لمكانه بنعومة.
// يُستخدم فوق الأزرار الأساسية فقط (CTA رئيسي) — تأثير بصري خفيف لا يغيّر
// أي سلوك وظيفي، لذا يمرَّر href/onClick عبر children (Link أو button عادي).
export default function MagneticButton({
  children,
  className = "",
  strength = 18,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  // إزاحة الزر المستمرة خلف المؤشر نوع من الحركة المُحفّزة للدوار (vestibular)
  // حتى لو كانت تفاعلية لا تلقائية، لذا تُعطَّل عند تفعيل prefers-reduced-motion.
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`magnetic-btn ${className}`}
    >
      {children}
    </motion.div>
  );
}
