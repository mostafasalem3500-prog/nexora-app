"use server";

import { getPrisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const ALLOWED_STATUSES = ["NEW", "IN_REVIEW", "QUOTED", "WON", "LOST"];

export async function updateRequestStatus(id: string, status: string) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!role || !["ADMIN", "SALES"].includes(role)) throw new Error("غير مصرّح");
  if (!ALLOWED_STATUSES.includes(status)) throw new Error("حالة غير صحيحة");

  const prisma = getPrisma();
  // ملاحظة: (prisma as any) مؤقت — راجع src/lib/prisma.ts
  await (prisma as any).projectRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/requests");
}

export async function addRequestNote(id: string, note: string) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!role || !["ADMIN", "SALES"].includes(role)) throw new Error("غير مصرّح");
  if (!note.trim()) return;

  const prisma = getPrisma();
  const record = await (prisma as any).projectRequest.findUnique({ where: { id } });
  if (!record) return;

  const notes = JSON.parse(record.notesJson || "[]");
  notes.push({ text: note, at: new Date().toISOString(), by: session?.user?.email });

  await (prisma as any).projectRequest.update({
    where: { id },
    data: { notesJson: JSON.stringify(notes) },
  });
  revalidatePath("/admin/requests");
}
