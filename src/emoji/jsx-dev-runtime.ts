/** Dev variant of ./jsx-runtime (used by `vite dev`) */
import { jsxDEV as reactJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { withEmoji } from './render';

export { Fragment };

export function jsxDEV(type: unknown, props: Record<string, unknown> | null, key: string | undefined, isStatic: boolean, source?: unknown, self?: unknown) {
  const r = withEmoji(type, props);
  return reactJsxDEV(type as never, r.props as never, key, isStatic || r.single, source as never, self as never);
}
