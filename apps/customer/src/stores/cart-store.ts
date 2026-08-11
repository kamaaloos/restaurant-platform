"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Course } from "@/lib/types";

type CartState = {
  token: string | null;
  lines: CartLine[];
  setToken: (token: string) => void;
  addLine: (line: Omit<CartLine, "key">) => void;
  updateQty: (key: string, quantity: number) => void;
  updateLine: (
    key: string,
    patch: Partial<Pick<CartLine, "seatNumber" | "course">>,
  ) => void;
  removeLine: (key: string) => void;
  clear: () => void;
};

function lineKey(
  menuItemId: string,
  modifierOptionIds: string[],
  notes?: string,
  seatNumber?: number | null,
  course?: Course | null,
) {
  return [
    menuItemId,
    [...modifierOptionIds].sort().join(","),
    notes ?? "",
    seatNumber ?? "",
    course ?? "",
  ].join("|");
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
          line.seatNumber,
          line.course,
        );
        const existing = get().lines.find((l) => l.key === key);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.key === key
                ? {
                    ...l,
                    quantity: l.quantity + line.quantity,
                    imageUrl: l.imageUrl ?? line.imageUrl,
                  }
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
      updateLine: (key, patch) => {
        const current = get().lines.find((l) => l.key === key);
        if (!current) return;
        const next = { ...current, ...patch };
        const newKey = lineKey(
          next.menuItemId,
          next.modifierOptionIds,
          next.notes,
          next.seatNumber,
          next.course,
        );
        const others = get().lines.filter((l) => l.key !== key);
        const collide = others.find((l) => l.key === newKey);
        if (collide) {
          set({
            lines: others.map((l) =>
              l.key === newKey
                ? { ...l, quantity: l.quantity + next.quantity }
                : l,
            ),
          });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.key === key ? { ...next, key: newKey } : l,
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
