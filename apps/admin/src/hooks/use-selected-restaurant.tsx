"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";

const STORAGE_KEY = "admin.selectedRestaurantId";

export function useSelectedRestaurant() {
  const [restaurantId, setRestaurantIdState] = React.useState("");

  const restaurantsQuery = useQuery({
    queryKey: ["admin-restaurants"],
    queryFn: () => adminApi.listRestaurants(),
  });

  React.useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored) setRestaurantIdState(stored);
  }, []);

  React.useEffect(() => {
    const restaurants = restaurantsQuery.data;
    if (!restaurants?.length) return;

    if (restaurantId && restaurants.some((r) => r.id === restaurantId)) {
      return;
    }

    const next = restaurants[0].id;
    setRestaurantIdState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, [restaurantsQuery.data, restaurantId]);

  function setRestaurantId(next: string) {
    setRestaurantIdState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return {
    restaurantId,
    setRestaurantId,
    restaurants: restaurantsQuery.data ?? [],
    isLoading: restaurantsQuery.isLoading,
    error: restaurantsQuery.error as Error | null,
  };
}

export function RestaurantSelect({
  restaurantId,
  onChange,
  restaurants,
  disabled,
}: {
  restaurantId: string;
  onChange: (id: string) => void;
  restaurants: Array<{ id: string; name: string }>;
  disabled?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        Restaurant
      </span>
      <select
        value={restaurantId}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || restaurants.length === 0}
        className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
        required
      >
        {restaurants.length === 0 ? (
          <option value="">No restaurants available</option>
        ) : (
          restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))
        )}
      </select>
    </label>
  );
}
