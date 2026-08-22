"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

type Props = {
  menuItemId: string;
  itemName: string;
  onClose: () => void;
};

export function MenuModifiersPanel({ menuItemId, itemName, onClose }: Props) {
  const queryClient = useQueryClient();
  const [groupName, setGroupName] = React.useState("");
  const [optionName, setOptionName] = React.useState("");
  const [optionPrice, setOptionPrice] = React.useState("0");
  const [error, setError] = React.useState<string | null>(null);
  const [activeGroupId, setActiveGroupId] = React.useState<string | null>(null);

  const groupsQuery = useQuery({
    queryKey: ["admin-modifiers", menuItemId],
    queryFn: () => adminApi.listModifiers(menuItemId),
  });

  const groups = groupsQuery.data ?? [];

  function invalidate() {
    void queryClient.invalidateQueries({
      queryKey: ["admin-modifiers", menuItemId],
    });
  }

  const createGroup = useMutation({
    mutationFn: async () => {
      const name = groupName.trim();
      const opt = optionName.trim();
      if (!name) throw new Error("Group name is required");
      if (!opt) throw new Error("Add at least one option when creating a group");
      return adminApi.createModifierGroup({
        menuItemId,
        name,
        minSelect: 0,
        maxSelect: 1,
        required: false,
        options: [
          {
            name: opt,
            priceDelta: Number(optionPrice) || 0,
          },
        ],
      });
    },
    onSuccess: () => {
      setGroupName("");
      setOptionName("");
      setOptionPrice("0");
      setError(null);
      invalidate();
    },
    onError: (e: Error) => setError(e.message),
  });

  const addOption = useMutation({
    mutationFn: async (groupId: string) => {
      const name = optionName.trim();
      if (!name) throw new Error("Option name is required");
      return adminApi.createModifierOption({
        groupId,
        name,
        priceDelta: Number(optionPrice) || 0,
      });
    },
    onSuccess: () => {
      setOptionName("");
      setOptionPrice("0");
      setActiveGroupId(null);
      setError(null);
      invalidate();
    },
    onError: (e: Error) => setError(e.message),
  });

  const deleteGroup = useMutation({
    mutationFn: (id: string) => adminApi.deleteModifierGroup(id),
    onSuccess: invalidate,
    onError: (e: Error) => setError(e.message),
  });

  const deleteOption = useMutation({
    mutationFn: (id: string) => adminApi.deleteModifierOption(id),
    onSuccess: invalidate,
    onError: (e: Error) => setError(e.message),
  });

  return (
    <div className="mt-3 w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Modifiers
          </p>
          <p className="font-semibold">{itemName}</p>
        </div>
        <Button type="button" size="sm" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>

      {error ? (
        <p className="mb-3 text-sm text-[var(--danger)]">{error}</p>
      ) : null}

      {groupsQuery.isLoading ? (
        <p className="text-sm text-[var(--muted)]">Loading modifiers…</p>
      ) : groups.length === 0 ? (
        <p className="mb-4 text-sm text-[var(--muted)]">
          No modifier groups yet. Create one below (e.g. Size, Extras).
        </p>
      ) : (
        <ul className="mb-4 space-y-3">
          {groups.map((group) => (
            <li
              key={group.id}
              className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">
                  {group.name}
                  <span className="ml-2 text-xs text-[var(--muted)]">
                    select {group.minSelect}–{group.maxSelect}
                    {group.required ? " · required" : ""}
                  </span>
                </p>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setActiveGroupId(group.id);
                      setOptionName("");
                      setOptionPrice("0");
                    }}
                  >
                    Add option
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={deleteGroup.isPending}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Delete modifier group “${group.name}”?`,
                        )
                      ) {
                        deleteGroup.mutate(group.id);
                      }
                    }}
                  >
                    Delete group
                  </Button>
                </div>
              </div>
              <ul className="mt-2 space-y-1">
                {group.options.map((opt) => (
                  <li
                    key={opt.id}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span>
                      {opt.name}
                      <span className="text-[var(--muted)]">
                        {" "}
                        · {Number(opt.priceDelta) >= 0 ? "+" : ""}
                        {Number(opt.priceDelta).toFixed(2)}
                        {!opt.active ? " · inactive" : ""}
                      </span>
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={deleteOption.isPending}
                      onClick={() => deleteOption.mutate(opt.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              {activeGroupId === group.id ? (
                <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-[var(--line)] pt-3">
                  <label className="text-xs">
                    Option name
                    <input
                      className="mt-1 block h-9 rounded-md border border-[var(--line)] bg-white px-2 text-sm"
                      value={optionName}
                      onChange={(e) => setOptionName(e.target.value)}
                    />
                  </label>
                  <label className="text-xs">
                    Price delta
                    <input
                      className="mt-1 block h-9 w-24 rounded-md border border-[var(--line)] bg-white px-2 text-sm"
                      value={optionPrice}
                      onChange={(e) => setOptionPrice(e.target.value)}
                      inputMode="decimal"
                    />
                  </label>
                  <Button
                    type="button"
                    size="sm"
                    disabled={addOption.isPending}
                    onClick={() => addOption.mutate(group.id)}
                  >
                    Save option
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <form
        className="flex flex-wrap items-end gap-2 border-t border-[var(--line)] pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          createGroup.mutate();
        }}
      >
        <label className="text-xs">
          New group
          <input
            className="mt-1 block h-9 rounded-md border border-[var(--line)] bg-white px-2 text-sm"
            placeholder="e.g. Size"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>
        <label className="text-xs">
          First option
          <input
            className="mt-1 block h-9 rounded-md border border-[var(--line)] bg-white px-2 text-sm"
            placeholder="e.g. Large"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            disabled={!!activeGroupId}
          />
        </label>
        <label className="text-xs">
          Price delta
          <input
            className="mt-1 block h-9 w-24 rounded-md border border-[var(--line)] bg-white px-2 text-sm"
            value={optionPrice}
            onChange={(e) => setOptionPrice(e.target.value)}
            inputMode="decimal"
            disabled={!!activeGroupId}
          />
        </label>
        <Button type="submit" size="sm" disabled={createGroup.isPending || !!activeGroupId}>
          {createGroup.isPending ? "Saving…" : "Add group"}
        </Button>
      </form>
    </div>
  );
}
