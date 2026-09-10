import { getPrisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddUserForm from "./AddUserForm";
import UserRow from "./UserRow";

export default async function UsersPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "ADMIN") redirect("/admin/dashboard");

  const prisma = getPrisma();
  let users: any[] = [];
  try {
    // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
    users = await (prisma as any).user.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    users = [];
  }

  const currentUserId = (session?.user as any)?.id as string;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">إدارة المستخدمين</h1>
      <p className="text-ink-muted text-sm mb-6">
        إضافة وحذف حسابات فريق لوحة التحكم وتحديد دور كل حساب (مدير نظام / محرر محتوى / مبيعات).
      </p>

      <AddUserForm />

      <div className="mt-8 rounded-xl border border-white/8 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-deep-2 text-ink-muted text-start">
              <th className="text-start px-4 py-3 font-medium">البريد الإلكتروني</th>
              <th className="text-start px-4 py-3 font-medium">الدور</th>
              <th className="text-start px-4 py-3 font-medium">آخر دخول</th>
              <th className="text-start px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <UserRow key={u.id} user={u} isSelf={u.id === currentUserId} />
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-ink-muted">
                  لا يوجد مستخدمون بعد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
