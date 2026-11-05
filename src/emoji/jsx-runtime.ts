/**
 * JSX runtime that wraps React's and draws emoji in text as Twemoji SVGs
 * (same picture on every device). Wired in vite.config.ts via jsxImportSource.
 */
import { jsx as reactJsx, jsxs as reactJsxs, Fragment } from 'react/jsx-runtime';
import { withEmoji } from './render';

type Props = Record<string, unknown> | null;

export { Fragment };

export function jsx(type: unknown, props: Props, key?: string) {
  const r = withEmoji(type, props);
  return (r.single ? reactJsxs : reactJsx)(type as never, r.props as never, key);
}

export function jsxs(type: unknown, props: Props, key?: string) {
  return reactJsxs(type as never, withEmoji(type, props).props as never, key);
}
