// @ts-ignore — هذا الاستيراد يعتمد على أنواع مولَّدة بواسطة "prisma generate"
// (يعمل تلقائيًا عبر postinstall في بيئة Railway). في بيئة تطوير محلية لم
// تُشغَّل فيها الأوامر بعد، هذا السطر قد يفشل من ناحية الأنواع فقط دون
// التأثير على البناء أو التشغيل الفعلي بعد التوليد الحقيقي.
import { PrismaClient } from "@prisma/client";

// نمط Singleton قياسي، لكن مع إنشاء كسول (lazy) للعميل بدل إنشائه عند تحميل
// الوحدة مباشرة. هذا ضروري لأن "prisma generate" قد لا يكون تم تشغيله بعد في
// بعض بيئات البناء (راجع README) — الإنشاء الكسول يمنع فشل عملية "جمع بيانات
// الصفحة" في Next.js عند مجرد استيراد هذا الملف، ويؤجل أي خطأ فعلي إلى لحظة
// الاستخدام الحقيقي (طلب API فعلي) بدل وقت البناء.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  return new PrismaClient();
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}
