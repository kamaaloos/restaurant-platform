"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[var(--muted)]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 outline-none ring-[var(--accent)] focus:ring-2"
          required
          autoComplete="username"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[var(--muted)]">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 outline-none ring-[var(--accent)] focus:ring-2"
          required
          autoComplete="current-password"
        />
      </label>

      {error ? (
        <p className="rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
