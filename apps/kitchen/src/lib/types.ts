export type KitchenStatus = "NEW" | "ACCEPTED" | "PREPARING" | "READY";

export type KitchenDevice = {
  id: string;
  name: string;
  deviceType: "KITCHEN" | "MANAGER" | string;
  status: "ONLINE" | "OFFLINE" | string;
  branchId: string;
  restaurantId: string;
  branchName: string;
  lastSeen: string | null;
  appVersion: string | null;
};

export type KitchenTicket = {
  id: string;
  status: KitchenStatus | string;
  mode?: "DINE_IN" | "WALK_IN" | string;
  queueNumber?: number | null;
  customerName: string | null;
  isRush?: boolean;
  isVip?: boolean;
  createdAt: string;
  updatedAt: string;
  ageSeconds: number;
  ageMinutes: number;
  table: { number: string } | null;
  items: Array<{
    id: string;
    quantity: number;
    notes: string | null;
    seatNumber?: number | null;
    course?: string | null;
    firedAt?: string | null;
    menuItem: { name: string };
    modifiers?: Array<{
      groupName: string;
      optionName: string;
    }>;
  }>;
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
  prepP95Seconds?: number | null;
  paymentSettleP95Seconds?: number | null;
  averagePaymentSettleSeconds?: number | null;
  prepSlo?: "ok" | "breach" | "insufficient_data";
  paymentSlo?: "ok" | "breach" | "insufficient_data";
  sloPrepThresholdSeconds?: number;
  sloPaymentThresholdSeconds?: number;
};

/** Next kitchen status after advancing; labels come from i18n. */
export const NEXT_ACTIONS: Partial<
  Record<KitchenStatus, { status: KitchenStatus; labelKey: "actionAccept" | "actionStart" | "actionReady" }>
> = {
  NEW: { status: "ACCEPTED", labelKey: "actionAccept" },
  ACCEPTED: { status: "PREPARING", labelKey: "actionStart" },
  PREPARING: { status: "READY", labelKey: "actionReady" },
};

export const BOARD_COLUMNS: Array<{
  status: KitchenStatus;
  titleKey: "colNew" | "colAccepted" | "colPreparing" | "colReady";
  hintKey: "colNewHint" | "colAcceptedHint" | "colPreparingHint" | "colReadyHint";
}> = [
  { status: "NEW", titleKey: "colNew", hintKey: "colNewHint" },
  { status: "ACCEPTED", titleKey: "colAccepted", hintKey: "colAcceptedHint" },
  { status: "PREPARING", titleKey: "colPreparing", hintKey: "colPreparingHint" },
  { status: "READY", titleKey: "colReady", hintKey: "colReadyHint" },
];
