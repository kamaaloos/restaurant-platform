"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { clearSession, getAccessToken, getStoredUser } from "@/lib/session";
import type { AuthUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ADMIN_ROLES = new Set([
  "PLATFORM_ADMIN",
  "RESTAURANT_OWNER",
  "BRANCH_MANAGER",
]);

function navForRole(role: string) {
  const locationsLabel =
    role === "PLATFORM_ADMIN" ? "Restaurants" : "Branches";
  return [
    { href: "/", label: "Overview" },
    { href: "/restaurants", label: locationsLabel },
    { href: "/tables", label: "Tables" },
    { href: "/devices", label: "Devices" },
    { href: "/menu", label: "Menu" },
    { href: "/users", label: "Users" },
  ];
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState<AuthUser | null>(null);

  React.useEffect(() => {
    const token = getAccessToken();
    const stored = getStoredUser();
    if (!token || !stored) {
      router.replace("/login");
      return;
    }
    if (!ADMIN_ROLES.has(stored.role)) {
      clearSession();
      router.replace("/login");
      return;
    }
    setUser(stored);
    setReady(true);
  }, [router]);

  if (!ready || !user) {
    return (
      <div className="grid flex-1 place-items-center text-[var(--muted)]">
        Checking session…
      </div>
    );
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}

function AdminShell({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = navForRole(user.role);

  const restaurantsQuery = useQuery({
    queryKey: ["admin-restaurants"],
    queryFn: () => adminApi.listRestaurants(),
  });

  const restaurant =
    restaurantsQuery.data?.find((r) => r.id === user.restaurantId) ??
    (user.role !== "PLATFORM_ADMIN" ? restaurantsQuery.data?.[0] : undefined);

  function logout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <div className="relative flex flex-1 flex-col md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-[var(--line)] bg-[var(--surface)]/88 backdrop-blur-md md:border-b-0 md:border-r">
        <div className="flex items-center gap-3 px-5 py-6">
          {restaurant?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={restaurant.logoUrl}
              alt=""
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[var(--accent)]/30"
            />
          ) : null}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Ops console
            </p>
            <h1 className="mt-1 truncate font-[family-name:var(--font-display)] text-2xl tracking-wide">
              {restaurant?.name ?? "Admin"}
            </h1>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold whitespace-nowrap transition",
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden border-t border-[var(--line)] px-5 py-4 md:block">
          <p className="truncate text-sm font-medium">{user.email}</p>
          <p className="text-xs text-[var(--muted)]">{user.role}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={logout}
          >
            Sign out
          </Button>
        </div>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface)]/85 px-5 py-3 backdrop-blur-md md:hidden">
          <div className="flex min-w-0 items-center gap-2">
            {restaurant?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={restaurant.logoUrl}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[var(--accent)]/30"
              />
            ) : null}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {restaurant?.name ?? user.email}
              </p>
              <p className="text-xs text-[var(--muted)]">{user.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Sign out
          </Button>
        </header>
        <main className="relative z-10 flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
