import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortId(value: string | null | undefined) {
  if (!value) return "—";
  return value.length > 12 ? `${value.slice(0, 8)}…` : value;
}

export function formatMoney(
  amount: number | string,
  currency = "USD",
  locale = "en-US",
) {
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";
}

export function getWsBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:3000";
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

function messageFromBody(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const message = (body as { message?: unknown }).message;
  if (Array.isArray(message)) return message.join(", ");
  if (typeof message === "string" && message.length > 0) return message;
  return fallback;
}

export type HttpRequestInit = RequestInit & {
  /** When false, skip Authorization injection from getAccessToken. Default true if getter provided. */
  auth?: boolean;
};

export type CreateHttpClientOptions = {
  baseUrl?: string;
  getAccessToken?: () => string | null;
  getExtraHeaders?: () => Record<string, string>;
  onUnauthorized?: () => void;
};

export function createHttpClient(options: CreateHttpClientOptions = {}) {
  const baseUrl = options.baseUrl ?? getApiBaseUrl();

  return async function request<T>(
    path: string,
    init?: HttpRequestInit,
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.getExtraHeaders?.() ?? {}),
      ...(init?.headers as Record<string, string> | undefined),
    };

    const useAuth = init?.auth !== false && !!options.getAccessToken;
    if (useAuth) {
      const token = options.getAccessToken?.();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    }).catch(() => {
      throw new ApiError(
        0,
        `Cannot reach API at ${baseUrl}. Is the backend running?`,
      );
    });

    if (res.status === 401 && useAuth) {
      options.onUnauthorized?.();
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(
        res.status,
        messageFromBody(body, `Request failed (${res.status})`),
      );
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  };
}

/** Device-authenticated HTTP helper (`x-device-token`). */
export function createDeviceHttpClient(options: {
  baseUrl?: string;
  appVersion?: string;
} = {}) {
  const baseUrl = options.baseUrl ?? getApiBaseUrl();

  async function request<T>(
    path: string,
    deviceToken: string,
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "x-device-token": deviceToken,
        ...(init?.headers as Record<string, string> | undefined),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(
        res.status,
        messageFromBody(body, `Request failed (${res.status})`),
      );
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  }

  async function heartbeat(deviceToken: string, appVersion?: string) {
    const res = await fetch(`${baseUrl}/devices/heartbeat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-token": deviceToken,
      },
      body: JSON.stringify({
        appVersion: appVersion ?? options.appVersion ?? "display/0.1.0",
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(
        res.status,
        messageFromBody(body, `Heartbeat failed (${res.status})`),
      );
    }

    return res.json();
  }

  return { request, heartbeat };
}

export function createDeviceTokenStorage(storageKey: string) {
  return {
    get(): string | null {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(storageKey);
    },
    set(token: string) {
      localStorage.setItem(storageKey, token.trim());
    },
    clear() {
      localStorage.removeItem(storageKey);
    },
  };
}
