import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getApiBaseUrl, getWsBaseUrl } from "./api-url";

export { getApiBaseUrl, getWsBaseUrl };
export { createStaffSession } from "./staff-session";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortId(value: string | null | undefined) {
  if (!value) return "—";
  return value.length > 12 ? `${value.slice(0, 8)}…` : value;
}

/** Walk-in pickup code prefix: W0012 + 2-digit daily queue (guest 1 → W001201). */
export const WALK_IN_QUEUE_PREFIX = "W0012";

export function formatWalkInQueueCode(
  queueNumber: number | null | undefined,
): string | null {
  if (queueNumber == null || !Number.isFinite(queueNumber) || queueNumber < 1) {
    return null;
  }
  return `${WALK_IN_QUEUE_PREFIX}${String(Math.trunc(queueNumber)).padStart(2, "0")}`;
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
  /** Rotate the in-memory access JWT using the httpOnly refresh cookie. */
  refreshAccessToken?: () => Promise<string | null>;
  credentials?: RequestCredentials;
};

export function createHttpClient(options: CreateHttpClientOptions = {}) {
  const baseUrl = options.baseUrl ?? getApiBaseUrl();

  async function request<T>(
    path: string,
    init?: HttpRequestInit,
    retried = false,
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

    const { auth: _auth, ...fetchInit } = init ?? {};
    void _auth;

    const res = await fetch(`${baseUrl}${path}`, {
      ...fetchInit,
      headers,
      credentials: fetchInit.credentials ?? options.credentials ?? "include",
      cache: "no-store",
    }).catch(() => {
      throw new ApiError(
        0,
        `Cannot reach API at ${baseUrl}. Is the backend running?`,
      );
    });

    const canRefresh =
      res.status === 401 &&
      useAuth &&
      !retried &&
      !!options.refreshAccessToken &&
      !path.startsWith("/auth/refresh") &&
      !path.startsWith("/auth/login") &&
      !path.startsWith("/auth/logout");

    if (canRefresh) {
      const nextToken = await options.refreshAccessToken?.();
      if (nextToken) {
        return request<T>(path, init, true);
      }
    }

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
  }

  return request;
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

/** Short Admin QR codes (not UUID bearer tokens). */
export function looksLikePairingCode(value: string) {
  const trimmed = value.trim();
  return /^[A-Za-z0-9]{6,12}$/.test(trimmed) && !trimmed.includes("-");
}

export type DevicePairResult = {
  token: string;
  device: {
    id: string;
    name: string;
    deviceType: string;
    branchId: string;
    tokenExpiresAt: string | null;
  };
};

/** Exchange a one-time pairing code for the long-lived device token. */
export async function exchangeDevicePairingCode(
  code: string,
  baseUrl = getApiBaseUrl(),
): Promise<DevicePairResult> {
  const res = await fetch(`${baseUrl}/devices/pair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: code.trim().toUpperCase() }),
    cache: "no-store",
  }).catch(() => {
    throw new ApiError(
      0,
      `Cannot reach API at ${baseUrl}. Is the backend running?`,
    );
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      res.status,
      messageFromBody(body, `Pairing failed (${res.status})`),
    );
  }

  return res.json() as Promise<DevicePairResult>;
}

