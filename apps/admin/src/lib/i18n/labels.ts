import type { MessageKey } from "./messages";

export const ROLE_MESSAGE: Record<string, MessageKey> = {
  PLATFORM_ADMIN: "rolePlatformAdmin",
  RESTAURANT_OWNER: "roleRestaurantOwner",
  BRANCH_MANAGER: "roleBranchManager",
  WAITER: "roleWaiter",
  CHEF: "roleChef",
  CASHIER: "roleCashier",
};

export const TABLE_STATUS_MESSAGE: Record<string, MessageKey> = {
  AVAILABLE: "statusAvailable",
  OCCUPIED: "statusOccupied",
  RESERVED: "statusReserved",
};

export const DEVICE_TYPE_MESSAGE: Record<string, MessageKey> = {
  KITCHEN: "deviceTypeKitchen",
  WAITER: "deviceTypeWaiter",
  CASHIER: "deviceTypeCashier",
  CUSTOMER_DISPLAY: "deviceTypeCustomerDisplay",
  MANAGER: "deviceTypeManager",
};
