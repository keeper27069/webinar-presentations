import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const COLORS = ['#7c5cff', '#3ee6ff', '#2ee59d', '#ffd166', '#ff5cc8', '#ff8a3d'];

/** Lightweight DOM confetti burst (deterministic layout, no canvas). */
export function Confetti({ count = 70, fire = true }: { count?: number; fire?: boolean }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180;
        const r = 300 + ((i * 53) % 500);
        return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.6 - 200, rot: (i * 47) % 360, c: COLORS[i % COLORS.length], d: (i % 10) * 0.02, w: 10 + (i % 3) * 6 };
      }),
    [count],
  );
  if (!fire || reduce) return null;
  return (
    <div className="confetti" aria-hidden data-allow-overflow>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          style={{ background: p.c, width: p.w, height: p.w * 0.45 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 700], opacity: [1, 1, 0], rotate: p.rot + 360 }}
          transition={{ duration: 2.4, delay: p.d, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
