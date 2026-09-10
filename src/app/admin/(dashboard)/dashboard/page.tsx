import { auth } from "@/auth";
import { getPrisma } from "@/lib/prisma";

export default async function DashboardHome() {
  const session = await auth();
  const role = (session?.user as any)?.role as string;
  const prisma = getPrisma();

  let requestCount = 0;
  let newCount = 0;
  try {
    // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
    requestCount = await (prisma as any).projectRequest.count();
    newCount = await (prisma as any).projectRequest.count({ where: { status: "NEW" } });
  } catch {
    // في حال قاعدة البيانات غير متصلة بعد (مثل بيئة تطوير محلية بلا Postgres)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">نظرة عامة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-white/8 bg-bg-deep-2 p-6">
          <b className="text-3xl font-en text-brand-teal block mb-1">{requestCount}</b>
          <span className="text-ink-muted text-sm">إجمالي طلبات المشاريع</span>
        </div>
        <div className="rounded-xl border border-white/8 bg-bg-deep-2 p-6">
          <b className="text-3xl font-en text-brand-teal block mb-1">{newCount}</b>
          <span className="text-ink-muted text-sm">طلبات جديدة بلا متابعة</span>
        </div>
        <div className="rounded-xl border border-white/8 bg-bg-deep-2 p-6">
          <b className="text-lg block mb-1">
            {role === "ADMIN" ? "مدير نظام" : role === "EDITOR" ? "محرر محتوى" : "مبيعات"}
          </b>
          <span className="text-ink-muted text-sm">صلاحيتك الحالية</span>
        </div>
      </div>
    </div>
  );
}
