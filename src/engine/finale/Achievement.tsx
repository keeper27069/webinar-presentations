import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../feedback/Confetti';

/** Badge the whole chat unlocks at the end of the lesson. */
export function Achievement({ title, subtitle, icon, level = 1 }: { title: ReactNode; subtitle?: ReactNode; icon: ReactNode; level?: number }) {
  return (
    <div className="achievement">
      <Confetti />
      <motion.div className="achievement__badge" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.2 }}>
        <svg viewBox="0 0 200 200" className="achievement__ring" aria-hidden>
          <defs>
            <linearGradient id="ach-g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="#3ee6ff" />
            </linearGradient>
          </defs>
          <polygon points="100,6 124,34 160,28 166,64 194,88 176,120 186,156 150,166 132,196 100,180 68,196 50,166 14,156 24,120 6,88 34,64 40,28 76,34" fill="url(#ach-g)" />
          <circle cx="100" cy="100" r="62" fill="#0a0f2e" />
        </svg>
        <span className="achievement__icon">{icon}</span>
        <span className="achievement__level">LVL {level}</span>
      </motion.div>
      <motion.div className="achievement__text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <b>{title}</b>
        {subtitle && <span>{subtitle}</span>}
      </motion.div>
    </div>
  );
}
