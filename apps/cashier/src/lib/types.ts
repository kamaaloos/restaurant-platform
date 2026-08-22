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
};

export type OrderItem = {
  id: string;
  quantity: number;
  price: number | string;
  notes?: string | null;
  seatNumber?: number | null;
  course?: string | null;
  menuItem?: { name: string } | null;
};

export type Payment = {
  id: string;
  orderId: string;
  amount: number | string;
  tipAmount?: number | string;
  refundedAmount?: number | string;
  method: string;
  /** CASH | TERMINAL | ONLINE | COUNTER */
  channel?: string;
  status: string;
  provider?: string | null;
  providerRef?: string | null;
  checkoutUrl?: string;
  clientSecret?: string;
  paidAt?: string | null;
  refundedAt?: string | null;
  currency?: string;
  receivedBy?: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

export type PaymentProviderConfig = {
  provider: "none" | "mock" | "stripe";
  onlineEnabled: boolean;
  terminalEnabled?: boolean;
  terminalLocationId?: string | null;
  publishableKey?: string | null;
};

export type Order = {
  id: string;
  status: string;
  mode?: "DINE_IN" | "WALK_IN" | string;
  queueNumber?: number | null;
  total: number | string;
  currency?: string;
  /** Receipt VAT/sales-tax percent (tax-inclusive prices). Defaults to 22. */
  taxRatePercent?: number | string;
  customerName?: string | null;
  table?: { number: string } | null;
  items: OrderItem[];
  payment?: Payment | null;
  payments?: Payment[];
  balanceDue?: number | string;
  createdAt: string;
};
