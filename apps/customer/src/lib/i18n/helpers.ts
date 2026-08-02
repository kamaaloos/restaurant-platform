import type { Locale } from "./locales";

const MONEY_LOCALES: Record<Locale, string> = {
  en: "en-US",
  fi: "fi-FI",
  ar: "ar",
  so: "so-SO",
};

export function moneyLocale(locale: Locale) {
  return MONEY_LOCALES[locale];
}

export function statusMessageKey(
  status: string,
):
  | "statusPendingPayment"
  | "statusReceived"
  | "statusAccepted"
  | "statusPreparing"
  | "statusReady"
  | "statusServed"
  | "statusCompleted"
  | "statusCancelled"
  | "statusReadyPickup"
  | null {
  switch (status) {
    case "PENDING_PAYMENT":
      return "statusPendingPayment";
    case "NEW":
      return "statusReceived";
    case "ACCEPTED":
      return "statusAccepted";
    case "PREPARING":
      return "statusPreparing";
    case "READY":
      return "statusReady";
    case "SERVED":
      return "statusServed";
    case "COMPLETED":
      return "statusCompleted";
    case "CANCELLED":
      return "statusCancelled";
    default:
      return null;
  }
}
