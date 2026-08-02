import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
        Restaurant platform
      </p>
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-5xl tracking-tight">
        Admin
      </h1>
      <p className="mb-8 text-[var(--muted)]">
        Sign in to manage tables, devices, and the menu.
      </p>
      <LoginForm />
    </main>
  );
}
