"use client";

import * as React from "react";
import {
  LanguageSwitcher,
  useLocale,
} from "@/lib/i18n/locale-provider";

export const CURRENCIES = ["EUR", "USD", "GBP", "SEK", "SOS"] as const;
export type DisplayCurrency = (typeof CURRENCIES)[number];

const STORAGE_KEY = "customer.currency";

/** Approximate units per 1 EUR — display conversion only (not for charging). */
const UNITS_PER_EUR: Record<DisplayCurrency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  SEK: 11.5,
  SOS: 640,
};

const LABELS: Record<DisplayCurrency, string> = {
  EUR: "EUR €",
  USD: "USD $",
  GBP: "GBP £",
  SEK: "SEK kr",
  SOS: "SOS Sh.So",
};

function isDisplayCurrency(value: string | null | undefined): value is DisplayCurrency {
  return !!value && (CURRENCIES as readonly string[]).includes(value);
}

function readStoredCurrency(): DisplayCurrency | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isDisplayCurrency(stored) ? stored : null;
}

export function convertMoney(
  amount: number | string,
  from: string,
  to: string,
): number {
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(value)) return NaN;

  const fromCode = from.toUpperCase();
  const toCode = to.toUpperCase();
  if (fromCode === toCode) return value;

  const fromRate = isDisplayCurrency(fromCode) ? UNITS_PER_EUR[fromCode] : null;
  const toRate = isDisplayCurrency(toCode) ? UNITS_PER_EUR[toCode] : null;
  if (!fromRate || !toRate) return value;

  const inEur = value / fromRate;
  return inEur * toRate;
}

type CurrencyContextValue = {
  currency: DisplayCurrency;
  setCurrency: (currency: DisplayCurrency) => void;
  convertFromBase: (amount: number | string, baseCurrency: string) => number;
};

const CurrencyContext = React.createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<DisplayCurrency>("EUR");

  React.useEffect(() => {
    const stored = readStoredCurrency();
    if (stored) setCurrencyState(stored);
  }, []);

  const setCurrency = React.useCallback((next: DisplayCurrency) => {
    setCurrencyState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const convertFromBase = React.useCallback(
    (amount: number | string, baseCurrency: string) =>
      convertMoney(amount, baseCurrency, currency),
    [currency],
  );

  const value = React.useMemo(
    () => ({ currency, setCurrency, convertFromBase }),
    [currency, setCurrency, convertFromBase],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = React.useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}

export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { t } = useLocale();
  const { currency, setCurrency } = useCurrency();

  return (
    <label
      className={`inline-flex items-center gap-2 text-xs text-[var(--forest)] ${className}`}
    >
      <span className="sr-only">{t("currency")}</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as DisplayCurrency)}
        aria-label={t("currency")}
        className="h-9 rounded-full border border-[var(--gold)]/50 bg-white px-3 text-xs font-medium text-[var(--forest)] outline-none focus:ring-2 focus:ring-[var(--gold)]"
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Language + currency pickers for page headers. */
export function LocaleControls({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-end gap-2 ${className}`}>
      <LanguageSwitcher />
      <CurrencySwitcher />
    </div>
  );
}
