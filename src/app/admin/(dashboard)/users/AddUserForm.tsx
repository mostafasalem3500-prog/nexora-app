"use client";

import { useActionState } from "react";
import { createUser } from "./actions";

const initialState = {} as { error?: string; success?: boolean };

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "مدير نظام",
  EDITOR: "محرر محتوى",
  SALES: "مبيعات",
};

export default function AddUserForm() {
  const [state, formAction, pending] = useActionState(createUser, initialState);
  const inputClass = "w-full rounded-md bg-bg-deep border border-white/12 px-4 py-2.5 focus:outline-none focus:border-brand-teal transition";

  return (
    <form
      action={formAction}
      key={state?.success ? "reset" : "form"}
      className="rounded-xl border border-white/8 bg-bg-deep-2 p-5 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-end"
    >
      <div>
        <label className="block text-sm mb-1.5 text-ink-muted">البريد الإلكتروني</label>
        <input name="email" type="email" required className={inputClass} dir="ltr" />
      </div>
      <div>
        <label className="block text-sm mb-1.5 text-ink-muted">كلمة المرور</label>
        <input name="password" type="password" required minLength={8} className={inputClass} dir="ltr" />
      </div>
      <div>
        <label className="block text-sm mb-1.5 text-ink-muted">الدور</label>
        <select name="role" defaultValue="EDITOR" className={inputClass}>
          {Object.entries(ROLE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md px-6 py-2.5 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim disabled:opacity-50 transition h-[46px]"
      >
        {pending ? "جارٍ الإضافة..." : "إضافة مستخدم"}
      </button>

      {state?.error && <p className="text-red-400 text-sm md:col-span-4">{state.error}</p>}
      {state?.success && <p className="text-brand-teal text-sm md:col-span-4">تمت إضافة المستخدم بنجاح.</p>}
    </form>
  );
}
