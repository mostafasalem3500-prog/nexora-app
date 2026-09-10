"use client";
import { useTranslations } from "next-intl";

export default function TrustStrip() {
  const t = useTranslations("trust");
  const items = t.raw("items") as string[];
  return (
    <div className="border-y border-white/8">
      <div className="mx-auto max-w-[1240px] px-6 py-8 flex flex-wrap justify-between gap-6 text-ink-muted text-[.92rem]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
