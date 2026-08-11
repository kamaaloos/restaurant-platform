import { ApiError, createHttpClient } from "@org/shared";
import { clearSession, getAccessToken } from "./session";
import type {
  AuthUser,
  Branch,
  Device,
  KitchenDashboard,
  MenuCategory,
  MenuItem,
  Restaurant,
  RestaurantTable,
  StaffUser,
} from "./types";

export { ApiError };

const request = createHttpClient({
  getAccessToken,
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
    request<{ access_token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password }),
    }),

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
    email: string;
    phone: string;
    address?: string;
  }) =>
    request<Restaurant>("/restaurants", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateRestaurant: (
    id: string,
    body: {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      active?: boolean;
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
};
