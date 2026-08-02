export const LOCALES = ["en", "fi", "ar", "so"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl"; htmlLang: string }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", htmlLang: "en" },
  fi: { label: "Finnish", nativeLabel: "Suomi", dir: "ltr", htmlLang: "fi" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl", htmlLang: "ar" },
  so: { label: "Somali", nativeLabel: "Soomaali", dir: "ltr", htmlLang: "so" },
};

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
