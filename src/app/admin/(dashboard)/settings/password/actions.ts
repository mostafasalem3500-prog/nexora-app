"use server";

import { getPrisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function changePassword(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "غير مسجّل الدخول" };

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (newPassword.length < 8) return { error: "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل" };
  if (newPassword !== confirmPassword) return { error: "كلمتا المرور الجديدتان غير متطابقتين" };

  const prisma = getPrisma();
  // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
  const user = await (prisma as any).user.findUnique({ where: { id: (session.user as any).id } });
  if (!user) return { error: "المستخدم غير موجود" };

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return { error: "كلمة المرور الحالية غير صحيحة" };

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await (prisma as any).user.update({ where: { id: user.id }, data: { passwordHash } });

  return { success: true };
}
