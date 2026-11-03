import type { Locale } from '../types';

/**
 * Kit lessons keep the three languages side by side in one string:
 *   'Русский ¦ Oʻzbekcha ¦ English'
 * A string without "¦" is the same in every language (code, names, numbers).
 *
 * In Uzbek text an ASCII apostrophe after o/g becomes ʻ (U+02BB) and any other
 * apostrophe between letters becomes ʼ (U+02BC), so authors can type o'zbek, ma'lumot.
 * Code fields are never converted.
 * Mentor notes may be written in Russian only (the mentor's working language).
 */
export const SEP = '¦';
const ORDER: Locale[] = ['ru', 'uz', 'en'];
const CODE_KEYS = new Set(['code', 'html', 'css', 'js', 'cmd', 'out', 'output', 'fix', 'files', 'url', 'value', 'icon', 'id', 'hits', 'year']);
const CYR = /[А-Яа-яЁё]/;

export const problems: string[] = [];

export function uzFix(s: string): string {
  return s.replace(/([oOgG])['‘’`]/g, '$1ʻ').replace(/(\p{L})['’`](\p{L})/gu, '$1ʼ$2');
}

function pick(s: string, locale: Locale, path: string, code: boolean): string {
  if (!s.includes(SEP)) {
    if (!code && locale !== 'ru' && CYR.test(s) && !path.includes('.notes')) problems.push(`untranslated: ${path}`);
    return s;
  }
  const parts = s.split(SEP).map((p) => p.trim());
  if (parts.length !== 3) {
    problems.push(`${path}: expected 3 languages, got ${parts.length}`);
  }
  const v = parts[ORDER.indexOf(locale)] ?? parts[0];
  return locale === 'uz' && !code ? uzFix(v) : v;
}

export function localize<T>(value: T, locale: Locale, path = '', code = false): T {
  if (typeof value === 'string') {
    // Code keeps its own line breaks/indent: only trim parts when not code
    if (code && value.includes(SEP)) {
      const parts = value.split(SEP);
      if (parts.length !== 3) problems.push(`${path}: expected 3 languages, got ${parts.length}`);
      return (parts[ORDER.indexOf(locale)] ?? parts[0]).replace(/^ ?\n?/, '').replace(/\s+$/, '') as T;
    }
    return pick(value, locale, path, code) as T;
  }
  if (Array.isArray(value)) return value.map((v, i) => localize(v, locale, `${path}[${i}]`, code)) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = localize(v, locale, path ? `${path}.${k}` : k, code || CODE_KEYS.has(k));
    return out as T;
  }
  return value;
}
