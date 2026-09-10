import { getPrisma } from "@/lib/prisma";
import RequestRow from "./RequestRow";

export default async function RequestsPage() {
  const prisma = getPrisma();
  let requests: any[] = [];
  try {
    // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
    requests = await (prisma as any).projectRequest.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    requests = [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">طلبات المشاريع ({requests.length})</h1>
      <div className="space-y-3">
        {requests.map((req) => (
          <RequestRow key={req.id} req={req} />
        ))}
        {requests.length === 0 && (
          <p className="text-ink-muted">لا توجد طلبات بعد، أو تعذّر الاتصال بقاعدة البيانات.</p>
        )}
      </div>
    </div>
  );
}
