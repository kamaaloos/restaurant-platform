import {
  cn,
  shortId,
  formatMoney as formatMoneyBase,
  formatWalkInQueueCode,
} from "@org/shared";
import { localizeDigits } from "@/lib/i18n/helpers";
import type { Locale } from "@/lib/i18n/locales";

export { cn, shortId, formatWalkInQueueCode };

/**
 * Currency formatting for the selected UI language.
 * `locale` may be a BCP-47 tag from moneyLocale(), or a Locale code.
 */
export function formatMoney(
  amount: number | string,
  currency = "USD",
  locale: string = "en-US",
) {
  const formatted = formatMoneyBase(amount, currency, locale);
  const uiLocale: Locale =
    locale === "ar" || locale.startsWith("ar")
      ? "ar"
      : locale.startsWith("fi")
        ? "fi"
        : locale.startsWith("so")
          ? "so"
          : "en";
  return localizeDigits(formatted, uiLocale);
}
