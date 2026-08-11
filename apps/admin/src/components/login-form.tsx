"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UtensilsCrossed } from "lucide-react";
import { adminApi } from "@/lib/api";
import { clearSession, getAccessToken, setSession } from "@/lib/session";
import { Button } from "@/components/ui/button";

const ADMIN_ROLES = new Set([
  "PLATFORM_ADMIN",
  "RESTAURANT_OWNER",
  "BRANCH_MANAGER",
]);

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@restaurant.local");
  const [password, setPassword] = React.useState("admin123");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    if (getAccessToken()) router.replace("/");
  }, [router]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await adminApi.login(email.trim(), password);
      if (!ADMIN_ROLES.has(result.user.role)) {
        clearSession();
        setError(
          result.user.role === "CASHIER"
            ? "Cashiers use the Cashier till at http://localhost:3005 — not the Admin console."
            : `Role ${result.user.role} cannot access the Admin console.`,
        );
        return;
      }
      setSession(result.access_token, result.user);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-5">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[var(--ink)]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@restaurant.local"
          className="h-12 w-full rounded-xl border border-[var(--line)] bg-white px-3.5 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
          required
          autoComplete="username"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[var(--ink)]">Password</span>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-[var(--line)] bg-white px-3.5 pr-11 text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-[var(--muted)] transition hover:text-[var(--ink)]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </label>

      {error ? (
        <p className="rounded-xl bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-xl text-base"
        disabled={pending}
      >
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

export function BrandMark() {
  return (
    <div
      className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]"
      aria-hidden
    >
      <UtensilsCrossed className="h-5 w-5" strokeWidth={2.25} />
    </div>
  );
}
