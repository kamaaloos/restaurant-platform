"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getStoredUser, logoutSession, restoreSession } from "@/lib/session";
import type { AuthUser } from "@/lib/types";
import { Button } from "@/components/ui/button";

const CASHIER_ROLES = new Set([
  "CASHIER",
  "BRANCH_MANAGER",
  "RESTAURANT_OWNER",
  "PLATFORM_ADMIN",
]);

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState<AuthUser | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const token = getAccessToken();
      let stored = getStoredUser();
      if (!token || !stored) {
        const ok = await restoreSession();
        stored = getStoredUser();
        if (!ok || !stored) {
          if (!cancelled) router.replace("/login");
          return;
        }
      }
      if (!CASHIER_ROLES.has(stored.role)) {
        await logoutSession();
        if (!cancelled) router.replace("/login");
        return;
      }
      if (!cancelled) {
        setUser(stored);
        setReady(true);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center text-[var(--muted)]">
        Checking session…
      </div>
    );
  }

  return <CashierShell user={user}>{children}</CashierShell>;
}

function CashierShell({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await logoutSession();
    router.replace("/login");
  }

  return (
    <div className="relative z-10 min-h-screen">
      <header className="cashier-shell-header no-print border-b border-[var(--line)] bg-[var(--surface)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Till
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
              Cashier
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="truncate text-sm font-medium">{user.email}</p>
              <p className="text-xs text-[var(--muted)]">{user.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl p-5 md:p-8">
        {children}
      </main>
    </div>
  );
}
