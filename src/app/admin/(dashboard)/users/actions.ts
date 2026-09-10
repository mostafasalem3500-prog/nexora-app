"use server";

import { getPrisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const ALLOWED_ROLES = ["ADMIN", "EDITOR", "SALES"];

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "ADMIN") throw new Error("غير مصرّح — هذا القسم لمدير النظام فقط");
  return session!;
}

export async function createUser(prevState: any, formData: FormData) {
  await requireAdmin();

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "");

  if (!email || !email.includes("@")) return { error: "بريد إلكتروني غير صحيح" };
  if (password.length < 8) return { error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" };
  if (!ALLOWED_ROLES.includes(role)) return { error: "دور غير صحيح" };

  const prisma = getPrisma();
  // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
  const existing = await (prisma as any).user.findUnique({ where: { email } });
  if (existing) return { error: "هذا البريد مستخدم بالفعل" };

  const passwordHash = await bcrypt.hash(password, 10);
  await (prisma as any).user.create({ data: { email, passwordHash, role } });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();

  if ((session.user as any).id === id) throw new Error("لا يمكنك حذف حسابك الخاص");

  const prisma = getPrisma();
  const target = await (prisma as any).user.findUnique({ where: { id } });
  if (!target) return;

  if (target.role === "ADMIN") {
    const adminCount = await (prisma as any).user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) throw new Error("لا يمكن حذف آخر حساب مدير نظام");
  }

  await (prisma as any).user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
