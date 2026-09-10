"use client";

import { useActionState } from "react";
import { changePassword } from "./actions";

const initialState = {} as { error?: string; success?: boolean };

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);
  const inputClass = "w-full rounded-md bg-bg-deep border border-white/12 px-4 py-2.5 focus:outline-none focus:border-brand-teal transition";

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <div>
        <label className="block text-sm mb-1.5 text-ink-muted">كلمة المرور الحالية</label>
        <input name="currentPassword" type="password" required className={inputClass} dir="ltr" />
      </div>
      <div>
        <label className="block text-sm mb-1.5 text-ink-muted">كلمة المرور الجديدة</label>
        <input name="newPassword" type="password" required minLength={8} className={inputClass} dir="ltr" />
      </div>
      <div>
        <label className="block text-sm mb-1.5 text-ink-muted">تأكيد كلمة المرور الجديدة</label>
        <input name="confirmPassword" type="password" required minLength={8} className={inputClass} dir="ltr" />
      </div>
      {state?.error && <p className="text-red-400 text-sm">{state.error}</p>}
      {state?.success && <p className="text-brand-teal text-sm">تم تغيير كلمة المرور بنجاح.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md px-6 py-2.5 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim disabled:opacity-50 transition"
      >
        {pending ? "جارٍ الحفظ..." : "تغيير كلمة المرور"}
      </button>
    </form>
  );
}
