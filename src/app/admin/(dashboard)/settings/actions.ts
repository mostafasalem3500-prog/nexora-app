"use server";

import { getPrisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(formData: FormData) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "ADMIN") throw new Error("غير مصرّح — هذا القسم لمدير النظام فقط");

  const prisma = getPrisma();
  const data = {
    nameAr: String(formData.get("nameAr") || ""),
    nameEn: String(formData.get("nameEn") || ""),
    taglineAr: String(formData.get("taglineAr") || ""),
    taglineEn: String(formData.get("taglineEn") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || "") || null,
    whatsapp: String(formData.get("whatsapp") || "") || null,
  };

  // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
  await (prisma as any).siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/admin/settings");
}
