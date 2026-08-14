export type ModifierOption = {
  id: string;
  name: string;
  priceDelta: string;
  active: boolean;
};

export type ModifierGroup = {
  id: string;
  name: string;
  minSelect: number;
  maxSelect: number;
  required: boolean;
  options: ModifierOption[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  modifierGroups: ModifierGroup[];
};

export type MenuCategory = {
  id: string;
  name: string;
  displayOrder: number;
  menuItems: MenuItem[];
};

export type CustomerMenu = {
  restaurant: {
    id: string;
    name: string;
    logoUrl: string | null;
    currency: string;
    brandAccent?: string | null;
    brandButton?: string | null;
    brandPaper?: string | null;
  };
  branch: { id: string; name: string };
  table: {
    id: string;
    number: string;
    seats: number;
    status: string;
    qrToken: string | null;
  } | null;
  categories: MenuCategory[];
  capabilities: {
    callWaiter: boolean;
    requestBill: boolean;
    liveTracking: boolean;
  };
  mode?: "DINE_IN" | "WALK_IN";
};

export type CustomerOrder = {
  id: string;
  status: string;
  mode?: "DINE_IN" | "WALK_IN";
  queueNumber?: number | null;
  total: string;
  currency: string;
  customerName: string | null;
  createdAt: string;
  payment?: {
    id: string;
    status: string;
    method: string;
    amount: string;
  } | null;
  items: Array<{
    id: string;
    quantity: number;
    price: string;
    notes: string | null;
    menuItem: { name: string };
    modifiers: Array<{
      groupName: string;
      optionName: string;
      priceDelta: string;
    }>;
  }>;
  tracking?: {
    status: string;
    steps: string[];
  };
};

export type WalkInBranch = {
  walkInToken: string;
  name: string;
  restaurant: { id: string; name: string };
};

export type PickupBoardEntry = {
  orderId: string;
  queueNumber: number;
  status: string;
  customerName: string | null;
  updatedAt: string;
};

export type PickupBoard = {
  branch: { id: string; name: string };
  restaurant: { id: string; name: string };
  preparing: PickupBoardEntry[];
  ready: PickupBoardEntry[];
};

export type Course =
  | "APPETIZER"
  | "DRINK"
  | "MAIN"
  | "DESSERT"
  | "OTHER";

export type CartLine = {
  key: string;
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
  modifierOptionIds: string[];
  modifierLabels: string[];
  /** Local key (`menu/….jpg`) or remote URL — same as MenuItem.imageUrl. */
  imageUrl?: string | null;
  seatNumber?: number | null;
  course?: Course | null;
};
