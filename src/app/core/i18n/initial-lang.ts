import type { GetLangParams } from '@jsverse/transloco-persist-lang';

export const AVAILABLE_LANGS = ['en', 'fr'] as const;

const isAvailable = (lang: string | null | undefined): lang is string =>
  !!lang && (AVAILABLE_LANGS as readonly string[]).includes(lang);

export const getInitialLang = ({ cachedLang, browserLang, defaultLang }: GetLangParams): string => {
  if (isAvailable(cachedLang)) {
    return cachedLang;
  }
  if (isAvailable(browserLang)) {
    return browserLang;
  }
  return defaultLang;
};
