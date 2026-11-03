/** Player ⇄ presenter window synchronisation over BroadcastChannel */
export type SyncMsg =
  | { t: 'state'; scene: number; step: number }
  | { t: 'cmd'; cmd: 'next' | 'prev' }
  | { t: 'goto'; scene: number; step?: number }
  | { t: 'hello' };

export function openChannel(lessonId: string, onMsg: (m: SyncMsg) => void): { post: (m: SyncMsg) => void; close: () => void } {
  if (typeof BroadcastChannel === 'undefined') return { post: () => {}, close: () => {} };
  const ch = new BroadcastChannel(`lesson:${lessonId}`);
  ch.onmessage = (e) => onMsg(e.data as SyncMsg);
  return { post: (m) => ch.postMessage(m), close: () => ch.close() };
}
