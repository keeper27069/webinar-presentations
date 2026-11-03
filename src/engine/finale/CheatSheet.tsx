import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CheatItem {
  icon: ReactNode;
  text: ReactNode;
  code?: string;
}

/** Summary card the chat can screenshot. Items appear one by one up to `visible`. */
export function CheatSheet({ title, items, visible, columns = 2 }: { title: ReactNode; items: CheatItem[]; visible?: number; columns?: number }) {
  const n = visible ?? items.length;
  return (
    <div className="cheat">
      <div className="cheat__title">{title}</div>
      <div className="cheat__grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="cheat__item"
            initial={false}
            animate={i < n ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0.12, y: 8, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 160, damping: 20, delay: i < n ? 0.05 * i : 0 }}
          >
            <span className="cheat__icon">{it.icon}</span>
            <span className="cheat__text">
              {it.text}
              {it.code && <code>{it.code}</code>}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
