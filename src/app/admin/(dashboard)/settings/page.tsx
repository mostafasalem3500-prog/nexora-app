import { getPrisma } from "@/lib/prisma";
import { updateSiteSettings } from "./actions";

export default async function SettingsPage() {
  const prisma = getPrisma();
  let settings: any = null;
  try {
    // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
    settings = await (prisma as any).siteSettings.findUnique({ where: { id: "singleton" } });
  } catch {
    settings = null;
  }

  const s = settings || {
    nameAr: "نكسورا تك",
    nameEn: "NEXORA TECH",
    taglineAr: "نحوّل الأفكار إلى أنظمة رقمية تعمل وتنمو",
    taglineEn: "We turn ideas into digital systems that work and grow",
    email: "info@nexora.local",
    phone: "",
    whatsapp: "",
  };

  const inputClass = "w-full rounded-md bg-bg-deep border border-white/12 px-4 py-2.5 focus:outline-none focus:border-brand-teal transition";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">إعدادات الهوية</h1>
      <p className="text-ink-muted text-sm mb-6">
        هذا هو مصدر الحقيقة الواحد لاسم الشركة وبياناتها — تعديله هنا يغيّر النص أينما ظهر (بعد ربط بقية الموقع بهذا المصدر).
      </p>
      <form action={updateSiteSettings} className="max-w-xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">اسم الشركة (عربي)</label>
            <input name="nameAr" defaultValue={s.nameAr} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">اسم الشركة (إنجليزي)</label>
            <input name="nameEn" defaultValue={s.nameEn} className={inputClass} dir="ltr" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1.5 text-ink-muted">الشعار النصي (عربي)</label>
          <input name="taglineAr" defaultValue={s.taglineAr} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1.5 text-ink-muted">الشعار النصي (إنجليزي)</label>
          <input name="taglineEn" defaultValue={s.taglineEn} className={inputClass} dir="ltr" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">البريد الإلكتروني</label>
            <input name="email" defaultValue={s.email} className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">الهاتف</label>
            <input name="phone" defaultValue={s.phone ?? ""} className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">واتساب</label>
            <input name="whatsapp" defaultValue={s.whatsapp ?? ""} className={inputClass} dir="ltr" />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition"
        >
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}
