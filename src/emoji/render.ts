import { createElement, type ReactNode } from 'react';
import { AVAILABLE } from './available';
import { emojiRe, emojiKey } from './pattern';

/** Tags whose text must stay plain (form values, document head, raw code containers) */
const SKIP = new Set(['textarea', 'option', 'title', 'style', 'script']);
const BASE = '/';
const re = emojiRe();

/** Splits a string into text and <img class="emoji"> parts; returns null if nothing to replace */
function splitText(text: string, keyPrefix: string): ReactNode[] | null {
  re.lastIndex = 0;
  let out: ReactNode[] | null = null;
  let last = 0;
  let n = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    const k = emojiKey(m[0]);
    if (!AVAILABLE.has(k)) continue;
    out ??= [];
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      createElement('img', {
        key: `${keyPrefix}${n++}`,
        className: 'emoji',
        src: `${BASE}emoji/${k}.svg`,
        alt: m[0],
        draggable: false,
      }),
    );
    last = m.index + m[0].length;
  }
  if (out && last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Returns props with emoji in string children replaced by Twemoji images,
 * or the same object when nothing changed. `single` reports whether a lone
 * string child became an array (the caller then marks children as static).
 */
export function withEmoji(type: unknown, props: Record<string, unknown> | null): { props: typeof props; single: boolean } {
  if (!props || (typeof type === 'string' && SKIP.has(type)) || props.dangerouslySetInnerHTML) return { props, single: false };
  const c = props.children;
  if (typeof c === 'string') {
    const parts = splitText(c, 'e');
    return parts ? { props: { ...props, children: parts }, single: true } : { props, single: false };
  }
  if (Array.isArray(c) && c.some((x) => typeof x === 'string')) {
    let changed = false;
    const next: ReactNode[] = [];
    c.forEach((x, i) => {
      const parts = typeof x === 'string' ? splitText(x, `e${i}_`) : null;
      if (parts) {
        changed = true;
        next.push(...parts);
      } else next.push(x as ReactNode);
    });
    return changed ? { props: { ...props, children: next }, single: false } : { props, single: false };
  }
  return { props, single: false };
}
