"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/lib/types";

type CartState = {
  token: string | null;
  lines: CartLine[];
  setToken: (token: string) => void;
  addLine: (line: Omit<CartLine, "key">) => void;
  updateQty: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
};

function lineKey(
  menuItemId: string,
  modifierOptionIds: string[],
  notes?: string,
) {
  return [menuItemId, [...modifierOptionIds].sort().join(","), notes ?? ""].join(
    "|",
  );
}

export function selectCartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

export function selectCartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      token: null,
      lines: [],
      setToken: (token) => {
        const current = get().token;
        if (current && current !== token) {
          set({ token, lines: [] });
          return;
        }
        set({ token });
      },
      addLine: (line) => {
        const key = lineKey(
          line.menuItemId,
          line.modifierOptionIds,
          line.notes,
        );
        const existing = get().lines.find((l) => l.key === key);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.key === key
                ? { ...l, quantity: l.quantity + line.quantity }
                : l,
            ),
          });
          return;
        }
        set({ lines: [...get().lines, { ...line, key }] });
      },
      updateQty: (key, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.key !== key) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.key === key ? { ...l, quantity } : l,
          ),
        });
      },
      removeLine: (key) =>
        set({ lines: get().lines.filter((l) => l.key !== key) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "customer-cart" },
  ),
);
