/** Original phone illustration with six generic app tiles (no real logos). */
const TILES = [
  { x: 70, y: 150, c: '#7c5cff', g: '🎮' },
  { x: 250, y: 150, c: '#ff6b6b', g: '✉️' },
  { x: 70, y: 330, c: '#3d7bff', g: '💬' },
  { x: 250, y: 330, c: '#2ee59d', g: '📒' },
  { x: 70, y: 510, c: '#ffd166', g: '🖼️' },
  { x: 250, y: 510, c: '#3ee6ff', g: '📶' },
];
export const PHONE_SPOTS = TILES.map((t) => ({ x: ((t.x + 75) / 460) * 100, y: ((t.y + 75) / 700) * 100 }));

export function Phone() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 700" role="img" aria-label="phone">
      <rect x="10" y="10" width="440" height="680" rx="60" fill="#0d1238" stroke="#8fa0ff" strokeWidth="6" />
      <rect x="34" y="40" width="392" height="620" rx="40" fill="#151c5c" />
      <rect x="180" y="58" width="100" height="20" rx="10" fill="#0a0f2e" />
      <text x="62" y="118" fill="#aab3ea" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="24">
        09:41
      </text>
      {TILES.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width="150" height="150" rx="36" fill={t.c} opacity="0.95" />
          <text x={t.x + 75} y={t.y + 96} textAnchor="middle" fontSize="64">
            {t.g}
          </text>
        </g>
      ))}
    </svg>
  );
}
