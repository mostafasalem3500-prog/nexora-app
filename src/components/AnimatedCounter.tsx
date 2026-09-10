"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200 });
  const [display, setDisplay] = useState(0);
  // العدّاد المتحرك (0 ← القيمة النهائية) حركة تلقائية بحتة، فتُعرض القيمة
  // النهائية مباشرة بلا عدّ متحرك عند تفعيل prefers-reduced-motion — عبر
  // حساب القيمة المعروضة أثناء الـrender بدل استدعاء setState إضافي داخل
  // effect (الذي يخالف قاعدة react-hooks/set-state-in-effect).
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  const shown = shouldReduceMotion ? (inView ? value : 0) : display;

  return (
    <motion.span ref={ref} className={className}>
      {shown}
      {suffix}
    </motion.span>
  );
}
