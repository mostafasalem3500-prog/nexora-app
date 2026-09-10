import { getPrisma } from "@/lib/prisma";

export type SiteSettings = {
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
};

const DEFAULTS: SiteSettings = {
  nameAr: "نكسورا تك",
  nameEn: "NEXORA TECH",
  taglineAr: "نحوّل الأفكار إلى أنظمة رقمية تعمل وتنمو",
  taglineEn: "We turn ideas into digital systems that work and grow",
  email: "info@nexora.local",
  phone: null,
  whatsapp: null,
};

// تُقرأ إعدادات الهوية من قاعدة البيانات (لوحة التحكم → إعدادات الهوية).
// عند تعذّر الاتصال (مثل بيئة تطوير محلية بلا Postgres)، تُستخدم القيم
// الافتراضية أدناه حتى لا ينهار أي عرض للصفحة.
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const prisma = getPrisma();
    // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
    const s = await (prisma as any).siteSettings.findUnique({ where: { id: "singleton" } });
    if (!s) return DEFAULTS;
    return {
      nameAr: s.nameAr || DEFAULTS.nameAr,
      nameEn: s.nameEn || DEFAULTS.nameEn,
      taglineAr: s.taglineAr || DEFAULTS.taglineAr,
      taglineEn: s.taglineEn || DEFAULTS.taglineEn,
      email: s.email || DEFAULTS.email,
      phone: s.phone,
      whatsapp: s.whatsapp,
    };
  } catch {
    return DEFAULTS;
  }
}
