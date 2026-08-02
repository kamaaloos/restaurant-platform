export type AuthUser = {
  id: string;
  email: string;
  role: string;
  restaurantId: string | null;
  branchId: string | null;
};

export type Branch = {
  id: string;
  name: string;
  restaurantId: string;
  active: boolean;
  walkInToken: string;
};

export type Restaurant = {
  id: string;
  name: string;
  slug?: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  currency?: string;
  active?: boolean;
};

export type RestaurantTable = {
  id: string;
  number: string;
  seats: number;
  status: string;
  qrToken: string | null;
  qrCode: string | null;
  qrTokenExpiresAt?: string | null;
  notes: string | null;
  branchId: string;
  active: boolean;
};

export type Device = {
  id: string;
  name: string;
  deviceType: string;
  status: string;
  token: string;
  branchId: string;
  lastSeen: string | null;
  appVersion: string | null;
  tokenExpiresAt: string | null;
  createdAt: string;
};

export type KitchenDashboard = {
  new: number;
  accepted: number;
  preparing: number;
  ready: number;
  open: number;
  averageWaitMinutes: number;
  averagePrepTimeMinutes: number | null;
  longestWaitingMinutes: number;
};

export type MenuCategory = {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
  restaurantId: string;
  menuItems?: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  active: boolean;
  categoryId: string;
  imageUrl: string | null;
};

export type StaffUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  restaurantId: string | null;
  branchId: string | null;
  active: boolean;
  createdAt: string;
  restaurant?: { id: string; name: string } | null;
  branch?: { id: string; name: string } | null;
};

export const DEVICE_TYPES = [
  "KITCHEN",
  "WAITER",
  "CASHIER",
  "CUSTOMER_DISPLAY",
  "MANAGER",
] as const;
