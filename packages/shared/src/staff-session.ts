import { getApiBaseUrl } from "./api-url";

type StaffSessionOptions = {
  userStorageKey: string;
  legacyTokenKey: string;
  legacyUserKey: string;
};

type RefreshResponse<TUser> = {
  access_token: string;
  user: TUser;
  expires_in?: number;
};

export function createStaffSession<TUser>(opts: StaffSessionOptions) {
  let accessToken: string | null = null;
  let refreshInFlight: Promise<string | null> | null = null;
  let refreshTimer: ReturnType<typeof setTimeout> | undefined;
  const listeners = new Set<(token: string | null) => void>();

  function inBrowser() {
    return typeof window !== "undefined";
  }

  function notify() {
    for (const listener of listeners) listener(accessToken);
  }

  function stripLegacyStorage() {
    if (!inBrowser()) return;
    localStorage.removeItem(opts.legacyTokenKey);
    localStorage.removeItem(opts.legacyUserKey);
  }

  function getAccessToken(): string | null {
    return accessToken;
  }

  function getStoredUser(): TUser | null {
    if (!inBrowser()) return null;
    const raw = sessionStorage.getItem(opts.userStorageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TUser;
    } catch {
      return null;
    }
  }

  function setSession(token: string, user: TUser) {
    accessToken = token;
    if (inBrowser()) {
      sessionStorage.setItem(opts.userStorageKey, JSON.stringify(user));
      stripLegacyStorage();
    }
    scheduleProactiveRefresh(token);
    notify();
  }

  function clearSession() {
    accessToken = null;
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = undefined;
    }
    if (inBrowser()) {
      sessionStorage.removeItem(opts.userStorageKey);
      stripLegacyStorage();
    }
    notify();
  }

  async function refreshAccessToken(): Promise<string | null> {
    if (!inBrowser()) return null;
    if (!refreshInFlight) {
      refreshInFlight = doRefresh().finally(() => {
        refreshInFlight = null;
      });
    }
    return refreshInFlight;
  }

  async function doRefresh(): Promise<string | null> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: "{}",
        cache: "no-store",
      });
      if (!res.ok) {
        clearSession();
        return null;
      }
      const data = (await res.json()) as RefreshResponse<TUser>;
      setSession(data.access_token, data.user);
      return data.access_token;
    } catch {
      clearSession();
      return null;
    }
  }

  async function restoreSession(): Promise<boolean> {
    if (!inBrowser()) return false;
    stripLegacyStorage();
    if (accessToken && getStoredUser()) return true;
    const token = await refreshAccessToken();
    return Boolean(token && getStoredUser());
  }

  async function logoutSession(): Promise<void> {
    if (inBrowser()) {
      try {
        await fetch(`${getApiBaseUrl()}/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: "{}",
          cache: "no-store",
        });
      } catch {
        /* still clear locally */
      }
    }
    clearSession();
  }

  function subscribeAccessToken(listener: (token: string | null) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function scheduleProactiveRefresh(token: string) {
    if (!inBrowser()) return;
    if (refreshTimer) clearTimeout(refreshTimer);
    const exp = jwtExpSeconds(token);
    if (!exp) return;
    const waitMs = Math.max(5_000, exp * 1000 - Date.now() - 60_000);
    refreshTimer = setTimeout(() => {
      void refreshAccessToken();
    }, waitMs);
  }

  return {
    getAccessToken,
    getStoredUser,
    setSession,
    clearSession,
    refreshAccessToken,
    restoreSession,
    logoutSession,
    subscribeAccessToken,
  };
}

function jwtExpSeconds(token: string): number | null {
  const part = token.split(".")[1];
  if (!part) return null;
  try {
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(padded)) as { exp?: unknown };
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}
