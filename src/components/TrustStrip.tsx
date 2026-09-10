"use client";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export default function TrustStrip() {
  const t = useTranslations("trust");
  const items = t.raw("items") as string[];
  return (
    <div className="border-y border-border-subtle">
      <div className="mx-auto max-w-[1240px] px-6 py-8 flex flex-wrap justify-between gap-6 text-ink-muted text-[.92rem]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
