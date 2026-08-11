"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/lib/currency-provider";
import { LocaleProvider } from "@/lib/i18n/locale-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 15_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <LocaleProvider>
        <CurrencyProvider>
          {children}
          <Toaster
            position="bottom-center"
            richColors
            closeButton
            toastOptions={{
              className: "font-[family-name:var(--font-body)]",
            }}
          />
        </CurrencyProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
