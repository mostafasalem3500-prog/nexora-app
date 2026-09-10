"use client";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import {
  ShoppingBag,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Plane,
  Truck,
  HandHeart,
  Building2,
  Factory,
  Landmark,
  type LucideIcon,
} from "lucide-react";

const SECTORS: { name: string; icon: LucideIcon }[] = [
  { name: "التجارة", icon: ShoppingBag },
  { name: "الخدمات", icon: Briefcase },
  { name: "التعليم", icon: GraduationCap },
  { name: "الصحة", icon: HeartPulse },
  { name: "السياحة والضيافة", icon: Plane },
  { name: "اللوجستيات", icon: Truck },
  { name: "القطاع غير الربحي", icon: HandHeart },
  { name: "العقارات", icon: Building2 },
  { name: "التصنيع", icon: Factory },
  { name: "الجهات الحكومية", icon: Landmark },
];

export default function Sectors() {
  const t = useTranslations("sectors");
  return (
    <section
      id="sectors"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 600px 350px at 0% 0%, rgba(124,92,255,.08), transparent 60%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <Reveal>
          <h2 className="text-3xl font-bold mb-9">{t("title")}</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SECTORS.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="glow-card rounded-xl border border-border-subtle bg-bg-deep-2 text-center px-3 py-5 text-sm hover:border-brand-blue hover:-translate-y-0.5 transition"
            >
              <Icon size={20} className="mx-auto mb-2 text-brand-teal" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
