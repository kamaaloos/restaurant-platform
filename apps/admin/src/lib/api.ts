import { ApiError, createHttpClient } from "@org/shared";
import { clearSession, getAccessToken, refreshAccessToken } from "./session";
import type {
  AuthUser,
  Branch,
  Device,
  KitchenDashboard,
  MenuCategory,
  MenuItem,
  ModifierGroup,
  ModifierOption,
  Restaurant,
  RestaurantTable,
  StaffUser,
} from "./types";

export { ApiError };

const request = createHttpClient({
  getAccessToken,
  refreshAccessToken,
  onUnauthorized: () => {
    clearSession();
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login")
    ) {
      window.location.href = "/login";
    }
  },
});

export const adminApi = {
  login: (email: string, password: string) =>
    request<{ access_token: string; user: AuthUser; expires_in: number }>(
      "/auth/login",
      {
        method: "POST",
        auth: false,
        body: JSON.stringify({ email, password }),
      },
    ),

  profile: () => request<AuthUser>("/profile"),

  listBranches: () => request<Branch[]>("/branches"),

  createBranch: (body: {
    name: string;
    restaurantId: string;
    address?: string;
    phone?: string;
    email?: string;
  }) =>
    request<Branch>("/branches", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  rotateWalkInToken: (id: string) =>
    request<Branch>(`/branches/${id}/rotate-walk-in-token`, {
      method: "POST",
      body: "{}",
    }),

  listRestaurants: () => request<Restaurant[]>("/restaurants"),

  createRestaurant: (body: {
    name: string;
    slug?: string;
    email: string;
    phone: string;
    address?: string;
    logoUrl?: string | null;
    brandAccent?: string | null;
    brandButton?: string | null;
    brandPaper?: string | null;
    brandBackgroundUrl?: string | null;
    brandBackgroundUrls?: string[] | null;
    qrFrameColor?: string | null;
    qrModuleColor?: string | null;
  }) =>
    request<Restaurant>("/restaurants", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateRestaurant: (
    id: string,
    body: {
      name?: string;
      slug?: string;
      email?: string;
      phone?: string;
      address?: string;
      active?: boolean;
      logoUrl?: string | null;
      brandAccent?: string | null;
      brandButton?: string | null;
      brandPaper?: string | null;
      brandBackgroundUrl?: string | null;
      brandBackgroundUrls?: string[] | null;
      qrFrameColor?: string | null;
      qrModuleColor?: string | null;
      menuImageUrls?: string[] | null;
    },
  ) =>
    request<Restaurant>(`/restaurants/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteRestaurant: (id: string) =>
    request<Restaurant>(`/restaurants/${id}`, { method: "DELETE" }),

  listTables: (branchId?: string) =>
    request<RestaurantTable[]>(
      branchId ? `/tables?branchId=${branchId}` : "/tables",
    ),

  createTable: (body: {
    number: string;
    seats: number;
    notes?: string;
    branchId?: string;
  }) =>
    request<RestaurantTable>("/tables", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateTable: (
    id: string,
    body: { number?: string; seats?: number; notes?: string },
  ) =>
    request<RestaurantTable>(`/tables/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteTable: (id: string) =>
    request<RestaurantTable>(`/tables/${id}`, { method: "DELETE" }),

  rotateTableQr: (id: string) =>
    request<RestaurantTable>(`/tables/${id}/rotate-qr`, { method: "POST" }),

  listDevices: (branchId?: string) =>
    request<Device[]>(
      branchId ? `/devices?branchId=${branchId}` : "/devices",
    ),

  createDevice: (body: {
    name: string;
    deviceType: string;
    branchId?: string;
  }) =>
    request<Device>("/devices", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  rotateDeviceToken: (id: string) =>
    request<Device>(`/devices/${id}/rotate-token`, { method: "POST" }),

  issueDevicePairingCode: (id: string) =>
    request<Device>(`/devices/${id}/pairing-code`, { method: "POST" }),

  revokeDevice: (id: string) =>
    request<Device>(`/devices/${id}/revoke`, { method: "POST" }),

  listCategories: (restaurantId?: string) =>
    request<MenuCategory[]>(
      restaurantId
        ? `/menu/categories?restaurantId=${restaurantId}`
        : "/menu/categories",
    ),

  createCategory: (body: {
    name: string;
    displayOrder?: number;
    restaurantId?: string;
  }) =>
    request<MenuCategory>("/menu/categories", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateCategory: (
    id: string,
    body: { name?: string; displayOrder?: number; active?: boolean },
  ) =>
    request<MenuCategory>(`/menu/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteCategory: (id: string) =>
    request<MenuCategory>(`/menu/categories/${id}`, { method: "DELETE" }),

  listItems: (opts?: { categoryId?: string; restaurantId?: string }) => {
    const params = new URLSearchParams();
    if (opts?.categoryId) params.set("categoryId", opts.categoryId);
    if (opts?.restaurantId) params.set("restaurantId", opts.restaurantId);
    const qs = params.toString();
    return request<MenuItem[]>(`/menu/items${qs ? `?${qs}` : ""}`);
  },

  createItem: (body: {
    categoryId: string;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    restaurantId?: string;
    active?: boolean;
  }) =>
    request<MenuItem>("/menu/items", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateItem: (
    id: string,
    body: {
      categoryId?: string;
      name?: string;
      price?: number;
      description?: string | null;
      imageUrl?: string | null;
      active?: boolean;
      available?: boolean;
    },
  ) =>
    request<MenuItem>(`/menu/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  setItemAvailability: (id: string, available: boolean) =>
    request<MenuItem>(`/menu/items/${id}/availability`, {
      method: "PATCH",
      body: JSON.stringify({ available }),
    }),

  deleteItem: (id: string) =>
    request<MenuItem>(`/menu/items/${id}`, { method: "DELETE" }),

  listModifiers: (menuItemId: string) =>
    request<ModifierGroup[]>(`/menu/items/${menuItemId}/modifiers`),

  createModifierGroup: (body: {
    menuItemId: string;
    name: string;
    minSelect?: number;
    maxSelect?: number;
    required?: boolean;
    options: Array<{ name: string; priceDelta?: number }>;
  }) =>
    request<ModifierGroup>("/menu/modifiers/groups", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  deleteModifierGroup: (id: string) =>
    request<unknown>(`/menu/modifiers/groups/${id}`, { method: "DELETE" }),

  createModifierOption: (body: {
    groupId: string;
    name: string;
    priceDelta?: number;
  }) =>
    request<ModifierOption>("/menu/modifiers/options", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  deleteModifierOption: (id: string) =>
    request<unknown>(`/menu/modifiers/options/${id}`, { method: "DELETE" }),

  listUsers: (opts?: { restaurantId?: string; branchId?: string }) => {
    const params = new URLSearchParams();
    if (opts?.restaurantId) params.set("restaurantId", opts.restaurantId);
    if (opts?.branchId) params.set("branchId", opts.branchId);
    const qs = params.toString();
    return request<StaffUser[]>(`/users${qs ? `?${qs}` : ""}`);
  },

  createUser: (body: {
    email: string;
    password: string;
    role: string;
    firstName?: string;
    lastName?: string;
    restaurantId?: string;
    branchId?: string;
  }) =>
    request<StaffUser>("/users", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateUser: (
    id: string,
    body: {
      email?: string;
      password?: string;
      role?: string;
      firstName?: string;
      lastName?: string;
      restaurantId?: string;
      branchId?: string | null;
      active?: boolean;
    },
  ) =>
    request<StaffUser>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteUser: (id: string) =>
    request<StaffUser>(`/users/${id}`, { method: "DELETE" }),

  kitchenDashboard: (branchId?: string) =>
    request<KitchenDashboard>(
      branchId
        ? `/orders/kitchen/dashboard?branchId=${branchId}`
        : "/orders/kitchen/dashboard",
    ),

  ledgerEntries: (params?: {
    restaurantId?: string;
    branchId?: string;
    from?: string;
    to?: string;
    skip?: number;
    take?: number;
  }) => {
    const q = new URLSearchParams();
    if (params?.restaurantId) q.set("restaurantId", params.restaurantId);
    if (params?.branchId) q.set("branchId", params.branchId);
    if (params?.from) q.set("from", params.from);
    if (params?.to) q.set("to", params.to);
    if (params?.skip != null) q.set("skip", String(params.skip));
    if (params?.take != null) q.set("take", String(params.take));
    const qs = q.toString();
    return request<{
      entries: Array<{
        id: string;
        date: string;
        category: string;
        description: string;
        debit: number;
        credit: number;
        paymentId: string | null;
        branchId: string | null;
        payment?: {
          method: string;
          channel: string;
          status: string;
        } | null;
      }>;
      total: number;
    }>(`/ledger${qs ? `?${qs}` : ""}`);
  },

  ledgerSummary: (params?: {
    restaurantId?: string;
    branchId?: string;
    from?: string;
    to?: string;
  }) => {
    const q = new URLSearchParams();
    if (params?.restaurantId) q.set("restaurantId", params.restaurantId);
    if (params?.branchId) q.set("branchId", params.branchId);
    if (params?.from) q.set("from", params.from);
    if (params?.to) q.set("to", params.to);
    const qs = q.toString();
    return request<{
      categories: Array<{
        category: string;
        totalDebit: number;
        totalCredit: number;
      }>;
      totals: {
        revenue: number;
        tips: number;
        refunds: number;
        netSales: number;
        taxRatePercent: number;
        taxCollected: number;
        netExTax: number;
        currency: string;
      };
      salesByChannel: Array<{
        channel: string;
        amount: number;
        tipAmount: number;
        count: number;
      }>;
    }>(`/ledger/summary${qs ? `?${qs}` : ""}`);
  },

  uploadImage: async (file: File, opts?: { restaurantId?: string }) => {
    const send = async (token: string | null) => {
      const body = new FormData();
      body.append("file", file);
      if (opts?.restaurantId) body.append("restaurantId", opts.restaurantId);
      return fetch("/api/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body,
      }).catch(() => {
        throw new ApiError(0, "Cannot reach upload endpoint");
      });
    };

    let token = getAccessToken();
    let res = await send(token);
    if (res.status === 401) {
      token = await refreshAccessToken();
      if (token) res = await send(token);
    }
    if (res.status === 401) {
      clearSession();
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/login")
      ) {
        window.location.href = "/login";
      }
    }
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const message =
        typeof (errBody as { message?: unknown }).message === "string"
          ? (errBody as { message: string }).message
          : `Upload failed (${res.status})`;
      throw new ApiError(res.status, message);
    }
    return res.json() as Promise<{
      url: string;
      path: string;
      filename: string;
    }>;
  },
};
