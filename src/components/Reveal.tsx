"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  // يحترم prefers-reduced-motion فعليًا: الحركة عبر Framer Motion تُشغَّل
  // بجافاسكربت (WAAPI) لا بـCSS transition/animation، لذا قاعدة
  // @media (prefers-reduced-motion: reduce) في globals.css لا تلتقطها.
  // عند تفعيل الخيار، تُعرض العناصر مباشرة بلا إزاحة ولا مهلة زمنية.
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
