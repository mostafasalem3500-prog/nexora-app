"use client";

import { useState, useTransition } from "react";
import { deleteUser } from "./actions";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "مدير نظام",
  EDITOR: "محرر محتوى",
  SALES: "مبيعات",
};

export default function UserRow({ user, isSelf }: { user: any; isSelf: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(`هل أنت متأكد من حذف ${user.email}؟ لا يمكن التراجع عن هذا الإجراء.`);
    if (!confirmed) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteUser(user.id);
      } catch (e: any) {
        setError(e?.message || "تعذّر حذف المستخدم");
      }
    });
  }

  return (
    <tr className="border-t border-white/8">
      <td className="px-4 py-3 font-en" dir="ltr">
        {user.email}
        {isSelf && <span className="text-ink-muted text-xs ms-2">(أنت)</span>}
      </td>
      <td className="px-4 py-3">{ROLE_LABELS[user.role] || user.role}</td>
      <td className="px-4 py-3 text-ink-muted">
        {user.lastLogin ? new Date(user.lastLogin).toLocaleString("ar") : "—"}
      </td>
      <td className="px-4 py-3 text-end">
        {!isSelf && (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-400 hover:underline disabled:opacity-40 text-sm"
          >
            {isPending ? "جارٍ الحذف..." : "حذف"}
          </button>
        )}
        {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
      </td>
    </tr>
  );
}
