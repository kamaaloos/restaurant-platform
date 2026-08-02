"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  pending = false,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 data-[state=open]:animate-in" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2",
            "rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl outline-none",
          )}
        >
          <Dialog.Title className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            {title}
          </Dialog.Title>
          {description ? (
            <Dialog.Description className="mt-2 text-sm text-[var(--muted)]">
              {description}
            </Dialog.Description>
          ) : null}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
            <Button type="button" disabled={pending} onClick={onConfirm}>
              {pending ? "✓ Sending…" : confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
