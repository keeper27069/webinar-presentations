/**
 * Emoji sequences we render as Twemoji SVGs.
 * - keycaps (1️⃣), flags, anything in the U+1F000–1FAFF planes
 * - BMP symbols that are emoji by default (⭐ ✅ ⚡ …)
 * - other BMP symbols only when followed by U+FE0F (✔️ ↔️ ▶️) — plain ✔ / → / ▶ stay text
 * - ZWJ sequences and skin-tone modifiers
 * scripts/emoji/sync-emoji.mjs reads EMOJI_SOURCE from this file — keep it a String.raw literal.
 */
export const EMOJI_SOURCE = String.raw`[0-9#*]️?⃣|[\u{1F1E6}-\u{1F1FF}]{2}|(?:[\u{1F000}-\u{1FAFF}]|[⌚⌛⏩-⏬⏰⏳◽◾☔☕♈-♓♿⚓⚡⚪⚫⚽⚾⛄⛅⛎⛔⛪⛲⛳⛵⛺⛽✅✊✋✨❌❎❓-❕❗➕-➗➰➿⬛⬜⭐⭕]|[©®‼⁉™ℹ↔-↙↩↪⌨⏏⏭-⏯⏱⏲⏸-⏺Ⓜ▪▫▶◀◻◼☀-➿⤴⤵⬅-⬇〰〽㊗㊙]️)️?[\u{1F3FB}-\u{1F3FF}]?(?:‍(?:[\u{1F000}-\u{1FAFF}]|[←-⇿⌀-⏿■-➿⬀-⯿])️?[\u{1F3FB}-\u{1F3FF}]?)*`;

export const emojiRe = () => new RegExp(EMOJI_SOURCE, 'gu');

/** File key: code points in hex, FE0F dropped (Twemoji names files the same way, mostly) */
export function emojiKey(seq: string) {
  return [...seq]
    .map((c) => c.codePointAt(0)!)
    .filter((cp) => cp !== 0xfe0f)
    .map((cp) => cp.toString(16))
    .join('-');
}
