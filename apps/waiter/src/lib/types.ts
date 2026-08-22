export type WaiterOrderStatus =
  | "NEW"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "SERVED";

export type WaiterDevice = {
  id: string;
  name: string;
  deviceType: string;
  status: string;
  branchId: string;
  restaurantId: string;
  branchName: string;
  lastSeen: string | null;
  appVersion: string | null;
};

export type WaiterOrder = {
  id: string;
  status: WaiterOrderStatus | string;
  mode?: "DINE_IN" | "WALK_IN" | string;
  queueNumber?: number | null;
  customerName: string | null;
  isRush?: boolean;
  isVip?: boolean;
  createdAt: string;
  updatedAt: string;
  currency: string;
  total: string;
  table: { number: string } | null;
  items: Array<{
    id: string;
    quantity: number;
    notes: string | null;
    seatNumber?: number | null;
    course?: string | null;
    firedAt?: string | null;
    menuItem: { name: string };
    modifiers?: Array<{ optionName: string }>;
  }>;
};

export type ServiceRequest = {
  id: string;
  type: "CALL_WAITER" | "REQUEST_BILL" | string;
  status: "PENDING" | "ACKNOWLEDGED" | "COMPLETED" | string;
  note: string | null;
  createdAt: string;
  table: { number: string };
  orderId: string | null;
};

export const ORDER_COLUMNS: Array<{
  key: string;
  titleKey: "colKitchen" | "colReady" | "colServed";
  hintKey: "colKitchenHint" | "colReadyHint" | "colServedHint";
  statuses: WaiterOrderStatus[];
}> = [
  {
    key: "kitchen",
    titleKey: "colKitchen",
    hintKey: "colKitchenHint",
    statuses: ["NEW", "ACCEPTED", "PREPARING"],
  },
  {
    key: "ready",
    titleKey: "colReady",
    hintKey: "colReadyHint",
    statuses: ["READY"],
  },
  {
    key: "served",
    titleKey: "colServed",
    hintKey: "colServedHint",
    statuses: ["SERVED"],
  },
];
