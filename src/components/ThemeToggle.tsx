"use client";

import { useState } from "react";

// القيمة الأولية تُقرأ مباشرة من DOM بدل useEffect+setState: الخاصية
// data-theme يضبطها ThemeScript (سكربت مضمّن يعمل قبل الـHydration) لذا
// تكون صحيحة بالفعل عند أول render على المتصفح — لا حاجة لعرض "dark"
// افتراضيًا ثم تصحيحه بعد التركيب (وميض) ولا لعملية setState متزامنة
// داخل effect (تسبب إعادة render إضافية غير ضرورية).
function getInitialTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("nexora-theme", next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      className="w-9 h-9 rounded-full border border-border-subtle-strong flex items-center justify-center text-sm hover:border-brand-teal transition shrink-0"
      title={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
      suppressHydrationWarning
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
