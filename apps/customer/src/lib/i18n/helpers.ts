import type { Locale } from "./locales";
import type { MessageKey } from "./messages";

const MONEY_LOCALES: Record<Locale, string> = {
  en: "en-US",
  fi: "fi-FI",
  ar: "ar-EG",
  so: "so-SO",
};

const EASTERN_ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function moneyLocale(locale: Locale) {
  return MONEY_LOCALES[locale];
}

/** Convert Western digits to Eastern Arabic digits when locale is Arabic. */
export function localizeDigits(text: string, locale: Locale): string {
  if (locale !== "ar") return text;
  return text.replace(/\d/g, (d) => EASTERN_ARABIC_DIGITS[Number(d)]!);
}

/** Map free-text admin category names → i18n keys (EN DB labels). */
export function categoryMessageKey(name: string): MessageKey | null {
  const n = name.toLowerCase().trim();
  if (/shake/.test(n)) return "catShakes";
  if (/hot\s*drink/.test(n)) return "catHotDrinks";
  if (/soft\s*drink|cold\s*drink/.test(n)) return "catSoftDrinks";
  if (/desert|dessert|sweet/.test(n)) return "catDesserts";
  if (/^salads?$|salata/.test(n)) return "catSalads";
  if (/starter|appetizer|alkur|lisuk/.test(n)) return "catStarters";
  if (/main\s*dish/.test(n)) return "catMainDishes";
  if (/^mains?$/.test(n)) return "catMains";
  if (/^drinks?$|^beverages?$/.test(n)) return "catDrinks";
  return null;
}

export function localizedCategoryName(
  name: string,
  t: (key: MessageKey) => string,
): string {
  const key = categoryMessageKey(name);
  return key ? t(key) : name;
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
