export const LOCALES = ["en", "hi", "mr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "punecabz-locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
