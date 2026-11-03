/**
 * Scene state store: in-memory map mirrored to sessionStorage so that
 * going back to a scene or an accidental F5 during a stream keeps the experiment.
 * Values must be JSON-serializable.
 */
const PREFIX = 'wl:';
const mem = new Map<string, unknown>();

function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStore<T>(key: string): T | undefined {
  if (mem.has(key)) return mem.get(key) as T;
  const s = safeSession();
  if (!s) return undefined;
  try {
    const raw = s.getItem(PREFIX + key);
    if (raw == null) return undefined;
    const v = JSON.parse(raw) as T;
    mem.set(key, v);
    return v;
  } catch {
    return undefined;
  }
}

export function writeStore(key: string, value: unknown) {
  mem.set(key, value);
  const s = safeSession();
  if (!s) return;
  try {
    s.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* quota or privacy mode — memory copy is enough */
  }
}

export function clearStorePrefix(prefix: string) {
  for (const k of [...mem.keys()]) if (k.startsWith(prefix)) mem.delete(k);
  const s = safeSession();
  if (!s) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (k && k.startsWith(PREFIX + prefix)) keys.push(k);
    }
    keys.forEach((k) => s.removeItem(k));
  } catch {
    /* ignore */
  }
}
