import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

async function authenticate(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect("/admin/login?error=1");
    }
    throw err;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg-deep)", color: "var(--ink)" }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-bg-deep-2 p-8">
        <div className="flex items-center gap-2 font-bold text-lg mb-8 justify-center">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="url(#g1)" />
            <path d="M10 28V12l14 16V12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="40" y2="40">
                <stop stopColor="#2A5CFF" />
                <stop offset="1" stopColor="#16C9B8" />
              </linearGradient>
            </defs>
          </svg>
          <span>لوحة تحكم نكسورا تك</span>
        </div>
        <form action={authenticate} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              required
              dir="ltr"
              className="w-full rounded-md bg-bg-deep border border-white/12 px-4 py-2.5 focus:outline-none focus:border-brand-teal transition"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5 text-ink-muted">كلمة المرور</label>
            <input
              name="password"
              type="password"
              required
              dir="ltr"
              className="w-full rounded-md bg-bg-deep border border-white/12 px-4 py-2.5 focus:outline-none focus:border-brand-teal transition"
            />
          </div>
          {error && <p className="text-red-400 text-sm">بيانات الدخول غير صحيحة.</p>}
          <button
            type="submit"
            className="w-full rounded-md px-6 py-3 font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blue-dim hover:-translate-y-0.5 transition"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </main>
  );
}
