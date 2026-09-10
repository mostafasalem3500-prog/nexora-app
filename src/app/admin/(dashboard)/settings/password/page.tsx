import PasswordForm from "./PasswordForm";

export default function ChangePasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">تغيير كلمة المرور</h1>
      <p className="text-ink-muted text-sm mb-6">يُنصح بتغيير كلمة المرور الافتراضية فور أول دخول.</p>
      <PasswordForm />
    </div>
  );
}
