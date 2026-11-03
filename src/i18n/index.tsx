import { createContext, useContext, type ReactNode } from 'react';
import { LOCALES, DEFAULT_LOCALE, type Locale, type L10n } from '@engine/types';
import type { UiStrings } from './ui/schema';
import uz from './ui/uz';
import ru from './ui/ru';
import en from './ui/en';

const UI: Record<Locale, UiStrings> = { uz, ru, en };

export const LOCALE_LABELS: Record<Locale, string> = { uz: 'Oʻzbekcha', ru: 'Русский', en: 'English' };
export const LOCALE_SHORT: Record<Locale, string> = { uz: 'UZ', ru: 'RU', en: 'EN' };

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (LOCALES as string[]).includes(v);
}

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** UI strings for the current locale */
export function useUi(): UiStrings {
  return UI[useLocale()];
}

export function uiFor(locale: Locale): UiStrings {
  return UI[locale];
}

/** Pick a localized value */
export function useL10n() {
  const locale = useLocale();
  return <T,>(v: L10n<T>): T => v[locale];
}
