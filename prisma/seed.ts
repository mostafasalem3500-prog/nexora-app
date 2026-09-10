// سكربت تزويد أولي: يُنشئ حساب مدير النظام الأول وسجل SiteSettings الافتراضي.
// يُشغَّل يدويًا مرة واحدة بعد أول نشر عبر: npx prisma db seed
// بيانات الدخول تُقرأ من متغيرات البيئة SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD
// (راجع .env.example) — غيّرها فور أول تسجيل دخول ناجح.

// @ts-ignore — انظر التعليق في src/lib/prisma.ts بخصوص التوليد المؤجل
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@nexora.local";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await (prisma as any).user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await (prisma as any).user.create({
      data: { email, passwordHash, role: "ADMIN" },
    });
    console.log(`✅ تم إنشاء حساب المدير: ${email}`);
  } else {
    console.log(`ℹ️ حساب المدير موجود مسبقًا: ${email}`);
  }

  const settings = await (prisma as any).siteSettings.findUnique({ where: { id: "singleton" } });
  if (!settings) {
    await (prisma as any).siteSettings.create({
      data: {
        id: "singleton",
        nameAr: "نكسورا تك",
        nameEn: "NEXORA TECH",
        taglineAr: "نحوّل الأفكار إلى أنظمة رقمية تعمل وتنمو",
        taglineEn: "We turn ideas into digital systems that work and grow",
        email: "info@nexora.local",
        isDemoIdentity: true,
      },
    });
    console.log("✅ تم إنشاء إعدادات الموقع الافتراضية");
  } else {
    console.log("ℹ️ إعدادات الموقع موجودة مسبقًا");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
