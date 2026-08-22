"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  UtensilsCrossed,
  MonitorSmartphone,
  BookOpen,
  Users,
  LogOut,
  BookMarked,
} from "lucide-react";
import { useSelectedRestaurant } from "@/hooks/use-selected-restaurant";
import {
  getAccessToken,
  getStoredUser,
  logoutSession,
  restoreSession,
  setSession,
} from "@/lib/session";
import type { AuthUser, Restaurant } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  LanguageSwitcher,
  useLocale,
} from "@/lib/i18n/locale-provider";
import { ROLE_MESSAGE } from "@/lib/i18n/labels";
import type { MessageKey } from "@/lib/i18n/messages";

const ADMIN_ROLES = new Set([
  "PLATFORM_ADMIN",
  "RESTAURANT_OWNER",
  "BRANCH_MANAGER",
]);

function navForRole(role: string, t: (key: MessageKey) => string) {
  const locationsLabel =
    role === "PLATFORM_ADMIN" ? t("navRestaurants") : t("navBranches");
  const items = [
    { href: "/", label: t("navOverview"), icon: LayoutDashboard },
    { href: "/restaurants", label: locationsLabel, icon: Building2 },
    { href: "/tables", label: t("navTables"), icon: UtensilsCrossed },
    { href: "/devices", label: t("navDevices"), icon: MonitorSmartphone },
    { href: "/menu", label: t("navMenu"), icon: BookOpen },
    { href: "/users", label: t("navUsers"), icon: Users },
  ];
  if (
    role === "PLATFORM_ADMIN" ||
    role === "RESTAURANT_OWNER" ||
    role === "ACCOUNTANT"
  ) {
    items.push({ href: "/ledger", label: t("navLedger"), icon: BookMarked });
  }
  return items;
}

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
      if (!ADMIN_ROLES.has(stored.role)) {
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
    return <CheckingSession />;
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}

function CheckingSession() {
  const { t } = useLocale();
  return (
    <div className="grid flex-1 place-items-center text-[var(--muted)]">
      {t("checkingSession")}
    </div>
  );
}

function restaurantFromUser(user: AuthUser): Restaurant | undefined {
  if (!user.restaurant) return undefined;
  return {
    id: user.restaurant.id,
    name: user.restaurant.name,
    slug: user.restaurant.slug ?? undefined,
    logoUrl: user.restaurant.logoUrl,
    brandAccent: user.restaurant.brandAccent,
    brandButton: user.restaurant.brandButton,
    brandPaper: user.restaurant.brandPaper,
  };
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
  const { t } = useLocale();
  const nav = navForRole(user.role, t);
  const roleLabel = ROLE_MESSAGE[user.role]
    ? t(ROLE_MESSAGE[user.role])
    : user.role;
  const { restaurants, restaurantId } = useSelectedRestaurant();

  const restaurant =
    restaurants.find((r) => r.id === restaurantId) ??
    restaurants.find((r) => r.id === user.restaurantId) ??
    restaurants[0] ??
    restaurantFromUser(user);

  React.useEffect(() => {
    if (!restaurant?.logoUrl || user.restaurant?.logoUrl) return;
    const token = getAccessToken();
    if (!token) return;
    setSession(token, {
      ...user,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
        logoUrl: restaurant.logoUrl,
        brandAccent: restaurant.brandAccent,
        brandButton: restaurant.brandButton,
        brandPaper: restaurant.brandPaper,
      },
    });
  }, [
    restaurant?.id,
    restaurant?.logoUrl,
    restaurant?.name,
    user,
  ]);

  async function logout() {
    await logoutSession();
    router.replace("/login");
  }

  return (
    <div className="relative flex flex-1 flex-col md:grid md:grid-cols-[272px_1fr]">
      <aside className="flex flex-col border-b border-[var(--line)] bg-[#f7efc8] md:min-h-0 md:border-b-0 md:border-r">
        <div className="flex flex-col items-start gap-3 bg-[#1b2a4a] px-5 py-6 text-white">
          {restaurant?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={restaurant.logoUrl}
              alt=""
              className="h-16 w-16 rounded-2xl bg-white object-cover shadow-sm ring-1 ring-white/25"
            />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/12 text-xl font-semibold text-white">
              {(restaurant?.name ?? "A").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 w-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
              {t("opsConsole")}
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-display)] text-[1.35rem] leading-snug tracking-tight text-white">
              {restaurant?.name ?? t("adminFallback")}
            </h1>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 py-3 md:flex-1 md:flex-col md:overflow-visible md:px-3">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition",
                  active
                    ? "bg-[#1b2a4a] text-white shadow-sm"
                    : "text-[#3d3a2a] hover:bg-[#efe6a8] hover:text-[#1b2a4a]",
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-[#e4d98a] px-4 py-4 md:block">
          <LanguageSwitcher className="mb-3 w-full" />
          <p className="truncate text-sm font-medium text-[#1b2a4a]">
            {user.email}
          </p>
          <p className="mt-0.5 text-xs text-[#5c5840]">{roleLabel}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a4a]/20 bg-white text-sm font-medium text-[#1b2a4a] transition hover:bg-[#efe6a8]"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t("signOut")}
          </button>
        </div>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur-md md:hidden">
          <div className="flex min-w-0 items-center gap-3">
            {restaurant?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={restaurant.logoUrl}
                alt=""
                className="h-10 w-10 shrink-0 rounded-xl bg-white object-cover ring-1 ring-[var(--line)]"
              />
            ) : null}
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight text-[var(--ink)]">
                {restaurant?.name ?? user.email}
              </p>
              <p className="text-xs text-[var(--muted)]">{roleLabel}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher className="w-auto [&_select]:min-w-[7.5rem]" />
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white px-3 text-sm font-medium"
            >
              <LogOut className="h-3.5 w-3.5" />
              {t("signOut")}
            </button>
          </div>
        </header>
        <main className="relative z-10 flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
