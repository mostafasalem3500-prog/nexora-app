import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/admin/dashboard", label: "نظرة عامة", roles: ["ADMIN", "EDITOR", "SALES"] },
  { href: "/admin/requests", label: "طلبات المشاريع", roles: ["ADMIN", "SALES"] },
  { href: "/admin/users", label: "إدارة المستخدمين", roles: ["ADMIN"] },
  { href: "/admin/settings", label: "إعدادات الهوية", roles: ["ADMIN"] },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const role = (session.user as any).role as string;
  const visibleNav = NAV.filter((n) => n.roles.includes(role));

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)", color: "var(--ink)" }}>
      <div className="flex">
        <aside className="w-64 shrink-0 border-e border-white/8 min-h-screen p-5 hidden md:block">
          <div className="font-bold mb-8">لوحة التحكم</div>
          <nav className="space-y-1">
            {visibleNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block px-3 py-2.5 rounded-lg text-sm text-ink-muted hover:bg-white/5 hover:text-ink transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 pt-4 border-t border-white/8 text-xs text-ink-muted">
            <div className="mb-2 font-en" dir="ltr">
              {session.user.email}
            </div>
            <div className="mb-3">الدور: {role === "ADMIN" ? "مدير نظام" : role === "EDITOR" ? "محرر محتوى" : "مبيعات"}</div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button className="text-red-400 hover:underline">تسجيل الخروج</button>
            </form>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
